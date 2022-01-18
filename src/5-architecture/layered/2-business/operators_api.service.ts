import { DateRange } from "./date_range";
import { IDestinationId } from "./destination";
import { GreenOriginAPI } from "./greenorigin_api.service";
import { Payment } from "./payment";
import { SpaceyAPI } from "./spacey_api.service";

export class OperatorsAPIService {
  // private to fullfil the Demeter Principle
  private operatorAPI: SpaceyAPI | GreenOriginAPI;

  constructor(private operatorId: string) {
    if (operatorId === "spacey") {
      this.operatorAPI = new SpaceyAPI();
    } else {
      this.operatorAPI = new GreenOriginAPI();
    }
  }

  public hasAvailability(destinationId: string, travelDates: DateRange, passengersCount: number): boolean {
    return this.operatorAPI.hasAvailability(destinationId, travelDates, passengersCount);
  }
  public sendBooking(destination: IDestinationId, passengers: number, payment: Payment): unknown {
    return this.operatorAPI.sendBooking(destination, passengers, payment);
  }
}
