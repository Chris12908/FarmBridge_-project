import axiosClient from '@/lib/axios';

export interface StripePaymentResponse {
  clientSecret: string;
  paymentIntentId: string;
}

export interface FlutterwavePaymentResponse {
  txRef: string;
  paymentLink: string;
}

export const paymentService = {
  async initiateStripePayment(
    orderId: string
  ): Promise<StripePaymentResponse> {
    const { data } = await axiosClient.post<StripePaymentResponse>(
      '/payments/stripe/initiate',
      { orderId }
    );
    return data;
  },

  async initiateFlutterwavePayment(
    orderId: string,
    phoneNumber: string
  ): Promise<FlutterwavePaymentResponse> {
    const { data } = await axiosClient.post<FlutterwavePaymentResponse>(
      '/payments/flutterwave/initiate',
      { orderId, phoneNumber }
    );
    return data;
  },
};
