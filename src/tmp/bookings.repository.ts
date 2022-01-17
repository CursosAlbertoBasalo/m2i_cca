/* eslint-disable no-magic-numbers */
import { DB } from "./bd";
import { Booking } from "./booking";
import { StayingDestination, TripOnlyDestination } from "./destination";
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
    switch (destinationId) {
      case "Mars":
        return new StayingDestination(destinationId, "SpaceY", 200, 20);
      case "The Moon":
        return new StayingDestination(destinationId, "SpaceY", 100, 10);
      case "ISS":
        return new StayingDestination(destinationId, "GreenOrigin", 50, 5);
      case "Orbit":
        return new TripOnlyDestination(destinationId, "GreenOrigin", 20, 0);
      default:
        return undefined;
    }
  }
}
