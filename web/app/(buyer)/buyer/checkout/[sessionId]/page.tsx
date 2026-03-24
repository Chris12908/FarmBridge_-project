'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAddresses } from '@/hooks/addresses/useAddresses';
import { negotiationService } from '@/services/negotiation.service';
import { orderService } from '@/services/order.service';
import { paymentService } from '@/services/payment.service';
import { addressService } from '@/services/address.service';
import { formatCurrency } from '@/lib/utils';
import { QUERY_KEYS } from '@/lib/constants';
import type { PaymentMethod } from '@/lib/types/order.types';
import type { CreateAddressDto } from '@/lib/types/address.types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppHeader from '@/components/ui/shared/AppHeader';
import { AddressPicker } from '@/components/ui/shared/AddressPicker';
import { AddressForm } from '@/components/ui/shared/AddressForm';
import { PaymentMethodSelector } from '@/components/ui/shared/PaymentMethodSelector';
import { StripePaymentForm } from '@/components/ui/shared/StripePaymentForm';
import { toast } from 'sonner';

type Step = 'summary' | 'payment';

function CheckoutPageContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const sessionId = params.sessionId as string;
  const proposalId = searchParams.get('proposalId') ?? undefined;

  const { data: session, isLoading: sessionLoading } = useQuery({
    queryKey: ['negotiation', sessionId],
    queryFn: () => negotiationService.getNegotiation(sessionId),
    enabled: !!sessionId,
  });

  const { addresses, isLoading: addressesLoading } = useAddresses();

  const [step, setStep] = useState<Step>('summary');
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('STRIPE');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [orderId, setOrderId] = useState<string>('');
  const [clientSecret, setClientSecret] = useState<string>('');

  // Auto-select default address once loaded
  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      const defaultAddr = addresses.find((a) => a.isDefault) ?? addresses[0];
      setSelectedAddressId(defaultAddr.id);
    }
  }, [addresses, selectedAddressId]);

  const createOrderMutation = useMutation({
    mutationFn: () =>
      orderService.createOrder({ sessionId, addressId: selectedAddressId, paymentMethod, proposalId }),
    onSuccess: async (order) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS.all });
      setOrderId(order.id);

      if (paymentMethod === 'STRIPE') {
        try {
          const res = await paymentService.initiateStripePayment(order.id);
          setClientSecret(res.clientSecret);
          setStep('payment');
        } catch {
          toast.error('Failed to initiate Stripe payment. Please try again.');
        }
      } else {
        // Flutterwave
        if (!phoneNumber) {
          toast.error('Please enter your phone number for mobile money payment.');
          return;
        }
        try {
          const res = await paymentService.initiateFlutterwavePayment(order.id, phoneNumber);
          window.location.href = res.paymentLink;
        } catch {
          toast.error('Failed to initiate mobile money payment. Please try again.');
        }
      }
    },
    onError: (err: unknown) =>
      toast.error((err as Error)?.message ?? 'Failed to create order'),
  });

  async function handleAddAddress(data: CreateAddressDto) {
    const newAddr = await addressService.createAddress(data);
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADDRESSES.all });
    setSelectedAddressId(newAddr.id);
    setShowAddForm(false);
    toast.success('Address added');
  }

  function handlePlaceOrder() {
    if (!selectedAddressId) {
      toast.error('Please select a delivery address');
      return;
    }
    if (paymentMethod !== 'STRIPE' && !phoneNumber) {
      toast.error('Please enter your phone number for mobile money payment');
      return;
    }
    createOrderMutation.mutate();
  }

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
  const acceptedProposal = session.proposals?.find((p) => p.id === proposalId);
  const agreedQuantity = acceptedProposal?.proposedQuantity ?? session.agreedQuantity ?? 1;
  const unitPrice = Number(acceptedProposal?.proposedPrice ?? session.agreedPrice ?? product?.pricePerUnit ?? 0);
  const subtotal = unitPrice * agreedQuantity;
  const platformFee = subtotal * 0.05;
  const total = subtotal + platformFee;

  const isFlutterwave = paymentMethod !== 'STRIPE';

  // ─── Step 2: Payment ─────────────────────────────────────────────────────────

  if (step === 'payment' && paymentMethod === 'STRIPE' && clientSecret) {
    return (
      <div className="min-h-screen bg-background-light pb-12">
        <header className="sticky top-0 z-40 bg-background-light/95 backdrop-blur-sm border-b border-primary/10">
          <div className="flex items-center h-14 px-4 gap-3">
            <button
              onClick={() => setStep('summary')}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-sage transition-colors"
            >
              <span className="material-symbols-outlined text-primary text-[20px]">arrow_back</span>
            </button>
            <h1 className="text-base font-semibold text-slate-800 flex-1">Payment</h1>
            <span className="text-xs text-text-muted font-medium">Step 2 of 2</span>
          </div>
        </header>
        <div className="px-4 py-5 max-w-lg mx-auto space-y-4">
          <div className="bg-white rounded-2xl border border-primary/10 shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-text-muted">Total due</span>
              <span className="text-2xl font-black text-primary">{formatCurrency(total)}</span>
            </div>
            <StripePaymentForm clientSecret={clientSecret} orderId={orderId} />
          </div>
        </div>
      </div>
    );
  }

  // ─── Step 1: Summary ─────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-background-light pb-36">
      <AppHeader
        backHref={`/buyer/chat/${sessionId}`}
        title="Checkout"
        rightSlot={<span className="text-xs text-text-muted font-medium">Step 1 of 2</span>}
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
              onAddNew={() => setShowAddForm(true)}
            />
          )}
          {showAddForm && (
            <div className="mt-3 p-4 bg-neutral-sage/30 rounded-xl">
              <AddressForm
                onSubmit={handleAddAddress}
                onCancel={() => setShowAddForm(false)}
                submitLabel="Add Address"
              />
            </div>
          )}
        </div>

        {/* Payment method */}
        <div className="bg-white rounded-2xl border border-primary/10 shadow-sm p-4">
          <h2 className="font-bold text-slate-800 mb-3 text-sm">Payment Method</h2>
          <PaymentMethodSelector value={paymentMethod} onChange={setPaymentMethod} />

          {/* Phone number for mobile money */}
          {isFlutterwave && (
            <div className="mt-4">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">
                Mobile Number
              </label>
              <Input
                type="tel"
                placeholder="+254712345678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="border-primary/20"
              />
              <p className="text-xs text-text-muted mt-1">
                A payment prompt will be sent to this number.
              </p>
            </div>
          )}
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
            disabled={createOrderMutation.isPending || !selectedAddressId}
            className="w-full h-12 text-base font-bold rounded-xl"
          >
            {createOrderMutation.isPending ? 'Processing...' : 'Continue to Payment'}
          </Button>
          <p className="text-center text-xs text-text-muted mt-2">
            By placing this order you agree to our Terms &amp; Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense>
      <CheckoutPageContent />
    </Suspense>
  );
}
