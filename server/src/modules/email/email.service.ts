import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(
    @InjectQueue('email-queue') private readonly emailQueue: Queue,
    private readonly configService: ConfigService,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('email.user'),
        pass: this.configService.get<string>('email.password'),
      },
    });
  }

  async queueEmail(jobName: string, data: any, delay?: number) {
    await this.emailQueue.add(jobName, data, {
      delay,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
    });
  }

  async sendEmail(
    to: string,
    subject: string,
    templateName: string,
    context: Record<string, unknown>,
  ) {
    const templatePath = path.join(
      __dirname,
      'templates',
      `${templateName}.hbs`,
    );
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(templateSource);
    const html = template(context);

    const from =
      this.configService.get<string>('email.from') ||
      '"Farm-Bridge" <noreply@farm-bridge.com>';

    await this.transporter.sendMail({
      from,
      to,
      subject,
      html,
    });
  }
}