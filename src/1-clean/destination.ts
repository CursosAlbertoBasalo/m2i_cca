export class Destination {
  destination: string;
  operator: string;
  flightPrice: number;
  stayingNightPrice: number;
  constructor(
    destination: string,
    operator: string,
    flightPrice: number,
    stayingNightPrice: number
  ) {
    this.destination = destination;
    this.operator = operator;
    this.flightPrice = flightPrice;
    this.stayingNightPrice = stayingNightPrice;
  }
}
