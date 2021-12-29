/* eslint-disable max-lines */
/* eslint-disable complexity */
/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-depth */
/* eslint-disable max-lines-per-function */

import { HTTPs } from "./http-simulator";

export class OperatorsAPI {
  private providerUrl: string;

  constructor(private provider: string) {
    this.providerUrl = this.getOperatorApiUrl(provider);
  }

  public checkAvailability(
    destination: string,
    startDate: Date,
    endDate: Date,
    passengers: number
  ): any {
    let body = {};
    if (this.provider === "SpaceY") {
      body = { destination, seats: passengers };
    } else {
      body = { destination, startDate, endDate, seats: passengers };
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const response = HTTPs.request(this.providerUrl, options);
    if (this.provider === "SpaceY") {
      return response.body;
    } else {
      return response.body.data;
    }
  }
  public notifyBooking(destination: any, passengers: number, payment: any): any {
    let body = {};
    if (this.provider === "SpaceY") {
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
    return HTTPs.request(this.providerUrl, options);
  }
  private getOperatorApiUrl(operator: string) {
    if (operator === "SpaceY") {
      return "https://spacey.com/api/v1/flights";
    } else {
      return "https://greenorigin.com/api/v1/flights";
    }
  }
}
