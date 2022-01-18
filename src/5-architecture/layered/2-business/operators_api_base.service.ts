/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { HTTP } from "../3-infrastructure/http";
import { DateRange } from "./date_range";
import { IDestinationId } from "./destination";
import { Payment } from "./payment";

export class OperatorsAPIBase {
  public hasAvailability(destinationId: string, travelDates: DateRange, passengersCount: number): boolean {
    throw Error("Method not implemented.");
  }
  public sendBooking(destination: IDestinationId, passengers: number, payment: Payment): unknown {
    throw Error("Method not implemented.");
  }
  protected getOptions(body: unknown): unknown {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }
  protected request(url: string, option: unknown) {
    return HTTP.request(url, option);
  }
}
