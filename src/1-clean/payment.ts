/* eslint-disable max-params */
export class Payment {
  paymentId: string;
  cardNumber: string;
  cardExpiry: string;
  cardCVC: string;
  amount: number;
  date: Date;
  constructor(
    paymentId: string,
    cardNumber: string,
    cardExpiry: string,
    cardCVC: string,
    amount: number,
    date: Date
  ) {
    this.paymentId = paymentId;
    this.cardNumber = cardNumber;
    this.cardExpiry = cardExpiry;
    this.cardCVC = cardCVC;
    this.amount = amount;
    this.date = date;
  }
}
