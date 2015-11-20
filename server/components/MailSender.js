import * as nodemailer from 'nodemailer';
import * as Q from 'q';
import * as config from '../config/mail/config';

class MailSender {
  transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: config.user,
        pass: config.password
      }
    })
  }

  sendMail(to, subject, body, callback) {
    // TODO[Marcin] - configure mail sending on production
    callback();
    //let options = {
    //  from: config.user,
    //  to: to,
    //  subject: subject,
    //  text: body
    //};
    //
    //this.transporter.sendMail(options, callback);
  }
}
var sender = new MailSender();
export {sender};
