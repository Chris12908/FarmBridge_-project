import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface FlutterwaveResponse {
  data?: Record<string, unknown>;
  status?: string;
}

interface FlutterwaveMobileMoney {
  mpesa(payload: Record<string, unknown>): Promise<FlutterwaveResponse>;
  ghana(payload: Record<string, unknown>): Promise<FlutterwaveResponse>;
  franco_phone(payload: Record<string, unknown>): Promise<FlutterwaveResponse>;
}

interface FlutterwaveTransaction {
  verify(params: { id: string }): Promise<FlutterwaveResponse>;
}

interface FlutterwaveClient {
  MobileMoney: FlutterwaveMobileMoney;
  Transaction: FlutterwaveTransaction;
}

// eslint-disable-next-line @typescript-eslint/no-require-imports
const Flutterwave = require('flutterwave-node-v3') as new (
  publicKey: string,
  secretKey: string,
) => FlutterwaveClient;

@Injectable()
export class FlutterwaveService {
  private flw: FlutterwaveClient;

  constructor(private readonly configService: ConfigService) {
    const secretKey = this.configService.getOrThrow<string>(
      'flutterwave.secretKey',
    );
    this.flw = new Flutterwave(secretKey, secretKey);
  }

  initiateMobileMoney(
    phone: string,
    amount: number,
    currency: string,
    txRef: string,
    provider: string,
    customerEmail: string,
  ): Promise<FlutterwaveResponse> {
    const payload: Record<string, unknown> = {
      phone_number: phone,
      amount,
      currency,
      tx_ref: txRef,
      email: customerEmail,
    };

    // Route to appropriate payment method based on provider/currency
    if (currency === 'KES' || provider === 'mpesa') {
      return this.flw.MobileMoney.mpesa(payload);
    } else if (currency === 'GHS' || provider === 'mtn') {
      return this.flw.MobileMoney.ghana(payload);
    } else {
      return this.flw.MobileMoney.franco_phone(payload);
    }
  }

  verifyWebhookHash(hash: string): boolean {
    const expectedHash = this.configService.get<string>(
      'flutterwave.webhookHash',
    );
    return hash === expectedHash;
  }

  verifyTransaction(txId: string): Promise<FlutterwaveResponse> {
    return this.flw.Transaction.verify({ id: txId });
  }
}
