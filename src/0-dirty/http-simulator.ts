/* eslint-disable @typescript-eslint/no-explicit-any */
export class HTTPs {
  static request(url: string, options: any): any {
    console.debug(url + JSON.stringify(options));
    return { status: 200, body: "OK" };
  }
}
