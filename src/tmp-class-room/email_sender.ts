/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
/* eslint-disable complexity */
/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-depth */
/* eslint-disable max-lines-per-function */

import { EmailComposer } from "./email_composer";
import { HTTP } from "./http";

export class EmailSender {
  private emailUrl = "https://mailmonk.com/v1/send";

  // public getBody(booking: any, payment: any): string {
  //   const emailComposer = new EmailComposer(booking, payment);
  //   return emailComposer.getBody();
  // }

  public sendConfirmationToTraveler(recipient: string, booking: any, payment: any): any {
    const emailComposer = new EmailComposer(booking, payment);
    const body = emailComposer.getBody();
    return this.send(recipient, "Booking Confirmation", body);
  }

  private send(recipient: string, subject: string, body: string) {
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
