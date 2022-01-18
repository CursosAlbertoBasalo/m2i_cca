/* eslint-disable max-params */
export class BookingDto {
  public readonly id = "";
  public readonly destinationId: string;
  public readonly startDate: Date;
  public readonly endDate: Date;
  public readonly travelerId: string;
  public readonly passengersCount: number;
  public readonly totalPrice: number;
  constructor(
    destinationId: string,
    startDate: Date,
    endDate: Date,
    travelerId: string,
    passengersCount: number,
    totalPrice: number
  ) {
    this.destinationId = destinationId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.travelerId = travelerId;
    this.passengersCount = passengersCount;
    this.totalPrice = totalPrice;
  }
}
