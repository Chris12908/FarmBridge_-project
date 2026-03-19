import {
  Controller,
  Post,
  Req,
  Headers,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { Public } from '../../common/decorators/public.decorator';
import { FlutterwaveService } from './flutterwave.service';
import { OrdersService } from '../orders/orders.service';

interface FlutterwaveWebhookBody {
  data?: {
    id?: number;
    status?: string;
    tx_ref?: string;
  };
}

@Controller('webhooks')
export class FlutterwaveWebhookController {
  constructor(
    private readonly flutterwaveService: FlutterwaveService,
    private readonly ordersService: OrdersService,
  ) {}

  @Post('flutterwave')
  @Public()
  async handleFlutterwaveWebhook(
    @Req() req: Request,
    @Headers('verif-hash') verifHash: string,
  ) {
    if (!this.flutterwaveService.verifyWebhookHash(verifHash)) {
      throw new BadRequestException('Invalid webhook hash');
    }

    const payload = req.body as FlutterwaveWebhookBody;
    const txId = payload?.data?.id;

    if (!txId) {
      throw new BadRequestException('Missing transaction ID');
    }

    // Re-verify the transaction
    const verification = await this.flutterwaveService.verifyTransaction(
      String(txId),
    );

    if (verification?.data?.status === 'successful') {
      const txRef =
        typeof verification.data?.tx_ref === 'string'
          ? verification.data.tx_ref
          : '';

      if (txRef) {
        const order = await this.ordersService.findByFlutterwaveTxRef(txRef);
        if (order) {
          await this.ordersService.confirmPayment(order.id);
        }
      }
    }

    return { received: true };
  }
}
