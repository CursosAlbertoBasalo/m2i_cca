/* eslint-disable no-magic-numbers */
import { DB } from "./bd";
import { BookingDto } from "./booking.dto";
import { DestinationDTO } from "./destination.dto";
import { TravelerDto } from "./traveler.dto";

export class BookingsRepository {
  public save(booking: BookingDto): number {
    return DB.insert(booking);
  }
  public loadTraveler(travelerId: string): TravelerDto {
    const fake = new TravelerDto(travelerId, false);
    return DB.select(travelerId) || fake;
  }
  public loadDestination(destinationId: string): DestinationDTO | undefined {
    const destinationDTOFake = new DestinationDTO(destinationId, "SpaceY", 200, 20);
    return destinationDTOFake;
  }
}
