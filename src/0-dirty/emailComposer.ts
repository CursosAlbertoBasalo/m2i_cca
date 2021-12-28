export class EmailComposer {
  private newLine = "\n";
  constructor(private booking: any, private payment: any) {}
  getSalutation() {
    return "Dear " + this.booking.client.client + "," + this.newLine + this.newLine;
  }
  getMainBody() {
    return JSON.stringify(this.booking) + this.newLine + JSON.stringify(this.payment);
  }
  getSignature() {
    return "Best regards," + this.newLine + "The Astro Bookings team";
  }
}
