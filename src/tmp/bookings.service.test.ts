/* eslint-disable max-statements */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-nested-callbacks */
/* eslint-disable max-lines */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-lines-per-function */
import { Booking } from "./booking";
import { BookingsRepository } from "./bookings.repository";
import { BookingsService } from "./bookings.service";
import { CreditCard } from "./credit_card";
import { DateRange } from "./date_range";
import { Destination } from "./destination";
import { Payment } from "./payment";

describe("bookings Service", () => {
  let bookingsService: BookingsService;

  beforeEach(() => {
    bookingsService = new BookingsService();
  });

  it("should be able to select destination and dates", () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const travelDates = new DateRange(startDate, endDate);
    const traveler = "Charles Tito";
    const booking = bookingsService.create(destination, travelDates, traveler);
    expect(booking).toBeDefined();
  });
  it("should check for empty values", () => {
    const destination = "";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const travelDates = new DateRange(startDate, endDate);
    const traveler = "";
    const booking = bookingsService.create(destination, travelDates, traveler);
    expect(booking).toBeUndefined();
  });
  it("should check for valid date values", () => {
    const startDate = new Date(2022, 2, 28);
    const endDate = new Date(2022, 2, 22);
    expect(() => {
      new DateRange(startDate, endDate);
    }).toThrow("Invalid date range");
  });
  it("should allow to buy tickets for 4 passengers", () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const travelDates = new DateRange(startDate, endDate);
    const traveler = "Charles Tito";
    const passengers = 4;
    const booking = bookingsService.create(destination, travelDates, traveler, passengers);
    expect(booking).toBeDefined();
  });
  it("should disallow to buy tickets for 5 passengers for non VIP", () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const travelDates = new DateRange(startDate, endDate);
    const traveler = "Charles Tito";
    const passengers = 5;
    const booking = bookingsService.create(destination, travelDates, traveler, passengers);
    expect(booking).toBeUndefined();
  });
  it("should allow to buy tickets for 5 passengers if the traveler is VIP", () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const travelDates = new DateRange(startDate, endDate);
    const traveler = "Charles Tito";
    const passengers = 5;
    jest.spyOn(bookingsService, "getTraveler").mockImplementation(() => ({ id: traveler, isVIP: true }));
    const booking = bookingsService.create(destination, travelDates, traveler, passengers);
    expect(booking).toBeDefined();
  });
  it("should disallow to buy tickets for 7 passengers even if the traveler is VIP", () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const travelDates = new DateRange(startDate, endDate);
    const traveler = "Charles Tito";
    const passengers = 7;
    jest.spyOn(bookingsService, "getTraveler").mockImplementation(() => ({ id: traveler, isVIP: true }));
    const booking = bookingsService.create(destination, travelDates, traveler, passengers);
    expect(booking).toBeUndefined();
  });
  it("should ask the operator for passengers availability", () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const travelDates = new DateRange(startDate, endDate);
    const traveler = "Charles Tito";
    const passengers = 5;
    jest.spyOn(bookingsService, "hasAvailability").mockImplementation(() => false);
    const booking = bookingsService.create(destination, travelDates, traveler, passengers);
    expect(booking).toBeUndefined();
    jest.resetAllMocks();
  });
  it("should save the booking for the agency own records", () => {
    const booking = getInputBookingForTest();
    const savedBookingId = new BookingsRepository().save(booking);
    expect(savedBookingId).toBeGreaterThan(0);
  });
  it("should allow the traveler to pay its booking", () => {
    const booking = getInputBookingForTest();
    const paymentMethod = "Credit Card";
    const cardNumber = "1234567890123456";
    const cardExpiry = "12/22";
    const cardCVC = "123";
    const creditCard = new CreditCard(cardNumber, cardExpiry, cardCVC);
    const payment = bookingsService.pay(booking, paymentMethod, creditCard);
    expect(payment).toBeDefined();
  });
  it("should not allow incomplete payment data", () => {
    const cardNumber = "";
    const cardExpiry = "";
    const cardCVC = "";
    expect(() => {
      new CreditCard(cardNumber, cardExpiry, cardCVC);
    }).toThrow(/Wrong/);
  });
  it("should send an email with booking and payment confirmation data to the traveler", () => {
    const booking = getInputBookingForTest();
    const payment = getInputPaymentForTest(booking);
    const travelerEmail = "charles.tito@inspiration.com";
    const confirmation = bookingsService.notifyConfirmationToTraveler(booking, payment, travelerEmail);
    expect(confirmation).toBeDefined();
  });
  it("should not allow incomplete confirmation data", () => {
    const booking = getInputBookingForTest();
    const payment = getInputPaymentForTest(booking);
    const confirmation = bookingsService.notifyConfirmationToTraveler(booking, payment, "");
    expect(confirmation).toBeUndefined();
  });
  it("should notify paid bookings to the operator", () => {
    const booking = getInputBookingForTest();
    const payment = getInputPaymentForTest(booking);
    const bookingsDestination = new Destination("destination", "", 0, 0);
    const notification = bookingsService.notifyBookingToOperator(bookingsDestination, 1, payment);
    expect(notification).toBeDefined();
  });

  it("should get the booking price from the agency database", () => {
    const destination = "The Moon";
    const destinationPrice = bookingsService.getDestination(destination);
    expect(destinationPrice).toBeDefined();
  });
  it("should calculate the total trip price", () => {
    const destination = "The Moon";
    const startDate = new Date(2022, 2, 22);
    const endDate = new Date(2022, 2, 28);
    const travelDates = new DateRange(startDate, endDate);
    const traveler = "Charles Tito";
    const passengers = 4;
    const booking = bookingsService.create(destination, travelDates, traveler, passengers);
    expect(booking && booking.totalPrice).toBe(4 * (100 + 6 * 10));
  });
});

function getInputPaymentForTest(booking: Booking) {
  const cardNumber = "1234567890123456";
  const cardExpiry = "12/22";
  const cardCVC = "123";
  const creditCard = new CreditCard(cardNumber, cardExpiry, cardCVC);
  const payment = new Payment(booking.id, creditCard, 100, new Date());
  return payment;
}
function getInputBookingForTest() {
  const destination = "The Moon";
  const startDate = new Date(2022, 2, 22);
  const endDate = new Date(2022, 2, 28);
  const travelDates = new DateRange(startDate, endDate);
  const traveler = "Charles Tito";
  const passengers = 1;
  const totalPrice = 100;
  const booking = new Booking(destination, travelDates, traveler, passengers, totalPrice);
  booking.id = "1";
  return booking;
}
