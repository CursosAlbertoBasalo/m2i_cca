/* eslint-disable max-params */
export class Payment {
  id: string;
  cardNumber: string;
  cardExpiry: string;
  cardCVC: string;
  amount: number;
  date: Date;
  constructor(id: string, cardNumber: string, cardExpiry: string, cardCVC: string, amount: number, date: Date) {
    this.id = id;
    this.cardNumber = cardNumber;
    this.cardExpiry = cardExpiry;
    this.cardCVC = cardCVC;
    this.amount = amount;
    this.date = date;
  }
}
