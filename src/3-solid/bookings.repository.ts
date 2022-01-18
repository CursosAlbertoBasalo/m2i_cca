import { DB } from "./bd";
import { Booking } from "./booking";
import { Traveler } from "./traveler";

export class BookingRepository {
  public getTraveler(travelerId: string): Traveler {
    const fake = new Traveler(travelerId, false);
    return DB.select(travelerId) || fake;
  }

  public save(booking: Booking | undefined): number {
    if (!booking) {
      const recordsAffected = 0;
      return recordsAffected;
    }
    return DB.insert(booking);
  }
}
