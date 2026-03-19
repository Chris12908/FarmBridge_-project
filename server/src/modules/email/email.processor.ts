import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { EmailService } from './email.service';

interface EmailJobData {
  to: string;
  subject?: string;
  context: Record<string, unknown>;
}

@Processor('email-queue')
export class EmailProcessor extends WorkerHost {
  constructor(private readonly emailService: EmailService) {
    super();
  }

  async process(job: Job<EmailJobData>) {
    const { to, subject, context } = job.data;

    switch (job.name) {
      case 'welcome-buyer':
        await this.emailService.sendEmail(
          to,
          subject || 'Welcome to Farm-Bridge!',
          'welcome-buyer',
          context,
        );
        break;

      case 'welcome-farmer':
        await this.emailService.sendEmail(
          to,
          subject || 'Welcome to Farm-Bridge, Farmer!',
          'welcome-farmer',
          context,
        );
        break;

      case 'email-verification':
        await this.emailService.sendEmail(
          to,
          subject || 'Verify your Farm-Bridge email',
          'email-verification',
          context,
        );
        break;

      case 'password-reset':
        await this.emailService.sendEmail(
          to,
          subject || 'Reset your Farm-Bridge password',
          'password-reset',
          context,
        );
        break;

      case 'price-offer':
        await this.emailService.sendEmail(
          to,
          subject || 'New price offer on Farm-Bridge',
          'price-offer',
          context,
        );
        break;

      case 'offer-accepted':
        await this.emailService.sendEmail(
          to,
          subject || 'Your offer has been accepted!',
          'offer-accepted',
          context,
        );
        break;

      case 'order-confirmed-buyer':
        await this.emailService.sendEmail(
          to,
          subject || 'Order Confirmed - Farm-Bridge',
          'order-confirmed-buyer',
          context,
        );
        break;

      case 'order-confirmed-farmer':
        await this.emailService.sendEmail(
          to,
          subject || 'New Order Received - Farm-Bridge',
          'order-confirmed-farmer',
          context,
        );
        break;

      case 'order-dispatched':
        await this.emailService.sendEmail(
          to,
          subject || 'Your order has been dispatched!',
          'order-dispatched',
          context,
        );
        break;

      case 'listing-expiring':
        await this.emailService.sendEmail(
          to,
          subject || 'Your listing is expiring soon',
          'listing-expiring',
          context,
        );
        break;

      case 'review-request':
        await this.emailService.sendEmail(
          to,
          subject || 'How was your Farm-Bridge experience?',
          'review-request',
          context,
        );
        break;

      default:
        console.warn(`Unknown email job type: ${job.name}`);
    }
  }
}
