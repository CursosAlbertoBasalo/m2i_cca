export class DateRange {
  constructor(public readonly start: Date, public readonly end: Date) {
    if (start > end) {
      throw Error("Invalid date range");
    }
  }
  public calculateNights() {
    // eslint-disable-next-line no-magic-numbers
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const nightsCount = Math.round((this.end.getTime() - this.start.getTime()) / millisecondsPerDay);
    return nightsCount;
  }
}
