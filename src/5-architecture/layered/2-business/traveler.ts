import { TravelerDto } from "../3-infrastructure/traveler.dto";

export class Traveler {
  public id: string;
  public isVIP: boolean;
  constructor(travelerDto: TravelerDto) {
    this.id = travelerDto.id;
    this.isVIP = travelerDto.isVIP;
  }
}
