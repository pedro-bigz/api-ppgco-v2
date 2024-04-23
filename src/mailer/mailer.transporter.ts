import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';
import {
  MAILER_HOST,
  MAILER_PORT,
  MAILER_SECURE,
  MAILER_SERVICE,
} from './mailer.constants';
import { MailOptions } from 'nodemailer/lib/json-transport';

interface Attachment {
  filename: string;
  path: string;
  contentType: string;
}

interface EmailInterface {
  from: string;
  to: string[];
  subject: string;
  text: string;
  html: string;
  attachments: Array<Attachment>;
}

export type { MailOptions };

@Injectable()
export class MailerTransporter {
  private transporter: Transporter;
  private name: string | undefined;
  private user: string | undefined;
  private pass: string | undefined;

  constructor(private configService: ConfigService) {
    this.name = this.configService.get('MAILER_NAME');
    this.user = this.configService.get('MAILER_USER');
    this.pass = this.configService.get('MAILER_PASS');

    this.createTransport();
  }

  public createTransport() {
    this.transporter = createTransport({
      service: MAILER_SERVICE,
      host: MAILER_HOST,
      port: MAILER_PORT,
      secure: MAILER_SECURE,
      auth: {
        user: this.user,
        pass: this.pass,
      },
    });

    return this.transporter;
  }

  public async sendMail(options: MailOptions) {
    const info = await this.transporter.sendMail({
      from: {
        name: this.name ?? '',
        address: this.user ?? '',
      },
      ...options,
    });

    this.transporter.close();

    console.debug('Message sent: %s', info.messageId);
  }
}
