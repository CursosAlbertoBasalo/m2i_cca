/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { HTTP } from "./http";

export class OperatorsAPIBase {
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
