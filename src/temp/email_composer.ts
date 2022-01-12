/* eslint-disable no-unused-vars */
import { Booking } from "./booking";
import { Payment } from "./payment";

export class EmailComposer {
  private newLine = "\n";

  public constructor(private booking: Booking, private payment: Payment) {}

  public getSalutation(): string {
    return "Dear " + this.booking.travelerId + "," + this.newLine + this.newLine;
  }
  public getMainBody(): string {
    return JSON.stringify(this.booking) + this.newLine + JSON.stringify(this.payment);
  }
  public getSignature(): string {
    return "Best regards," + this.newLine + "The Astro Bookings team";
  }
}
