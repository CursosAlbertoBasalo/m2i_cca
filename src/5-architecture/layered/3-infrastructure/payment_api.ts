import { HTTP } from "./http";

export class PaymentAPI {
  private static paymentAPIUrl = "https://pay-me.com/v1/payments";

  public static send(body: unknown): unknown {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
    return HTTP.request(PaymentAPI.paymentAPIUrl, options);
  }
}
