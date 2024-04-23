import { Injectable } from '@nestjs/common';
import _template from 'lodash/template';

import { MailerTransporter, MailOptions } from './mailer.transporter';

type TemplateCb = (content: string, replacements?: any) => string;
type MailOptionsCb = (template: TemplateCb) => MailOptions;

@Injectable()
export class MailerService {
  constructor(private transporter: MailerTransporter) {}

  public sendMail(options: MailOptions | MailOptionsCb) {
    if (typeof options !== 'function') {
      return this.transporter.sendMail(options);
    }

    return this.transporter.sendMail(options(this.template));
  }

  public template(content: string, replacements?: any) {
    const compiled = _template(content);
    return compiled(replacements);
  }
}
