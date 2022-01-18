export class TravelerDto {
  public readonly id: string;
  public readonly isVIP: boolean;

  constructor(id: string, isVIP: boolean) {
    this.id = id;
    this.isVIP = isVIP;
  }
}
