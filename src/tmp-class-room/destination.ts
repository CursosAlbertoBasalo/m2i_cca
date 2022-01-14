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
