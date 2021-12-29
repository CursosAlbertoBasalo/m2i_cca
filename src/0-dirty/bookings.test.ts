/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-nested-callbacks */
/* eslint-disable max-lines */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-lines-per-function */
import { Bookings } from "./bookings";

describe("bookings", () => {
  let bookings: Bookings;

  beforeEach(() => {
    bookings = new Bookings();
  });

  it("should be able to select destination and dates", async () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const traveler = "Charles Tito";
    const booking = await bookings.addBooking(destination, startDate, endDate, traveler);
    expect(booking).toBeDefined();
  });
  it("should check for empty values", async () => {
    const destination = "";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const traveler = "";
    const booking = await bookings.addBooking(destination, startDate, endDate, traveler);
    expect(booking).toBeUndefined();
  });
  it("should check for valid date values", async () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 28);
    const endDate = new Date(2022, 2, 22);
    const traveler = "Charles Tito";
    const booking = await bookings.addBooking(destination, startDate, endDate, traveler);
    expect(booking).toBeUndefined();
  });
  it("should allow buy tickets for 4 passengers", async () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const traveler = "Charles Tito";
    const passengers = 4;
    const booking = await bookings.addBooking(
      destination,
      startDate,
      endDate,
      traveler,
      passengers
    );
    expect(booking).toBeDefined();
  });
  it("should disallow to buy tickets for 5 passengers for non VIP", async () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const traveler = "Charles Tito";
    const passengers = 5;
    const booking = await bookings.addBooking(
      destination,
      startDate,
      endDate,
      traveler,
      passengers
    );
    expect(booking).toBeUndefined();
  });
  it("should allow buy tickets for 5 passengers if traveler is vip", async () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const traveler = "Charles Tito";
    const passengers = 5;
    jest.spyOn(bookings, "getTraveler").mockImplementation(async () => ({ traveler, isVIP: true }));
    const booking = await bookings.addBooking(
      destination,
      startDate,
      endDate,
      traveler,
      passengers
    );
    expect(booking).toBeDefined();
  });
  it("should disallow buy tickets for 7 passengers even if traveler is vip", async () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const traveler = "Charles Tito";
    const passengers = 7;
    jest.spyOn(bookings, "getTraveler").mockImplementation(async () => ({ traveler, isVIP: true }));
    const booking = await bookings.addBooking(
      destination,
      startDate,
      endDate,
      traveler,
      passengers
    );
    expect(booking).toBeUndefined();
  });
  it("should ask the operator for passengers availability", async () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const traveler = "Charles Tito";
    const passengers = 5;
    jest.spyOn(bookings, "checkAvailability").mockImplementation(async () => false);
    const booking = await bookings.addBooking(
      destination,
      startDate,
      endDate,
      traveler,
      passengers
    );
    expect(booking).toBeUndefined();
    jest.resetAllMocks();
  });
  it("should be able to pay my booking", async () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const traveler = "Charles Tito";
    const booking = await bookings.addBooking(destination, startDate, endDate, traveler);
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
    const traveler = "Charles Tito";
    const booking = await bookings.addBooking(destination, startDate, endDate, traveler);
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
  it("should send an email with booking and payment confirmation data to traveler", async () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const traveler = "Charles Tito";
    const booking = await bookings.addBooking(destination, startDate, endDate, traveler);
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
    const travelerEmail = "charles.tito@inspiration.com";
    const confirmation = await bookings.confirmation(booking, payment, travelerEmail);
    expect(confirmation).toBeDefined();
  });
  it("should not allow incomplete confirmation data", async () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const traveler = "Charles Tito";
    const booking = await bookings.addBooking(destination, startDate, endDate, traveler);
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
  it("should notify payed bookings to operator", async () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const traveler = "Charles Tito";
    const booking = await bookings.addBooking(destination, startDate, endDate, traveler);
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
  it("should not allow incomplete notification to operator", async () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const traveler = "Charles Tito";
    const booking = await bookings.addBooking(destination, startDate, endDate, traveler);
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
  it("should save the booking for agency own records", async () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const traveler = "Charles Tito";
    const booking = await bookings.addBooking(destination, startDate, endDate, traveler);
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
    const traveler = "Charles Tito";
    const passengers = 4;
    const booking = await bookings.addBooking(
      destination,
      startDate,
      endDate,
      traveler,
      passengers
    );
    expect(booking && booking.totalPrice).toBe(4 * (100 + 6 * 10));
  });

  // To Do: check data types for booking and payment
});
