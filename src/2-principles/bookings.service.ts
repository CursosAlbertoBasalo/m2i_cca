/* eslint-disable max-statements */
/* eslint-disable max-lines */
/* eslint-disable complexity */
/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-depth */
/* eslint-disable max-lines-per-function */

import { DB } from "./bd";
import { Booking } from "./booking";
import { Destination } from "./destination";
import { EmailSender } from "./email_sender";
import { OperatorsAPI } from "./operators_api";
import { Payment } from "./payment";
import { PaymentAPI } from "./payment_api";
import { Traveler } from "./traveler";

export class BookingsService {
  public traveler: Traveler | undefined;
  public destination: Destination | undefined;

  public create(
    destinationId: string,
    startDate: Date,
    endDate: Date,
    travelerId: string,
    passengersCount = 1
  ): Booking | undefined {
    if (this.hasInvalidData(destinationId, startDate, endDate, travelerId)) {
      return undefined;
    }
    this.traveler = this.getTraveler(travelerId);
    if (this.cantBookPassengerCount(this.traveler, passengersCount)) {
      return undefined;
    }
    const destination = this.getDestination(destinationId);
    if (!destination) {
      return undefined;
    }
    this.destination = destination;
    if (!this.hasAvailability(this.destination, startDate, endDate, passengersCount)) {
      return undefined;
    }
    const totalPrice = this.calculateTotalPrice(this.destination, endDate, startDate, passengersCount);
    const booking = new Booking(destinationId, startDate, endDate, travelerId, passengersCount, totalPrice);
    return booking;
  }
  public getDestination(destinationId: string): Destination | undefined {
    switch (destinationId) {
      case "Mars":
        return new Destination(destinationId, "SpaceY", 200, 20);
      case "The Moon":
        return new Destination(destinationId, "SpaceY", 100, 10);
      case "ISS":
        return new Destination(destinationId, "GreenOrigin", 50, 5);
      case "Orbit":
        return new Destination(destinationId, "GreenOrigin", 20, 2);
      default:
        return undefined;
    }
  }
  public pay(
    booking: Booking | undefined,
    paymentMethod: string,
    cardNumber: string,
    cardExpiry: string,
    cardCVC: string
  ): Payment | undefined {
    if (!booking) {
      return undefined;
    }
    if (this.isInvalidPaymentData(paymentMethod, cardNumber, cardExpiry, cardCVC)) {
      return undefined;
    }
    const paymentGateway = new PaymentAPI();
    return paymentGateway.pay(booking.totalPrice, paymentMethod, cardNumber, cardExpiry, cardCVC);
  }
  public notifyConfirmationToTraveller(
    booking: Booking | undefined,
    payment: Payment | undefined,
    travelerEmail: string
  ): any {
    if (!booking) {
      return undefined;
    }
    if (!payment || !travelerEmail) {
      return undefined;
    }
    const emailSender = new EmailSender();
    const body = emailSender.getBody(booking, payment);
    return emailSender.send(travelerEmail, "Booking Confirmation", body);
  }
  public notifyBookingToOperator(destination: Destination, passengersCount: number, payment: Payment): any {
    const providersApi = new OperatorsAPI(destination.operatorId);
    return providersApi.sendBooking(destination, passengersCount, payment);
  }
  public save(booking: Booking | undefined): number {
    if (!booking) {
      const recordsAffected = 0;
      return recordsAffected;
    }
    return DB.insert(booking);
  }
  public hasAvailability(destination: Destination, startDate: Date, endDate: Date, passengersCount: number): boolean {
    const providersApi: OperatorsAPI = new OperatorsAPI(destination.operatorId);
    const availability = providersApi.hasAvailability(destination.id, startDate, endDate, passengersCount);
    return availability;
  }
  public getTraveler(travelerId: string): Traveler {
    const fake = new Traveler(travelerId, false);
    return DB.select(travelerId) || fake;
  }

  private areIdentifiersInvalid(destinationId: string, travelerId: string): boolean {
    if (destinationId.length == 0 || travelerId.length == 0) {
      return true;
    }
    return false;
  }
  private areDatesInvalid(startDate: Date, endDate: Date): boolean {
    return startDate > endDate;
  }
  private cantBookPassengerCount(traveler: Traveler, passengersCount: number): boolean {
    const maxPassengersPerBooking = 4;
    const maxPassengersPerVIPBooking = 6;
    if (
      passengersCount <= maxPassengersPerBooking ||
      (traveler.isVIP && passengersCount <= maxPassengersPerVIPBooking)
    ) {
      return false;
    }
    return true;
  }
  private hasInvalidData(destinationId: string, startDate: Date, endDate: Date, travelerId: string): boolean {
    if (this.areIdentifiersInvalid(destinationId, travelerId) || this.areDatesInvalid(startDate, endDate)) {
      return true;
    }
    return false;
  }
  private isInvalidPaymentData(paymentMethod: string, cardNumber: string, cardExpiry: string, cardCVC: string) {
    if (!paymentMethod || !cardNumber || !cardExpiry || !cardCVC) {
      return true;
    }
    return false;
  }
  private calculateTotalPrice(destination: Destination, endDate: Date, startDate: Date, passengersCount: number) {
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const stayingNights = Math.round((endDate.getTime() - startDate.getTime()) / millisecondsPerDay);
    const totalPrice = (destination.flightPrice + destination.stayingNightPrice * stayingNights) * passengersCount;
    return totalPrice;
  }
}
