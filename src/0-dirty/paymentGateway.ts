/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
/* eslint-disable complexity */
/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-depth */
/* eslint-disable max-lines-per-function */

import * as https from "https";

export class PaymentGateway {
  private paymentUrl = "https://run.mocky.io/v3/3aee79a7-5cd8-4978-8d64-5aedc8e6a3f5";
  // https://designer.mocky.io/manage/delete/3aee79a7-5cd8-4978-8d64-5aedc8e6a3f5/fHULPi6ZLm14LPSKXYHgEUIBHJEUpL5DrOmp
  public async pay(
    amount: any,
    paymentMethod: string,
    cardNumber: string,
    cardExpiry: string,
    cardCVC: string
  ): Promise<any> {
    if (paymentMethod === "Credit Card") {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          cardNumber,
          cardExpiry,
          cardCVC,
        }),
      };
      return new Promise((resolve, reject) => {
        let data = "";
        const req = https.request(this.paymentUrl, options, res => {
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
    } else {
      return Promise.reject("Only Credit card payments are supported");
    }
  }
}
