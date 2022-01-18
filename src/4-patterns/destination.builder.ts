import { StayingDestination, TripOnlyDestination } from "./destination";
import { DestinationDTO } from "./destination.dto";

export class DestinationBuilder {
  public static build(destinationDTO: DestinationDTO) {
    if (destinationDTO.stayingNightPrice >= 0) {
      return new StayingDestination(
        destinationDTO.id,
        destinationDTO.operatorId,
        destinationDTO.flightPrice,
        destinationDTO.stayingNightPrice
      );
    } else {
      return new TripOnlyDestination(destinationDTO.id, destinationDTO.operatorId, destinationDTO.flightPrice);
    }
  }
}
