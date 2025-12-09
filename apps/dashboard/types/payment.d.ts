export interface Payment {
  id: string;
  orderId: string;
  customerName: string;
  customerEmail?: string;
  customerPhone: string;
  amount: number;
  status: "pending" | "success" | "failed" | "expired";
  paymentMethod: "qris" | "bank_transfer" | "e_wallet" | "credit_card";
  paymentProvider?: string;
  voucherCode?: string;
  createdAt: Date;
  paidAt?: Date;
  expiresAt?: Date;
}

export interface PaymentStats {
  totalRevenue: number;
  totalTransactions: number;
  successRate: number;
  pendingAmount: number;
}
