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

import { IEmailComposer } from "./email_composer";
import { HTTP } from "./http";

export interface IEmailSend {
  send(recipient: string, subject: string, body: string): unknown;
}

export class HttpEmailSender implements IEmailSend {
  private emailUrl = "https://mailmonk.com/v1/send";
  public send(recipient: string, subject: string, body: string): any {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipient,
        subject,
        body,
      }),
    };
    return HTTP.request(this.emailUrl, options);
  }
}

export class SmtpEmailSender implements IEmailSend {
  private emailSmtp = "smtp.astrobookings.com";
  public send(recipient: string, subject: string, body: string): any {
    console.log("sending email message directly with smtp: " + this.emailSmtp);
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

export class EmailSender {
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
