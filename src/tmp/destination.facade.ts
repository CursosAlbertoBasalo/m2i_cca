import { BookingsRepository } from "./bookings.repository";
import { DateRange } from "./date_range";
import {
  CalculateFlightPrice,
  CalculatePremiumFoods,
  CalculateStayingPrice,
  IDestinationId,
  StayingDestination,
  TripOnlyDestination,
} from "./destination";

export class DestinationFacade {
  private static repository = new BookingsRepository();
  public static calculateTotalPrice(destination: IDestinationId, travelDates: DateRange, passengersCount: number) {
    let totalPrice = 0;
    if (destination instanceof CalculateFlightPrice) {
      totalPrice = destination.calculateFlightPrice(passengersCount);
    }
    if (destination instanceof CalculatePremiumFoods) {
      totalPrice += destination.addPremiumFood();
    }
    if (destination instanceof CalculateStayingPrice) {
      totalPrice += destination.calculateStagingPrice(passengersCount, travelDates);
      totalPrice += destination.addExtraLuggage(0);
    }
    return totalPrice;
  }
  public static loadDestinationById(destinationId: string): StayingDestination | TripOnlyDestination | undefined {
    return this.repository.loadDestination(destinationId);
  }
}
