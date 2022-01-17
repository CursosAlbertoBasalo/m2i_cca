import { DateRange } from "./date_range";
import { StayingDestination } from "./destination";
import { OperatorsAPIBase } from "./operators_api_base.service";

export class SpaceyAPI extends OperatorsAPIBase {
  private operatorAPIUrl = "https://spacey.com/api/v1/flights";
  public hasAvailability(destinationId: string, travelDates: DateRange, passengersCount: number): boolean {
    // Liskov: What happens with travelDates?
    const body = { destination: destinationId, seats: passengersCount };
    const options = super.getOptions(JSON.stringify(body));
    const response = super.request(this.operatorAPIUrl, options);
    return response.body;
  }
  public sendBooking(destination: StayingDestination, passengers: number): unknown {
    const body = { destination, seats: passengers };
    const options = super.getOptions(body);
    return super.request(this.operatorAPIUrl, options);
  }
}
