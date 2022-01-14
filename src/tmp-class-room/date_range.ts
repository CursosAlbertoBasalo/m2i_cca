// Value Object
export class DateRange {
  constructor(public readonly start: Date, public readonly end: Date) {
    // invariant
    if (start > end) {
      throw Error("Invalid dates");
    }
  }
  public toString() {
    return this.start + " - " + this.end;
  }
  public calculateNights() {
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const stayingNights = Math.round((this.end.getTime() - this.start.getTime()) / millisecondsPerDay);
    return stayingNights;
  }
}

export class PassengersCount {
  constructor(count: number) {
    if (count <= 0 || count > 1000) throw Error("");
  }
}

export class Edad {
  constructor(años: number) {
    if (años <= 0 || años > 100) throw Error("");
  }
}

export class Distancia {
  constructor(valor: number, unidad = "metros") {
    if (valor <= 0) throw Error("");
  }
}
// Anemic POCO Plain Old C Objects POJO Data Object

export class DateRangeA {
  constructor(public readonly start: Date, public readonly end: Date) {}
}

class RangeValidator {
  public validate(range: DateRangeA): boolean {
    return true;
  }
}
const miRango = new DateRange(new Date(2022, 0, 10), new Date(2022, 0, 18));
miRango.end = new Date(2021, 5, 24);
