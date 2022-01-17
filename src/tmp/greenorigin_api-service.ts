import { DateRange } from "./date_range";
import { Destination } from "./destination";
import { OperatorsAPIBase } from "./operators_api_base.service";
import { Payment } from "./payment";

export class GreenOriginAPI extends OperatorsAPIBase {
  private operatorAPIUrl = "https://greenorigin.com/api/v1/flights";
  public hasAvailability(destinationId: string, travelDates: DateRange, passengersCount: number): boolean {
    const body = {
      destination: destinationId,
      startDate: travelDates.start,
      endDate: travelDates.end,
      seats: passengersCount,
    };
    const options = super.getOptions(JSON.stringify(body));
    const response = super.request(this.operatorAPIUrl, options);
    return response.body.data;
  }
  public sendBooking(destination: Destination, passengers: number, payment: Payment): unknown {
    let body = {};
    body = { destination, payment, seats: passengers };
    const options = super.getOptions(body);
    return super.request(this.operatorAPIUrl, options);
  }
}
