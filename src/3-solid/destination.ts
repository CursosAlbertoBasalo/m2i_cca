/* eslint-disable @typescript-eslint/no-unused-vars */
import { DateRange } from "./date_range";

/* eslint-disable no-unused-vars */
export class Destination {
  id: string;
  operatorId: string;
  flightPrice: number;
  stayingNightPrice: number;

  constructor(id: string, operatorId: string, flightPrice: number, stayingNightPrice: number) {
    this.id = id;
    this.operatorId = operatorId;
    this.flightPrice = flightPrice;
    this.stayingNightPrice = stayingNightPrice;
  }
}

export interface ICalculatePriceFlight {
  calculatePriceFlight(passengersCount: number): number;
}

export interface ICalculateStayingPrice {
  calculateStayingPrice(passengersCount: number, travelDates: DateRange): number;
  addExtraLuggage(kilos: number): number;
}

export interface ICalculatePremiumFoods {
  addPremiumFoods(passengersCount: number): number;
}

export class StayingDestination implements ICalculatePriceFlight, ICalculateStayingPrice {
  calculateStayingPrice(passengersCount: number, travelDates: DateRange): number {
    throw new Error("Method not implemented.");
  }
  addExtraLuggage(kilos: number): number {
    throw new Error("Method not implemented.");
  }
  calculatePriceFlight(passengersCount: number): number {
    throw new Error("Method not implemented.");
  }
}

export class TripOnlyDestination implements ICalculatePriceFlight, ICalculatePremiumFoods {
  addPremiumFoods(passengersCount: number): number {
    throw new Error("Method not implemented.");
  }
  calculatePriceFlight(passengersCount: number): number {
    throw new Error("Method not implemented.");
  }
}
