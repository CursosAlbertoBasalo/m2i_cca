/* eslint-disable @typescript-eslint/no-explicit-any */
export class HTTPs {
  static request(url: string, options: any): any {
    return { url, options, status: 200, body: { data: {} } };
  }
}
