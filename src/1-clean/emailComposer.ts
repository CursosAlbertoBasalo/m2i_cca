/* eslint-disable no-unused-vars */
import { Booking } from "./booking";
import { Payment } from "./payment";

export class EmailComposer {
  private newLine = "\n";

  constructor(private booking: Booking, private payment: Payment) {}

  getSalutation() {
    return "Dear " + this.booking.traveler + "," + this.newLine + this.newLine;
  }
  getMainBody() {
    return JSON.stringify(this.booking) + this.newLine + JSON.stringify(this.payment);
  }
  getSignature() {
    return "Best regards," + this.newLine + "The Astro Bookings team";
  }
}
