/* eslint-disable max-lines */
/* eslint-disable complexity */
/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-depth */
/* eslint-disable max-lines-per-function */

import { EmailSender } from "./emailSender";
import { PaymentGateway } from "./PaymentGateway";
import { ProvidersAPI } from "./providersApi";

export class Bookings {
  public client: any;
  public destination: any;
  public async addBooking(
    destination: string,
    startDate: Date,
    endDate: Date,
    clientId: string,
    seats = 1
  ): Promise<any> {
    if (destination.length > 0 && clientId.length > 0) {
      if (startDate < endDate) {
        this.client = await this.getClient(clientId);
        if (seats <= 4 || (this.client.isVIP && seats <= 6)) {
          this.destination = await this.getDestination(destination);
          if (this.destination) {
            if (await this.checkAvailability(this.destination, startDate, endDate, seats)) {
              const stayingNights = Math.round(
                (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
              );
              const totalPrice =
                (this.destination.flightPrice +
                  this.destination.stayingNightPrice * stayingNights) *
                seats;
              const booking = {
                destination,
                startDate,
                endDate,
                client: clientId,
                seats,
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
  public async getDestination(
    destination: string
  ): Promise<
    | { destination: string; provider: string; flightPrice: number; stayingNightPrice: number }
    | undefined
  > {
    switch (destination) {
      case "Mars":
        return { destination, provider: "SpaceY", flightPrice: 200, stayingNightPrice: 20 };
      case "The Moon":
        return { destination, provider: "SpaceY", flightPrice: 100, stayingNightPrice: 10 };
      case "ISS":
        return { destination, provider: "GreenOrigin", flightPrice: 50, stayingNightPrice: 5 };
      case "Orbit":
        return { destination, provider: "GreenOrigin", flightPrice: 20, stayingNightPrice: 2 };
      default:
        return undefined;
    }
  }
  public async payBooking(
    booking: any,
    paymentMethod: string,
    cardNumber: string,
    cardExpiry: string,
    cardCVC: string
  ): Promise<any> {
    if (booking && paymentMethod && cardNumber && cardExpiry && cardCVC) {
      const paymentGateway = new PaymentGateway();
      return paymentGateway.pay(booking.totalPrice, paymentMethod, cardNumber, cardExpiry, cardCVC);
    } else {
      return undefined;
    }
  }
  public async confirmation(booking: any, payment: any, clientEmail: string): Promise<any> {
    if (booking && payment && clientEmail) {
      const emailSender = new EmailSender();
      const body = emailSender.getBody(booking, payment);
      return emailSender.sendEmail(clientEmail, "Booking Confirmation", body);
    } else {
      return undefined;
    }
  }
  public async notifyBooking(destination: any, seats: number, payment: any): Promise<any> {
    if (destination && seats && payment) {
      const providersApi = new ProvidersAPI(destination.provider);
      return providersApi.notifyBooking(destination, seats, payment);
    } else {
      return undefined;
    }
  }
  public async save(booking: any, payment: any): Promise<number> {
    if (booking && payment) {
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
    destination: any,
    startDate: Date,
    endDate: Date,
    seats: number
  ): Promise<boolean> {
    const providersApi = new ProvidersAPI(destination.provider);
    const availability = await providersApi.checkAvailability(
      destination.destination,
      startDate,
      endDate,
      seats
    );
    return availability;
  }
  public async getClient(client: string): Promise<any> {
    return { client, isVIP: false };
  }
}
