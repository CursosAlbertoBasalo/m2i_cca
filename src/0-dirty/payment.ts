export type Payment = {
  paymentId: string;
  cardNumber: string;
  cardExpiry: string;
  cardCVC: string;
  amount: number;
  date: Date;
};
