import {nodemailer} from 'nodemailer';
import {Q} from 'q';
import * as config from '../config/mail/config';

export class MailSender {
  transporter;
  static instance;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: config.user,
        pass: config.password
      }
    })
  }

  static getInstance() {
    if(!this.instance) {
      this.instance = new MailSender();
    }

    return this.instance;
  }

  sendMail(to, subject, body) {
    let options = {
      from: config.user,
      to: to,
      subject: subject,
      text: body
    };

    return Q.denodeify(this.transporter.sendMail)(options);
  }
}
