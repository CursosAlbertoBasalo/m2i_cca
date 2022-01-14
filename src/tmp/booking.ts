/* eslint-disable max-params */

import { DateRange } from "./date_range";

export class Booking {
  id = "";
  destinationId: string;
  travelDates: DateRange;
  travelerId: string;
  passengersCount: number;
  totalPrice: number;
  constructor(
    destinationId: string,
    travelDates: DateRange,
    travelerId: string,
    passengersCount: number,
    totalPrice: number
  ) {
    this.destinationId = destinationId;
    this.travelDates = travelDates;
    this.travelerId = travelerId;
    this.passengersCount = passengersCount;
    this.totalPrice = totalPrice;
  }
}
