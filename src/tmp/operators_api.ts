import { DateRange } from "./date_range";
import { StayingDestination } from "./destination";
import { GreenOriginAPI } from "./greenorigin_api-service";
import { OperatorsAPIBase } from "./operators_api_base.service";
import { Payment } from "./payment";
import { SpaceyAPI } from "./spacey_api.service";

export class OperatorsAPI {
  // private to fullfil the Demeter Principle
  private operatorAPI: OperatorsAPIBase;

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
  public sendBooking(destination: StayingDestination, passengers: number, payment: Payment): unknown {
    return this.operatorAPI.sendBooking(destination, passengers, payment);
  }
}
