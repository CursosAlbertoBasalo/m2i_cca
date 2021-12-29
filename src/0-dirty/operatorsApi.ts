/* eslint-disable max-lines */
/* eslint-disable complexity */
/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-depth */
/* eslint-disable max-lines-per-function */

import * as https from "https";

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
    return new Promise((resolve, reject) => {
      let data = "";
      const req = https.request(this.providerUrl, options, res => {
        res.on("data", d => {
          data += d;
        });
        res.on("end", () => {
          if (this.provider === "SpaceY") {
            resolve(data);
          } else {
            resolve(data.length);
          }
        });
      });
      req.on("error", () => {
        reject(undefined);
      });
      req.end();
    });
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
    return new Promise((resolve, reject) => {
      let data = "";
      const req = https.request(this.providerUrl, options, res => {
        res.on("data", d => {
          data += d;
        });
        res.on("end", () => {
          resolve(data);
        });
      });
      req.on("error", () => {
        reject(undefined);
      });
      req.end();
    });
  }
  private getOperatorApiUrl(operator: string) {
    if (operator === "SpaceY") {
      return "https://run.mocky.io/v3/f2c03a13-40bd-4ca0-9399-8ef05e6c4f11";
    } else {
      return "https://run.mocky.io/v3/f2c03a13-40bd-4ca0-9399-8ef05e6c4f11";
    }
    // https://designer.mocky.io/manage/delete/f2c03a13-40bd-4ca0-9399-8ef05e6c4f11/swjV8pX3w96Vpq9Bq0Vy2bzvwkCkWu7v9Zcm
  }
}
