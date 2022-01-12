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

  public sendConfirmationToTraveler(travelerEmail: string, booking: any, payment: any) {
    const body = this.getBody(booking, payment);
    this.send(travelerEmail, "Booking Confirmation", body);
  }

  private getBody(booking: any, payment: any): string {
    const emailComposer = new EmailComposer(booking, payment);
    // feature envy
    return emailComposer.getBody();
  }

  private send(recipient: string, subject: string, body: string): any {
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
