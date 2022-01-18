/* eslint-disable max-lines */
/* eslint-disable complexity */
/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-depth */
/* eslint-disable max-lines-per-function */

import { GreenOriginAPI } from "@ab/tmp/greenorigin_api.service";
import { DateRange } from "./date_range";
import { OperatorsAPIBase, SpaceyAPI } from "./spacey_api.service";

export class OperatorsAPI {
  // private operatorAPIUrl: string;
  private operatorAPI: OperatorsAPIBase;

  constructor(operatorId: string) {
    if (operatorId === "SpaceY") {
      this.operatorAPI = new SpaceyAPI();
    } else {
      this.operatorAPI = new GreenOriginAPI();
    }
  }

  public hasAvailability(destinationId: string, travelDates: DateRange, passengersCount: number): boolean {
    return this.operatorAPI.hasAvailability(destinationId, travelDates, passengersCount);
  }
  public sendBooking(destination: any, passengers: number, payment: any): any {
    return this.operatorAPI.sendBooking(destination, passengers, payment);
  }
}
