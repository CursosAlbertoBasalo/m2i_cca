import { CreditCard } from "./credit_card";

/* eslint-disable max-params */
export class Payment {
  id: string;
  creditCard: CreditCard;
  amount: number;
  date: Date;
  constructor(id: string, creditCard: CreditCard, amount: number, date: Date) {
    this.id = id;
    this.creditCard = creditCard;
    this.amount = amount;
    this.date = date;
  }
}
