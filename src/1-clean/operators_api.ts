/* eslint-disable max-lines */
/* eslint-disable complexity */
/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-depth */
/* eslint-disable max-lines-per-function */

import { HTTP } from "./http";

export class OperatorsAPI {
  private operatorAPIUrl: string;

  constructor(private operatorId: string) {
    this.operatorAPIUrl = this.getOperatorApiUrl(operatorId);
  }

  public hasAvailability(
    destinationId: string,
    startDate: Date,
    endDate: Date,
    passengersCount: number
  ): any {
    let body = {};
    if (this.operatorId === "SpaceY") {
      body = { destination: destinationId, seats: passengersCount };
    } else {
      body = { destination: destinationId, startDate, endDate, seats: passengersCount };
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const response = HTTP.request(this.operatorAPIUrl, options);
    if (this.operatorId === "SpaceY") {
      return response.body;
    } else {
      return response.body.data;
    }
  }
  public sendBooking(destination: any, passengers: number, payment: any): any {
    let body = {};
    if (this.operatorId === "SpaceY") {
      body = { destination, seats: passengers };
    } else {
      body = { destination, payment, seats: passengers };
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
    return HTTP.request(this.operatorAPIUrl, options);
  }
  private getOperatorApiUrl(operator: string) {
    if (operator === "SpaceY") {
      return "https://spacey.com/api/v1/flights";
    } else {
      return "https://greenorigin.com/api/v1/flights";
    }
  }
}
