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
  public async addBooking(
    destination: string,
    startDate: Date,
    endDate: Date,
    travelerId: string,
    passengers = 1
  ): Promise<Booking | undefined> {
    if (destination.length > 0 && travelerId.length > 0) {
      if (startDate < endDate) {
        this.traveler = await this.getTraveler(travelerId);
        if (passengers <= 4 || (this.traveler.isVIP && passengers <= 6)) {
          this.destination = await this.getDestination(destination);
          if (this.destination) {
            if (await this.checkAvailability(this.destination, startDate, endDate, passengers)) {
              const stayingNights = Math.round(
                (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
              );
              const totalPrice =
                (this.destination.flightPrice +
                  this.destination.stayingNightPrice * stayingNights) *
                passengers;
              const booking = {
                destination,
                startDate,
                endDate,
                traveler: travelerId,
                passengers,
                totalPrice,
              };
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
  public async getDestination(destination: string): Promise<Destination | undefined> {
    switch (destination) {
      case "Mars":
        return { destination, operator: "SpaceY", flightPrice: 200, stayingNightPrice: 20 };
      case "The Moon":
        return { destination, operator: "SpaceY", flightPrice: 100, stayingNightPrice: 10 };
      case "ISS":
        return { destination, operator: "GreenOrigin", flightPrice: 50, stayingNightPrice: 5 };
      case "Orbit":
        return { destination, operator: "GreenOrigin", flightPrice: 20, stayingNightPrice: 2 };
      default:
        return undefined;
    }
  }
  public async payBooking(
    booking: Booking | undefined,
    paymentMethod: string,
    cardNumber: string,
    cardExpiry: string,
    cardCVC: string
  ): Promise<Payment | undefined> {
    if (booking && paymentMethod && cardNumber && cardExpiry && cardCVC) {
      const paymentGateway = new PaymentGateway();
      return paymentGateway.pay(
        booking.totalPrice,
        paymentMethod,
        cardNumber,
        cardExpiry,
        cardCVC,
        booking.bookingId
      );
    } else {
      return undefined;
    }
  }
  public async confirmation(
    booking: Booking | undefined,
    payment: Payment | undefined,
    travelerEmail: string
  ): Promise<any> {
    if (booking && payment && travelerEmail) {
      const emailSender = new EmailSender();
      const body = emailSender.getBody(booking, payment);
      return emailSender.sendEmail(travelerEmail, "Booking Confirmation", body);
    } else {
      return undefined;
    }
  }
  public async notifyBooking(
    destination: Destination | undefined,
    passengers: number,
    payment: Payment
  ): Promise<any> {
    if (destination && passengers && payment) {
      const providersApi = new OperatorsAPI(destination.operator);
      return providersApi.notifyBooking(destination, passengers, payment);
    } else {
      return undefined;
    }
  }
  public async save(booking: Booking | undefined): Promise<number> {
    if (booking) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(Math.random());
        }, 100);
      });
    } else {
      return 0;
    }
  }
  public async checkAvailability(
    destination: Destination,
    startDate: Date,
    endDate: Date,
    passengers: number
  ): Promise<boolean> {
    const providersApi = new OperatorsAPI(destination.operator);
    const availability = await providersApi.checkAvailability(
      destination.destination,
      startDate,
      endDate,
      passengers
    );
    return availability;
  }
  public async getTraveler(traveler: string): Promise<Traveler> {
    return { traveler, isVIP: false };
  }
}
