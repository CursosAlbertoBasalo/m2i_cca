/* eslint-disable max-statements */
/* eslint-disable max-lines */
/* eslint-disable complexity */
/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-depth */
/* eslint-disable max-lines-per-function */

import { Booking } from "./booking";
import { BookingsRepository } from "./bookings.repository";
import { CreditCard } from "./credit_card";
import { DateRange } from "./date_range";
import { IDestinationId } from "./destination";
import { DestinationFacade } from "./destination.facade";
import { EmailConfirmationComposer } from "./email_composer";
import { EmailSender } from "./email_sender";
import { OperatorsAPI } from "./operators_api";
import { Payment } from "./payment";
import { PaymentAPI } from "./payment_api";
import { Traveler } from "./traveler";

export class BookingsService {
  public traveler: Traveler | undefined;
  public destination?: IDestinationId;
  private repository = new BookingsRepository();

  public create(
    destinationId: string,
    travelDates: DateRange,
    travelerId: string,
    passengersCount = 1
  ): Booking | undefined {
    if (this.hasInvalidData(destinationId, travelerId)) {
      return undefined;
    }
    this.traveler = this.repository.loadTraveler(travelerId); // Testing problem
    if (this.cantBookPassengerCount(this.traveler, passengersCount)) {
      return undefined;
    }
    const destination = DestinationFacade.loadDestinationById(destinationId);
    if (!destination) {
      return undefined;
    }
    this.destination = destination;
    if (!this.hasAvailability(this.destination, travelDates, passengersCount)) {
      return undefined;
    }
    const totalPrice = DestinationFacade.calculateTotalPrice(destination, travelDates, passengersCount);
    const booking = new Booking(destinationId, travelDates, travelerId, passengersCount, totalPrice);
    return booking;
  }

  public pay(booking: Booking | undefined, paymentMethod: string, creditCard: CreditCard): Payment | undefined {
    if (!booking) {
      return undefined;
    }
    if (this.isInvalidPaymentData(paymentMethod)) {
      return undefined;
    }
    const paymentGateway = new PaymentAPI();
    return paymentGateway.pay(booking.totalPrice, paymentMethod, creditCard);
  }
  public notifyConfirmationToTraveler(
    booking: Booking | undefined,
    payment: Payment | undefined,
    travelerEmail: string
  ): any {
    if (!booking) {
      return undefined;
    }
    if (!payment) {
      return undefined;
    }
    if (!travelerEmail) {
      return undefined;
    }
    // tell dont ask
    const emailSender = new EmailSender();
    const confirmationComposer = new EmailConfirmationComposer(booking, payment);
    return emailSender.sendToTraveler(confirmationComposer, travelerEmail);
  }
  public notifyBookingToOperator(destination: IDestinationId, passengersCount: number, payment: Payment): any {
    const providersApi = new OperatorsAPI(destination.operatorId);
    return providersApi.sendBooking(destination, passengersCount, payment);
  }

  public hasAvailability(destination: IDestinationId, travelDates: DateRange, passengersCount: number): boolean {
    const operatorsApi: OperatorsAPI = new OperatorsAPI(destination.operatorId);
    const availability = operatorsApi.hasAvailability(destination.id, travelDates, passengersCount);
    return availability;
  }
  private areIdentifiersInvalid(destinationId: string, travelerId: string): boolean {
    if (destinationId.length == 0 || travelerId.length == 0) {
      return true;
    }
    return false;
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
  private hasInvalidData(destinationId: string, travelerId: string): boolean {
    if (this.areIdentifiersInvalid(destinationId, travelerId)) {
      return true;
    }
    return false;
  }
  private isInvalidPaymentData(paymentMethod: string) {
    if (!paymentMethod) {
      return true;
    }
    return false;
  }
}
