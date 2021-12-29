export type Booking = {
  bookingId?: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  traveler: string;
  passengers: number;
  totalPrice: number;
};
