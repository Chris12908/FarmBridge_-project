import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { paymentService } from '@/services/payment.service';
import { chatService } from '@/services/chat.service';
import type { PaymentStatus } from '@/lib/types/order.types';

export function usePayment(orderId?: string) {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(
    null
  );

  // Listen for server-side payment confirmation via webhook
  useEffect(() => {
    if (!orderId) return;
    const cleanup = chatService.onPaymentConfirmed(({ orderId: id, status }) => {
      if (id === orderId) {
        setPaymentStatus(status);
      }
    });
    return cleanup;
  }, [orderId]);

  const initiateStripe = useMutation({
    mutationFn: (oid: string) => paymentService.initiateStripePayment(oid),
  });

  const initiateFlutterwave = useMutation({
    mutationFn: ({ oid, phoneNumber }: { oid: string; phoneNumber: string }) =>
      paymentService.initiateFlutterwavePayment(oid, phoneNumber),
  });

  return {
    initiateStripe,
    initiateFlutterwave,
    paymentStatus,
    isPending: initiateStripe.isPending || initiateFlutterwave.isPending,
    error: initiateStripe.error ?? initiateFlutterwave.error,
  };
}
