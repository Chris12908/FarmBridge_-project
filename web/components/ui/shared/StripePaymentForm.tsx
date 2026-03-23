'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ''
);

interface StripePaymentFormProps {
  clientSecret: string;
  orderId: string;
}

function StripeFormContent({ orderId }: { orderId: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsConfirming(true);
    setError(null);

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/buyer/order-confirmation/${orderId}`,
      },
    });

    if (stripeError) {
      setError(stripeError.message ?? 'Payment failed. Please try again.');
      setIsConfirming(false);
    }
    // On success, Stripe redirects to return_url automatically
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <PaymentElement />
      {error && (
        <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3">{error}</p>
      )}
      <Button
        type="submit"
        disabled={!stripe || isConfirming}
        className="w-full h-12 text-base font-bold rounded-xl"
      >
        {isConfirming ? 'Processing...' : 'Pay Now'}
      </Button>
    </form>
  );
}

export function StripePaymentForm({ clientSecret, orderId }: StripePaymentFormProps) {
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <StripeFormContent orderId={orderId} />
    </Elements>
  );
}
