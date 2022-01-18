/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-unused-vars */

import { DateRange } from "./date_range";

export interface IDestinationId {
  id: string;
  operatorId: string;
}

export interface ICalculateFlightPrice {
  calculateFlightPrice(passengersCount: number): number;
}

export interface ICalculateStayingPrice {
  calculateStagingPrice(passengersCount: number, travelDates: DateRange): number;
  addExtraLuggage(kilos: number): number;
}

export interface ICalculatePremiumFoods {
  addPremiumFood(): number;
}

// Mandatory abstract clases (javascript limitation of no interfaces)
export abstract class DestinationId implements IDestinationId {
  id: string;
  operatorId: string;
  constructor(id: string, operatorId: string) {
    this.id = id;
    this.operatorId = operatorId;
  }
}

export abstract class CalculateFlightPrice implements ICalculateFlightPrice {
  calculateFlightPrice(passengersCount: number): number {
    throw Error("not implemented");
  }
}

export abstract class CalculateStayingPrice implements ICalculateStayingPrice {
  calculateStagingPrice(passengersCount: number, travelDates: DateRange): number {
    throw Error("not implemented");
  }
  addExtraLuggage(kilos: number): number {
    throw Error("not implemented");
  }
}

export abstract class CalculatePremiumFoods implements ICalculatePremiumFoods {
  addPremiumFood(): number {
    throw Error("not implemented");
  }
}

export class StayingDestination extends DestinationId implements ICalculateFlightPrice, ICalculateStayingPrice {
  flightPrice: number;
  stayingNightPrice: number;

  constructor(id: string, operatorId: string, flightPrice: number, stayingNightPrice: number) {
    super(id, operatorId);
    this.flightPrice = flightPrice;
    this.stayingNightPrice = stayingNightPrice;
  }
  calculateFlightPrice(passengersCount: number): number {
    const flightPrice = this.flightPrice * passengersCount;
    return flightPrice;
  }
  calculateStagingPrice(passengersCount: number, travelDates: DateRange): number {
    const stayingNights = travelDates.calculateNights();
    const stayingPrice = this.stayingNightPrice * stayingNights * passengersCount;
    return stayingPrice;
  }

  addExtraLuggage(kilos: number) {
    return (this.flightPrice * kilos) / 1000;
  }
}

export class TripOnlyDestination extends DestinationId implements ICalculateFlightPrice, ICalculatePremiumFoods {
  flightPrice: number;

  constructor(id: string, operatorId: string, flightPrice: number) {
    super(id, operatorId);
    this.flightPrice = flightPrice;
  }
  calculateFlightPrice(passengersCount: number): number {
    const flightPrice = this.flightPrice * passengersCount;
    return flightPrice;
  }
  addPremiumFood() {
    return this.flightPrice * 0.01;
  }
}
