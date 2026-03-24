'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useCreateOrder } from '@/hooks/orders/useCreateOrder';
import { useAddresses } from '@/hooks/addresses/useAddresses';
import { negotiationService } from '@/services/negotiation.service';
import { formatCurrency } from '@/lib/utils';
import type { PaymentMethod } from '@/lib/types/order.types';
import { Button } from '@/components/ui/button';
import AppHeader from '@/components/ui/shared/AppHeader';
import { AddressPicker } from '@/components/ui/shared/AddressPicker';
import { PaymentMethodSelector } from '@/components/ui/shared/PaymentMethodSelector';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const params = useParams();
  const sessionId = params.sessionId as string;

  const { data: session, isLoading: sessionLoading } = useQuery({
    queryKey: ['negotiation', sessionId],
    queryFn: () => negotiationService.getNegotiation(sessionId),
    enabled: !!sessionId,
  });

  const { addresses, isLoading: addressesLoading } = useAddresses();
  const { createOrder, isPending } = useCreateOrder();

  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('stripe');

  if (sessionLoading) {
    return (
      <div className="min-h-screen bg-background-light">
        <AppHeader backHref={`/buyer/chat/${sessionId}`} title="Checkout" />
        <div className="px-4 py-5 max-w-lg mx-auto animate-pulse space-y-4">
          <div className="h-24 bg-slate-200 rounded-2xl" />
          <div className="h-40 bg-slate-200 rounded-2xl" />
          <div className="h-32 bg-slate-200 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-text-muted">Session not found.</p>
        <Link href="/buyer/marketplace" className="text-primary text-sm mt-2 font-semibold">
          Back to marketplace
        </Link>
      </div>
    );
  }

  const product = session.product;
  const farmerName = session.farmer?.farmerProfile?.farmName ?? session.farmer?.name ?? 'Farmer';
  const agreedQuantity = session.agreedQuantity ?? 1;
  const unitPrice = session.agreedPrice ?? product?.pricePerUnit ?? 0;
  const subtotal = unitPrice * agreedQuantity;
  const platformFee = subtotal * 0.05;
  const total = subtotal + platformFee;

  function handlePlaceOrder() {
    if (!selectedAddressId) {
      toast.error('Please select a delivery address');
      return;
    }
    createOrder({ sessionId, addressId: selectedAddressId, paymentMethod });
  }

  return (
    <div className="min-h-screen bg-background-light pb-36">
      <AppHeader
        backHref={`/buyer/chat/${sessionId}`}
        title="Checkout"
        rightSlot={<span className="text-xs text-text-muted font-medium">Step 3 of 3</span>}
      />

      <div className="px-4 py-5 max-w-lg mx-auto space-y-4">
        {/* Order summary */}
        <div className="bg-white rounded-2xl border border-primary/10 shadow-sm p-4">
          <h2 className="font-bold text-slate-800 mb-3 text-sm">Order Summary</h2>
          <div className="flex gap-3">
            {product?.images?.[0] && (
              <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex-1">
              <p className="font-semibold text-slate-800 text-sm">{product?.name ?? 'Product'}</p>
              <p className="text-xs text-text-muted">{farmerName}</p>
              <div className="flex justify-between mt-1">
                <p className="text-xs text-text-muted">
                  {agreedQuantity} {product?.unit} × {formatCurrency(unitPrice)}
                </p>
                <p className="font-bold text-primary text-sm">{formatCurrency(subtotal)}</p>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-primary bg-primary/5 px-2 py-0.5 rounded-full mt-1">
                <span className="material-symbols-outlined text-[10px]">handshake</span>
                Agreed price
              </span>
            </div>
          </div>

          {/* Fee breakdown */}
          <div className="border-t border-primary/5 mt-3 pt-3 space-y-1.5">
            <div className="flex justify-between text-xs text-slate-600">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-600">
              <span>Platform fee (5%)</span>
              <span>{formatCurrency(platformFee)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-slate-800 pt-1 border-t border-primary/5">
              <span>Total</span>
              <span className="text-primary">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        {/* Delivery address */}
        <div className="bg-white rounded-2xl border border-primary/10 shadow-sm p-4">
          <h2 className="font-bold text-slate-800 mb-3 text-sm">Delivery Address</h2>
          {addressesLoading ? (
            <div className="animate-pulse h-20 bg-slate-100 rounded-xl" />
          ) : (
            <AddressPicker
              selectedId={selectedAddressId}
              onSelect={setSelectedAddressId}
              onAddNew={() => {}}
            />
          )}
        </div>

        {/* Payment method */}
        <div className="bg-white rounded-2xl border border-primary/10 shadow-sm p-4">
          <h2 className="font-bold text-slate-800 mb-3 text-sm">Payment Method</h2>
          <PaymentMethodSelector value={paymentMethod} onChange={setPaymentMethod} />
        </div>
      </div>

      {/* Sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background-light border-t border-primary/10 px-4 py-4 pb-6">
        <div className="max-w-lg mx-auto">
          <div className="flex justify-between items-center mb-3">
            <span className="text-text-muted text-sm">Total Amount</span>
            <span className="text-2xl font-black text-primary">{formatCurrency(total)}</span>
          </div>
          <Button
            onClick={handlePlaceOrder}
            disabled={isPending || !selectedAddressId}
            className="w-full h-12 text-base font-bold rounded-xl"
          >
            {isPending ? 'Placing Order...' : 'Place Order'}
          </Button>
          <p className="text-center text-xs text-text-muted mt-2">
            By placing this order you agree to our Terms &amp; Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
