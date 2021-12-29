/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
/* eslint-disable complexity */
/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-depth */
/* eslint-disable max-lines-per-function */

import { EmailComposer } from "./emailComposer";
import { HTTPs } from "./http-simulator";

export class EmailSender {
  private emailUrl = "https://mailmonk.com/v1/send";

  public getBody(booking: any, payment: any) {
    const emailComposer = new EmailComposer(booking, payment);
    return (
      emailComposer.getSalutation() + emailComposer.getMainBody() + emailComposer.getSignature()
    );
  }

  public sendEmail(recipient: string, subject: string, body: string) {
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
    return HTTPs.request(this.emailUrl, options);
  }
}
