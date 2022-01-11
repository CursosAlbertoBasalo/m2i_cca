/* eslint-disable max-params */

export class Booking {
  bookingId = "";
  destination: string;
  startDate: Date;
  endDate: Date;
  traveler: string;
  passengers: number;
  totalPrice: number;

  constructor(
    destination: string,
    startDate: Date,
    endDate: Date,
    traveler: string,
    passengers: number,
    totalPrice: number
  ) {
    this.destination = destination;
    this.startDate = startDate;
    this.endDate = endDate;
    this.traveler = traveler;
    this.passengers = passengers;
    this.totalPrice = totalPrice;
  }
}
