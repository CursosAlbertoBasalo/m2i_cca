/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
/* eslint-disable complexity */
/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-depth */
/* eslint-disable max-lines-per-function */

import { HTTPs } from "./http-simulator";
export class PaymentGateway {
  private paymentUrl = "https://pay-me.com/v1/payments";
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
      return HTTPs.request(this.paymentUrl, options);
    } else {
      return undefined;
    }
  }
}
