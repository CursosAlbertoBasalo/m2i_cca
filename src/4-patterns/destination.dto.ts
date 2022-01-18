/* eslint-disable max-params */
export class DestinationDTO {
  public readonly id: string;
  public readonly operatorId: string;
  public readonly flightPrice: number;
  public readonly stayingNightPrice: number;
  constructor(id: string, operatorId: string, flightPrice: number, stayingNightPrice: number) {
    this.id = id;
    this.operatorId = operatorId;
    this.flightPrice = flightPrice;
    this.stayingNightPrice = stayingNightPrice;
  }
}
