/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-nested-callbacks */
/* eslint-disable max-lines */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-lines-per-function */
import { Bookings } from "./bookings";

/*
 * As a **client**
 * I want to **select destination and dates**
 * So that **I can go to where and when I want**
 */

describe("bookings", () => {
  let bookings: Bookings;
  beforeEach(() => {
    bookings = new Bookings();
  });
  it("should be able to select destination and dates", async () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const client = "Charles Tito";
    const booking = await bookings.addBooking(destination, startDate, endDate, client);
    expect(booking).toBeDefined();
  });
  it("should check for empty values", async () => {
    const destination = "";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const client = "";
    const booking = await bookings.addBooking(destination, startDate, endDate, client);
    expect(booking).toBeUndefined();
  });
  it("should check for valid date values", async () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 28);
    const endDate = new Date(2022, 2, 22);
    const client = "Charles Tito";
    const booking = await bookings.addBooking(destination, startDate, endDate, client);
    expect(booking).toBeUndefined();
  });
  it("should allow buy 4 seats", async () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const client = "Charles Tito";
    const seats = 4;
    const booking = await bookings.addBooking(destination, startDate, endDate, client, seats);
    expect(booking).toBeDefined();
  });
  it("should disallow buy 5 seats for non VIP", async () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const client = "Charles Tito";
    const seats = 5;
    const booking = await bookings.addBooking(destination, startDate, endDate, client, seats);
    expect(booking).toBeUndefined();
  });
  it("should allow buy 5 seats if client is vip", async () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const client = "Charles Tito";
    const seats = 5;
    jest.spyOn(bookings, "getClient").mockImplementation(async () => ({ client, isVIP: true }));
    const booking = await bookings.addBooking(destination, startDate, endDate, client, seats);
    expect(booking).toBeDefined();
  });
  it("should disallow buy 7 seats even if client is vip", async () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const client = "Charles Tito";
    const seats = 7;
    jest.spyOn(bookings, "getClient").mockImplementation(async () => ({ client, isVIP: true }));
    const booking = await bookings.addBooking(destination, startDate, endDate, client, seats);
    expect(booking).toBeUndefined();
  });
  it("should ask the provider for seats availability", async () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const client = "Charles Tito";
    const seats = 5;
    jest.spyOn(bookings, "checkAvailability").mockImplementation(async () => false);
    const booking = await bookings.addBooking(destination, startDate, endDate, client, seats);
    expect(booking).toBeUndefined();
    jest.resetAllMocks();
  });
  it("should be able to pay my booking", async () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const client = "Charles Tito";
    const booking = await bookings.addBooking(destination, startDate, endDate, client);
    const paymentMethod = "Credit Card";
    const cardNumber = "1234567890123456";
    const cardExpiry = "12/22";
    const cardCVC = "123";
    const payment = await bookings.payBooking(
      booking,
      paymentMethod,
      cardNumber,
      cardExpiry,
      cardCVC
    );
    expect(payment).toBeDefined();
  });
  it("should not allow incomplete payment data", async () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const client = "Charles Tito";
    const booking = await bookings.addBooking(destination, startDate, endDate, client);
    const paymentMethod = "";
    const cardNumber = "";
    const cardExpiry = "";
    const cardCVC = "";
    const payment = await bookings.payBooking(
      booking,
      paymentMethod,
      cardNumber,
      cardExpiry,
      cardCVC
    );
    expect(payment).toBeUndefined();
  });
  it("should send an email with booking and payment confirmation data to traveller", async () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const client = "Charles Tito";
    const booking = await bookings.addBooking(destination, startDate, endDate, client);
    const paymentMethod = "Credit Card";
    const cardNumber = "1234567890123456";
    const cardExpiry = "12/22";
    const cardCVC = "123";
    const payment = await bookings.payBooking(
      booking,
      paymentMethod,
      cardNumber,
      cardExpiry,
      cardCVC
    );
    const clientEmail = "charles.tito@inspiration.com";
    const confirmation = await bookings.confirmation(booking, payment, clientEmail);
    expect(confirmation).toBeDefined();
  });
  it("should not allow incomplete confirmation data", async () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const client = "Charles Tito";
    const booking = await bookings.addBooking(destination, startDate, endDate, client);
    const paymentMethod = "";
    const cardNumber = "";
    const cardExpiry = "";
    const cardCVC = "";
    const payment = await bookings.payBooking(
      booking,
      paymentMethod,
      cardNumber,
      cardExpiry,
      cardCVC
    );
    const confirmation = await bookings.confirmation(booking, payment, "");
    expect(confirmation).toBeUndefined();
  });
  it("should notify payed bookings to provider", async () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const client = "Charles Tito";
    const booking = await bookings.addBooking(destination, startDate, endDate, client);
    const paymentMethod = "Credit Card";
    const cardNumber = "1234567890123456";
    const cardExpiry = "12/22";
    const cardCVC = "123";
    const payment = await bookings.payBooking(
      booking,
      paymentMethod,
      cardNumber,
      cardExpiry,
      cardCVC
    );
    let notification;
    if (payment) {
      notification = await bookings.notifyBooking(bookings.destination, 1, payment);
    }
    expect(notification).toBeDefined();
  });
  it("should not allow incomplete notification to provider", async () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const client = "Charles Tito";
    const booking = await bookings.addBooking(destination, startDate, endDate, client);
    const paymentMethod = "";
    const cardNumber = "";
    const cardExpiry = "";
    const cardCVC = "";
    const payment = await bookings.payBooking(
      booking,
      paymentMethod,
      cardNumber,
      cardExpiry,
      cardCVC
    );
    let notification;
    if (payment) {
      notification = await bookings.notifyBooking(bookings.destination, 1, payment);
    }
    expect(notification).toBeUndefined();
  });
  it("should save the booking for our own records", async () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const client = "Charles Tito";
    const booking = await bookings.addBooking(destination, startDate, endDate, client);
    const paymentMethod = "Credit Card";
    const cardNumber = "1234567890123456";
    const cardExpiry = "12/22";
    const cardCVC = "123";
    const payment = await bookings.payBooking(
      booking,
      paymentMethod,
      cardNumber,
      cardExpiry,
      cardCVC
    );
    const savedBookingId = await bookings.save(booking, payment);
    expect(savedBookingId).toBeGreaterThan(0);
  });
  it("should get the booking price from our database", async () => {
    const destination = "The Moon";
    const destinationPrice = await bookings.getDestination(destination);
    expect(destinationPrice).toBeDefined();
  });
  it("should calculate the total trip price", async () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const client = "Charles Tito";
    const seats = 4;
    const booking = await bookings.addBooking(destination, startDate, endDate, client, seats);
    expect(booking && booking.totalPrice).toBe(4 * (100 + 6 * 10));
  });

  // To Do: check data types for booking and payment
});
