/* eslint-disable max-statements */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-nested-callbacks */
/* eslint-disable max-lines */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-lines-per-function */
import { Booking } from "./booking";
import { BookingsService } from "./bookings.service";
import { Destination } from "./destination";
import { Payment } from "./payment";

describe("bookings Service", () => {
  let bookings: BookingsService;

  beforeEach(() => {
    bookings = new BookingsService();
  });

  it("should be able to select destination and dates", () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const traveler = "Charles Tito";
    const booking = bookings.create(destination, startDate, endDate, traveler);
    expect(booking).toBeDefined();
  });
  it("should check for empty values", () => {
    const destination = "";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const traveler = "";
    const booking = bookings.create(destination, startDate, endDate, traveler);
    expect(booking).toBeUndefined();
  });
  it("should check for valid date values", () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 28);
    const endDate = new Date(2022, 2, 22);
    const traveler = "Charles Tito";
    const booking = bookings.create(destination, startDate, endDate, traveler);
    expect(booking).toBeUndefined();
  });
  it("should allow to buy tickets for 4 passengers", () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const traveler = "Charles Tito";
    const passengers = 4;
    const booking = bookings.create(destination, startDate, endDate, traveler, passengers);
    expect(booking).toBeDefined();
  });
  it("should disallow to buy tickets for 5 passengers for non VIP", () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const traveler = "Charles Tito";
    const passengers = 5;
    const booking = bookings.create(destination, startDate, endDate, traveler, passengers);
    expect(booking).toBeUndefined();
  });
  it("should allow to buy tickets for 5 passengers if the traveler is VIP", () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const traveler = "Charles Tito";
    const passengers = 5;
    jest.spyOn(bookings, "getTraveler").mockImplementation(() => ({ id: traveler, IsVIP: true }));
    const booking = bookings.create(destination, startDate, endDate, traveler, passengers);
    expect(booking).toBeDefined();
  });
  it("should disallow to buy tickets for 7 passengers even if the traveler is VIP", () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const traveler = "Charles Tito";
    const passengers = 7;
    jest.spyOn(bookings, "getTraveler").mockImplementation(() => ({ id: traveler, IsVIP: true }));
    const booking = bookings.create(destination, startDate, endDate, traveler, passengers);
    expect(booking).toBeUndefined();
  });
  it("should ask the operator for passengers availability", () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const traveler = "Charles Tito";
    const passengers = 5;
    jest.spyOn(bookings, "checkAvailability").mockImplementation(() => false);
    const booking = bookings.create(destination, startDate, endDate, traveler, passengers);
    expect(booking).toBeUndefined();
    jest.resetAllMocks();
  });
  it("should save the booking for the agency own records", () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const traveler = "Charles Tito";
    const booking = bookings.create(destination, startDate, endDate, traveler);
    const savedBookingId = bookings.save(booking);
    expect(savedBookingId).toBeGreaterThan(0);
  });
  it("should allow the traveler to pay its booking", () => {
    const booking = getInputBookingForTest();
    const paymentMethod = "Credit Card";
    const cardNumber = "1234567890123456";
    const cardExpiry = "12/22";
    const cardCVC = "123";
    const payment = bookings.pay(booking, paymentMethod, cardNumber, cardExpiry, cardCVC);
    expect(payment).toBeDefined();
  });
  it("should not allow incomplete payment data", () => {
    const booking = getInputBookingForTest();
    const paymentMethod = "";
    const cardNumber = "";
    const cardExpiry = "";
    const cardCVC = "";
    const payment = bookings.pay(booking, paymentMethod, cardNumber, cardExpiry, cardCVC);
    expect(payment).toBeUndefined();
  });
  it("should send an email with booking and payment confirmation data to the traveler", () => {
    const booking = getInputBookingForTest();
    const payment = getInputPaymentForTest(booking);
    const travelerEmail = "charles.tito@inspiration.com";
    const confirmation = bookings.notifyConfirmationToTraveller(booking, payment, travelerEmail);
    expect(confirmation).toBeDefined();
  });
  it("should not allow incomplete confirmation data", () => {
    const booking = getInputBookingForTest();
    const payment = getInputPaymentForTest(booking);
    const confirmation = bookings.notifyConfirmationToTraveller(booking, payment, "");
    expect(confirmation).toBeUndefined();
  });
  it("should notify paid bookings to the operator", () => {
    const booking = getInputBookingForTest();
    const payment = getInputPaymentForTest(booking);
    const bookingsDestination = new Destination("destination", "", 0, 0);
    const notification = bookings.notifyBookingToOperator(bookingsDestination, 1, payment);
    expect(notification).toBeDefined();
  });

  it("should get the booking price from the agency database", () => {
    const destination = "The Moon";
    const destinationPrice = bookings.getDestination(destination);
    expect(destinationPrice).toBeDefined();
  });
  it("should calculate the total trip price", () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const traveler = "Charles Tito";
    const passengers = 4;
    const booking = bookings.create(destination, startDate, endDate, traveler, passengers);
    expect(booking && booking.totalPrice).toBe(4 * (100 + 6 * 10));
  });
});

function getInputPaymentForTest(booking: Booking) {
  const cardNumber = "1234567890123456";
  const cardExpiry = "12/22";
  const cardCVC = "123";
  const payment = new Payment(booking.id, cardNumber, cardExpiry, cardCVC, 100, new Date());
  return payment;
}
function getInputBookingForTest() {
  const destination = "The Moon";
  const startDate = new Date(2022, 2, 22);
  const endDate = new Date(2022, 2, 28);
  const traveler = "Charles Tito";
  const passengers = 1;
  const totalPrice = 100;
  const booking = new Booking(destination, startDate, endDate, traveler, passengers, totalPrice);
  booking.id = "1";
  return booking;
}
