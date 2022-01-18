/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { HTTP } from "./http";

export interface IEmailSend {
  send(recipient: string, subject: string, body: string): unknown;
}

export class HttpEmailSender implements IEmailSend {
  private emailUrl = "https://mailmonk.com/v1/send";
  public send(recipient: string, subject: string, body: string): unknown {
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
  public send(recipient: string, subject: string, body: string): void {
    console.log("sending email message directly with smtp: " + this.emailSmtp);
  }
}
