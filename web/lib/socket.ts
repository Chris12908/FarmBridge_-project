import { io, type Socket } from 'socket.io-client';
import { SOCKET_URL } from './constants';

// ─── Singleton ────────────────────────────────────────────────────────────────

let socket: Socket | null = null;

// ─── Get Socket ───────────────────────────────────────────────────────────────

export function getSocket(): Socket | null {
  return socket;
}

// ─── Connect ──────────────────────────────────────────────────────────────────

export function connectSocket(token: string): Socket {
  if (socket && socket.connected) return socket;

  if (socket) {
    // Reuse existing instance — update auth token and reconnect
    socket.auth = { token };
    socket.connect();
    return socket;
  }

  socket = io(SOCKET_URL, {
    auth: { token },
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionDelay: 1_000,
    reconnectionDelayMax: 5_000,
    reconnectionAttempts: 10,
    autoConnect: false,
  });

  socket.on('connect', () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Socket] Connected:', socket?.id);
    }
  });

  socket.on('disconnect', (reason) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Socket] Disconnected:', reason);
    }
  });

  socket.on('connect_error', (err) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Socket] Connection error:', err.message);
    }
  });

  socket.connect();
  return socket;
}

// ─── Update Token ─────────────────────────────────────────────────────────────
// Called after silent token refresh to ensure reconnection uses new token.

export function updateSocketToken(token: string): void {
  if (!socket) return;
  socket.auth = { token };
  if (socket.connected) {
    socket.disconnect();
    socket.connect();
  }
}

// ─── Disconnect ───────────────────────────────────────────────────────────────

export function disconnectSocket(): void {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
