/* eslint-disable no-magic-numbers */
/* eslint-disable no-unused-vars */

import { DateRange } from "./date_range";

export class StayingDestination implements calculateFlightPrice, calculateStayingPrice {
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

export class TripOnlyDestination implements calculateFlightPrice, calculatePremiumFoods {
  id: string;
  operatorId: string;
  flightPrice: number;

  constructor(id: string, operatorId: string, flightPrice: number) {
    this.id = id;
    this.operatorId = operatorId;
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

// To do interfaces

export interface calculateFlightPrice {
  calculateFlightPrice(passengersCount: number): number;
}

export interface calculateStayingPrice {
  calculateStagingPrice(passengersCount: number, travelDates: DateRange): number;
  addExtraLuggage(kilos: number): number;
}

export interface calculatePremiumFoods {
  addPremiumFood(): number;
}
