/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
/* eslint-disable complexity */
/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-depth */
/* eslint-disable max-lines-per-function */

import { HttpEmailSender, IEmailSend, SmtpEmailSender } from "../3-infrastructure/email_send";
import { IEmailComposer } from "./email_composer";

export class EmailSenderService {
  private sender: IEmailSend;

  constructor() {
    this.sender = SenderFactory.getSender();
  }

  public sendToTraveler(emailComposer: IEmailComposer, travelerEmail: string): unknown {
    const subject = emailComposer.getSubject();
    const body = emailComposer.getBody();
    return this.sender.send(travelerEmail, subject, body);
  }
}

class SenderFactory {
  private static config = "http";
  static getSender(): IEmailSend {
    if (SenderFactory.config === "http") {
      return new HttpEmailSender();
    } else {
      return new SmtpEmailSender();
    }
  }
}
