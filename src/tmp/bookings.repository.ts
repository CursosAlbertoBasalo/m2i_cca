/* eslint-disable no-magic-numbers */
import { DB } from "./bd";
import { Booking } from "./booking";
import { StayingDestination, TripOnlyDestination } from "./destination";
import { DestinationBuilder } from "./destination.builder";
import { DestinationDTO } from "./destination.dto";
import { Traveler } from "./traveler";

export class BookingsRepository {
  public save(booking: Booking | undefined): number {
    if (!booking) {
      const recordsAffected = 0;
      return recordsAffected;
    }
    return DB.insert(booking);
  }
  public loadTraveler(travelerId: string): Traveler {
    const fake = new Traveler(travelerId, false);
    return DB.select(travelerId) || fake;
  }
  public loadDestination(destinationId: string): StayingDestination | TripOnlyDestination | undefined {
    const destinationDTOFake = new DestinationDTO(destinationId, "SpaceY", 200, 20);
    return DestinationBuilder.build(destinationDTOFake);
  }
}
