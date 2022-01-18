import { BookingsRepository } from "../3-infrastructure/bookings.repository";
import { Traveler } from "./traveler";

export class TravelerFacade {
  private static repository = new BookingsRepository();
  public static loadTravelerById(travelerId: string) {
    const travelerDto = this.repository.loadTraveler(travelerId);
    return new Traveler(travelerDto);
  }
}
