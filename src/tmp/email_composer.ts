/* eslint-disable no-unused-vars */
import { Booking } from "./booking";
import { Payment } from "./payment";

export interface IEmailComposer {
  getSubject(): string;
  getBody(): string;
}

export class EmailConfirmationComposer implements IEmailComposer {
  private newLine = "\n";

  public constructor(private booking: Booking, private payment: Payment) {}

  public getSubject(): string {
    return "Confirmation of Booking: " + this.booking.id;
  }

  public getBody(): string {
    return this.getSalutation() + this.getMainBody() + this.getSignature();
  }

  private getSalutation(): string {
    return "Dear " + this.booking.travelerId + ", your booking is confirmed" + this.newLine + this.newLine;
  }
  private getMainBody(): string {
    return (
      JSON.stringify(this.booking) + this.newLine + "Payment charged " + this.newLine + JSON.stringify(this.payment)
    );
  }
  private getSignature(): string {
    return "Happy to get you on board," + this.newLine + "The Astro Bookings team";
  }
}

export class EmailCancellationComposer implements IEmailComposer {
  private newLine = "\n";

  public constructor(private booking: Booking, private payment: Payment) {}
  public getSubject(): string {
    return "Cancellation of trip for Booking: " + this.booking.id;
  }

  public getBody(): string {
    return this.getSalutation() + this.getMainBody() + this.getSignature();
  }

  private getSalutation(): string {
    return "Dear " + this.booking.travelerId + ", your trip was cancelled" + this.newLine + this.newLine;
  }
  private getMainBody(): string {
    return (
      JSON.stringify(this.booking) + this.newLine + "Payment refund " + this.newLine + JSON.stringify(this.payment)
    );
  }
  private getSignature(): string {
    return "Sorry for the inconvenience," + this.newLine + "The Astro Bookings team";
  }
}
