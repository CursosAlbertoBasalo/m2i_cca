/* eslint-disable max-statements */
/* eslint-disable max-lines */
/* eslint-disable complexity */
/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-depth */
/* eslint-disable max-lines-per-function */

import { Booking } from "./booking";
import { Destination } from "./destination";
import { EmailSender } from "./emailSender";
import { OperatorsAPI } from "./operatorsApi";
import { Payment } from "./payment";
import { PaymentGateway } from "./PaymentGateway";
import { Traveler } from "./traveler";

export class Bookings {
  public traveler: Traveler | undefined;
  public destination: Destination | undefined;
  public addBooking(
    destination: string,
    startDate: Date,
    endDate: Date,
    travelerId: string,
    passengers = 1
  ): Booking | undefined {
    if (destination.length > 0 && travelerId.length > 0) {
      if (startDate < endDate) {
        this.traveler = this.getTraveler(travelerId);
        if (passengers <= 4 || (this.traveler.isVIP && passengers <= 6)) {
          this.destination = this.getDestination(destination);
          if (this.destination) {
            if (this.checkAvailability(this.destination, startDate, endDate, passengers)) {
              const stayingNights = Math.round(
                (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
              );
              const totalPrice =
                (this.destination.flightPrice +
                  this.destination.stayingNightPrice * stayingNights) *
                passengers;
              const booking = new Booking(
                destination,
                startDate,
                endDate,
                travelerId,
                passengers,
                totalPrice
              );
              return booking;
            }
          } else {
            return undefined;
          }
        } else {
          return undefined;
        }
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  }
  public getDestination(destination: string): Destination | undefined {
    switch (destination) {
      case "Mars":
        return new Destination(destination, "SpaceY", 200, 20);
      case "The Moon":
        return new Destination(destination, "SpaceY", 100, 10);
      case "ISS":
        return new Destination(destination, "GreenOrigin", 50, 5);
      case "Orbit":
        return new Destination(destination, "GreenOrigin", 20, 2);
      default:
        return undefined;
    }
  }
  public payBooking(
    booking: Booking | undefined,
    paymentMethod: string,
    cardNumber: string,
    cardExpiry: string,
    cardCVC: string
  ): Payment | undefined {
    if (booking && paymentMethod && cardNumber && cardExpiry && cardCVC) {
      const paymentGateway = new PaymentGateway();
      return paymentGateway.pay(booking.totalPrice, paymentMethod, cardNumber, cardExpiry, cardCVC);
    } else {
      return undefined;
    }
  }
  public confirmation(
    booking: Booking | undefined,
    payment: Payment | undefined,
    travelerEmail: string
  ): any {
    if (booking && payment && travelerEmail) {
      const emailSender = new EmailSender();
      const body = emailSender.getBody(booking, payment);
      return emailSender.sendEmail(travelerEmail, "Booking Confirmation", body);
    } else {
      return undefined;
    }
  }
  public notifyBooking(destination: Destination, passengers: number, payment: Payment): any {
    const providersApi = new OperatorsAPI(destination.operator);
    return providersApi.notifyBooking(destination, passengers, payment);
  }
  public save(booking: Booking | undefined): number {
    if (booking) {
      return Math.random();
    } else {
      return 0;
    }
  }
  public checkAvailability(
    destination: Destination,
    startDate: Date,
    endDate: Date,
    passengers: number
  ): boolean {
    const providersApi = new OperatorsAPI(destination.operator);
    const availability = providersApi.checkAvailability(
      destination.destination,
      startDate,
      endDate,
      passengers
    );
    return availability;
  }
  public getTraveler(traveler: string): Traveler {
    return new Traveler(traveler, false);
  }
}
