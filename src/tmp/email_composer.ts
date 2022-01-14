/* eslint-disable no-unused-vars */
import { Booking } from "./booking";
import { Payment } from "./payment";

export class EmailComposer {
  private newLine = "\n";

  public constructor(private booking: Booking, private payment: Payment) {}

  public getBody(): string {
    return this.getSalutation() + this.getMainBody() + this.getSignature();
  }

  private getSalutation(): string {
    return "Dear " + this.booking.travelerId + "," + this.newLine + this.newLine;
  }
  private getMainBody(): string {
    return JSON.stringify(this.booking) + this.newLine + JSON.stringify(this.payment);
  }
  private getSignature(): string {
    return "Best regards," + this.newLine + "The Astro Bookings team";
  }
}
