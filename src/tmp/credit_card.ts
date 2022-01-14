/* eslint-disable no-magic-numbers */
export class CreditCard {
  constructor(public readonly number: string, public readonly expiry: string, public readonly CVC: string) {
    if (number.length != 16) {
      throw Error("Wrong number");
    }
    if (expiry.length != 5) {
      throw Error("Wrong number");
    }
    if (CVC.length != 3) {
      throw Error("Wrong number");
    }
  }
}
