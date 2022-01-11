/* eslint-disable max-params */

export class Booking {
  id = "";
  destinationId: string;
  startDate: Date;
  endDate: Date;
  travelerId: string;
  passengersCount: number;
  totalPrice: number;
  constructor(
    destinationId: string,
    startDate: Date,
    endDate: Date,
    travelerId: string,
    passengersCount: number,
    totalPrice: number
  ) {
    this.destinationId = destinationId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.travelerId = travelerId;
    this.passengersCount = passengersCount;
    this.totalPrice = totalPrice;
  }
}
