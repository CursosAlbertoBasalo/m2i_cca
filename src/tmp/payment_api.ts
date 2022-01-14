/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
/* eslint-disable complexity */
/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-depth */
/* eslint-disable max-lines-per-function */

import { CreditCard } from "./credit_card";
import { HTTP } from "./http";
export class PaymentAPI {
  private paymentAPIUrl = "https://pay-me.com/v1/payments";

  public pay(amount: any, paymentMethod: string, creditCard: CreditCard): any {
    if (paymentMethod === "Credit Card") {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          creditCardNumber: creditCard.number,
          creditCardExpiryDate: creditCard.expiry,
          creditCardCVC: creditCard.CVC,
        }),
      };
      return HTTP.request(this.paymentAPIUrl, options);
    } else {
      return undefined;
    }
  }
}
