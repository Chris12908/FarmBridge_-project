'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { Socket } from 'socket.io-client';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  connectSocket,
  disconnectSocket,
  getSocket,
} from '@/lib/socket';
import { getAccessToken } from '@/lib/tokens';
import { chatService } from '@/services/chat.service';
import { QUERY_KEYS } from '@/lib/constants';
import { useAuthContext } from './AuthProvider';

// ─── Context Shape ────────────────────────────────────────────────────────────

interface SocketContextValue {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextValue>({
  socket: null,
  isConnected: false,
});

// ─── Provider ─────────────────────────────────────────────────────────────────

export function SocketProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthContext();
  const queryClient = useQueryClient();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated) {
      const token = getAccessToken();
      if (!token) return;

      const s = connectSocket(token);
      setSocket(s);

      const handleConnect = () => setIsConnected(true);
      const handleDisconnect = () => setIsConnected(false);

      s.on('connect', handleConnect);
      s.on('disconnect', handleDisconnect);

      // Sync initial state
      setIsConnected(s.connected);

      return () => {
        s.off('connect', handleConnect);
        s.off('disconnect', handleDisconnect);
      };
    } else {
      // User logged out — tear down socket
      disconnectSocket();
      setSocket(null);
      setIsConnected(false);
    }
  }, [isAuthenticated, isLoading]);

  // Real-time subscriptions
  useEffect(() => {
    if (!isConnected) return;

    const unsubNotification = chatService.onNotification((notification) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.NOTIFICATIONS.all });
      toast(notification.title, { description: notification.body });
    });

    const unsubOrder = chatService.onOrderStatusChanged(({ orderId, status }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS.detail(orderId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS.all });
      toast.info(`Order status updated to ${status.toLowerCase().replace(/_/g, ' ')}`);
    });

    const unsubPayment = chatService.onPaymentConfirmed(({ orderId }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS.detail(orderId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS.all });
      toast.success('Payment confirmed! Your order is being processed.');
    });

    const unsubProposal = chatService.onProposalUpdated(() => {
      queryClient.invalidateQueries({ queryKey: ['proposals'] });
    });

    return () => {
      unsubNotification();
      unsubOrder();
      unsubPayment();
      unsubProposal();
    };
  }, [isConnected, queryClient]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useSocket(): SocketContextValue {
  return useContext(SocketContext);
}
