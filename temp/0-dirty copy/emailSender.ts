/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
/* eslint-disable complexity */
/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-depth */
/* eslint-disable max-lines-per-function */

import * as https from "https";
import { EmailComposer } from "./emailComposer";

export class EmailSender {
  private emailUrl = "https://run.mocky.io/v3/f4d07ec8-c139-4f3c-9367-35c0d8fc006f";
  // https://designer.mocky.io/manage/delete/f4d07ec8-c139-4f3c-9367-35c0d8fc006f/RVsIISdQy8NyWnNbXlCAwZlVHqvsyWMukIO3

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
    return new Promise((resolve, reject) => {
      let data = "";
      const req = https.request(this.emailUrl, options, res => {
        res.on("data", d => {
          data += d;
        });
        res.on("end", () => {
          resolve(data);
        });
      });
      req.on("error", () => {
        reject(undefined);
      });
      req.end();
    });
  }
}
