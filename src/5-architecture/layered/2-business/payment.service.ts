/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
/* eslint-disable complexity */
/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-depth */
/* eslint-disable max-lines-per-function */

import { PaymentAPI } from "../3-infrastructure/payment_api";
import { CreditCard } from "./credit_card";
export class PaymentService {
  public pay(amount: any, paymentMethod: string, creditCard: CreditCard): any {
    if (paymentMethod === "Credit Card") {
      const body = JSON.stringify({
        amount,
        creditCardNumber: creditCard.number,
        creditCardExpiryDate: creditCard.expiry,
        creditCardCVC: creditCard.CVC,
      });
      return PaymentAPI.send(body);
    } else return undefined;
  }
}
