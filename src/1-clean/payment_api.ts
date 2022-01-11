/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
/* eslint-disable complexity */
/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-depth */
/* eslint-disable max-lines-per-function */

import { HTTP } from "./http";
export class PaymentAPI {
  private paymentAPIUrl = "https://pay-me.com/v1/payments";
  public pay(
    amount: any,
    paymentMethod: string,
    cardNumber: string,
    cardExpiry: string,
    cardCVC: string
  ): any {
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
      return HTTP.request(this.paymentAPIUrl, options);
    } else {
      return undefined;
    }
  }
}
