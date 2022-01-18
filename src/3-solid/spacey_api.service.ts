import { DateRange } from "./date_range";
import { HTTP } from "./http";

export class OperatorsAPIBase {
  public hasAvailability(destinationId: string, travelDates: DateRange, passengersCount: number): boolean {
    return true;
  }
  public sendBooking(destination: any, passengers: number, payment: any): any {
    throw Error("");
  }
}

export class SpaceyAPI extends OperatorsAPIBase {
  private operatorAPIUrl = "https://spacey.com/api/v1/flights";

  public hasAvailability(destinationId: string, travelDates: DateRange, passengersCount: number): boolean {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ destination: destinationId, seats: passengersCount }),
    };
    const response = HTTP.request(this.operatorAPIUrl, options);
    return response.body;
  }
  public sendBooking(destination: any, passengers: number, payment: any): any {}
}
export class GreenOriginAPI extends OperatorsAPIBase {}
