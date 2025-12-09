import type { Payment } from "@/types";

// Mock payment data for demonstration
export const mockPayments: Payment[] = [
  {
    id: "1",
    orderId: "ORD-2024-001",
    customerName: "Ahmad Rizki",
    customerPhone: "081234567890",
    customerEmail: "ahmad@example.com",
    amount: 50000,
    status: "success",
    paymentMethod: "qris",
    paymentProvider: "QRIS",
    voucherCode: "VOUCHER-001",
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    paidAt: new Date(Date.now() - 1000 * 60 * 25),
  },
  {
    id: "2",
    orderId: "ORD-2024-002",
    customerName: "Siti Nurhaliza",
    customerPhone: "082345678901",
    amount: 100000,
    status: "pending",
    paymentMethod: "bank_transfer",
    paymentProvider: "BCA",
    voucherCode: "VOUCHER-002",
    createdAt: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    expiresAt: new Date(Date.now() + 1000 * 60 * 45), // 45 minutes from now
  },
  {
    id: "3",
    orderId: "ORD-2024-003",
    customerName: "Budi Santoso",
    customerPhone: "083456789012",
    customerEmail: "budi@example.com",
    amount: 75000,
    status: "success",
    paymentMethod: "e_wallet",
    paymentProvider: "GoPay",
    voucherCode: "VOUCHER-003",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    paidAt: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 5),
  },
  {
    id: "4",
    orderId: "ORD-2024-004",
    customerName: "Dewi Lestari",
    customerPhone: "084567890123",
    amount: 150000,
    status: "failed",
    paymentMethod: "credit_card",
    paymentProvider: "Visa",
    voucherCode: "VOUCHER-004",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
  },
  {
    id: "5",
    orderId: "ORD-2024-005",
    customerName: "Eko Prasetyo",
    customerPhone: "085678901234",
    amount: 50000,
    status: "expired",
    paymentMethod: "qris",
    voucherCode: "VOUCHER-005",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    expiresAt: new Date(Date.now() - 1000 * 60 * 60 * 23),
  },
  {
    id: "6",
    orderId: "ORD-2024-006",
    customerName: "Fitri Handayani",
    customerPhone: "086789012345",
    customerEmail: "fitri@example.com",
    amount: 200000,
    status: "success",
    paymentMethod: "bank_transfer",
    paymentProvider: "Mandiri",
    voucherCode: "VOUCHER-006",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    paidAt: new Date(Date.now() - 1000 * 60 * 60 * 11),
  },
  {
    id: "7",
    orderId: "ORD-2024-007",
    customerName: "Gunawan Wijaya",
    customerPhone: "087890123456",
    amount: 50000,
    status: "success",
    paymentMethod: "e_wallet",
    paymentProvider: "OVO",
    voucherCode: "VOUCHER-007",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    paidAt: new Date(Date.now() - 1000 * 60 * 60 * 6 + 1000 * 60 * 2),
  },
  {
    id: "8",
    orderId: "ORD-2024-008",
    customerName: "Hani Kusuma",
    customerPhone: "088901234567",
    amount: 100000,
    status: "pending",
    paymentMethod: "qris",
    voucherCode: "VOUCHER-008",
    createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    expiresAt: new Date(Date.now() + 1000 * 60 * 55),
  },
];

export const mockStats = {
  totalRevenue: mockPayments
    .filter((p) => p.status === "success")
    .reduce((sum, p) => sum + p.amount, 0),
  totalTransactions: mockPayments.length,
  successRate:
    (mockPayments.filter((p) => p.status === "success").length /
      mockPayments.length) *
    100,
  pendingAmount: mockPayments
    .filter((p) => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0),
};
