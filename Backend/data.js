/**
 * Sample Data for DeepPulse Backend
 * Based on Schema defined in ARCHITECTURE.md
 */

export const USERS = [
  {
    _id: "user_65f1a2b3c4d5e6f7a8b9c0d1",
    email: "demo.trader@deeppulse.com",
    passwordHash: "$2b$12$LQv3c1V.Kz.XfV1u2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x", // Mock bcrypt hash
    name: "Demo Trader",
    wallet: {
      cashBalance: 250000.00,
      usedMargin: 12500.50
    },
    settings: {
      darkMode: true,
      defaultProduct: 'CNC'
    },
    createdAt: new Date("2024-01-15T08:30:00Z")
  },
  {
    _id: "user_65f1a2b3c4d5e6f7a8b9c0d2",
    email: "premium.user@deeppulse.com",
    passwordHash: "$2b$12$Z0y1x2w3v4u5t6s7r8q9p0o1n2m3l4k5j6i7h8g9f0e1d2c3b4a5", // Mock bcrypt hash
    name: "Premium User",
    wallet: {
      cashBalance: 1000000.00,
      usedMargin: 0
    },
    settings: {
      darkMode: false,
      defaultProduct: 'MIS'
    },
    createdAt: new Date("2024-02-01T12:00:00Z")
  }
];

export const ORDERS = [
  {
    _id: "order_65f2a1b2c3d4e5f6g7h8i9j0",
    userId: "user_65f1a2b3c4d5e6f7a8b9c0d1",
    instrumentToken: "NVDA",
    transactionType: "BUY",
    productType: "CNC",
    orderType: "LIMIT",
    quantity: 15,
    price: 850.25,
    status: "EXECUTED",
    averageExecutionPrice: 850.25,
    timestamps: {
      placedAt: new Date("2024-03-20T14:20:00Z"),
      executedAt: new Date("2024-03-20T14:20:02Z")
    }
  },
  {
    _id: "order_65f2a1b2c3d4e5f6g7h8i9j1",
    userId: "user_65f1a2b3c4d5e6f7a8b9c0d1",
    instrumentToken: "AAPL",
    transactionType: "BUY",
    productType: "CNC",
    orderType: "MARKET",
    quantity: 50,
    price: 172.50,
    status: "EXECUTED",
    averageExecutionPrice: 172.48,
    timestamps: {
      placedAt: new Date("2024-03-21T09:45:00Z"),
      executedAt: new Date("2024-03-21T09:45:01Z")
    }
  },
  {
    _id: "order_65f2a1b2c3d4e5f6g7h8i9j2",
    userId: "user_65f1a2b3c4d5e6f7a8b9c0d1",
    instrumentToken: "TSLA",
    transactionType: "SELL",
    productType: "MIS",
    orderType: "LIMIT",
    quantity: 10,
    price: 175.00,
    status: "PENDING",
    triggerPrice: 174.50,
    timestamps: {
      placedAt: new Date("2024-03-24T18:00:00Z")
    }
  },
  {
    _id: "order_65f2a1b2c3d4e5f6g7h8i9j3",
    userId: "user_65f1a2b3c4d5e6f7a8b9c0d2",
    instrumentToken: "BTC/USD",
    transactionType: "BUY",
    productType: "CNC",
    orderType: "LIMIT",
    quantity: 0.5,
    price: 62000.00,
    status: "REJECTED",
    rejectionReason: "Insufficient Funds",
    timestamps: {
      placedAt: new Date("2024-03-22T11:30:00Z")
    }
  }
];

export const HOLDINGS = [
  {
    _id: "holding_65f3a1b2c3d4e5f6g7h8i9j0",
    userId: "user_65f1a2b3c4d5e6f7a8b9c0d1",
    instrumentToken: "NVDA",
    quantity: 15,
    averageCost: 850.25,
    lastUpdatedAt: new Date("2024-03-20T14:20:02Z")
  },
  {
    _id: "holding_65f3a1b2c3d4e5f6g7h8i9j1",
    userId: "user_65f1a2b3c4d5e6f7a8b9c0d1",
    instrumentToken: "AAPL",
    quantity: 50,
    averageCost: 172.48,
    lastUpdatedAt: new Date("2024-03-21T09:45:01Z")
  }
];

export const TRANSACTIONS = [
  {
    _id: "tx_65f4a1b2c3d4e5f6g7h8i9j0",
    userId: "user_65f1a2b3c4d5e6f7a8b9c0d1",
    amount: 500000.00,
    type: "PAYIN",
    referenceId: "PAY-123456789",
    balanceAfter: 500000.00,
    timestamp: new Date("2024-01-15T09:00:00Z")
  },
  {
    _id: "tx_65f4a1b2c3d4e5f6g7h8i9j1",
    userId: "user_65f1a2b3c4d5e6f7a8b9c0d1",
    amount: -12753.75, // (850.25 * 15)
    type: "TRADE_SETTLEMENT",
    referenceId: "order_65f2a1b2c3d4e5f6g7h8i9j0",
    balanceAfter: 487246.25,
    timestamp: new Date("2024-03-20T14:20:02Z")
  },
  {
    _id: "tx_65f4a1b2c3d4e5f6g7h8i9j2",
    userId: "user_65f1a2b3c4d5e6f7a8b9c0d1",
    amount: -8624.00, // (172.48 * 50)
    type: "TRADE_SETTLEMENT",
    referenceId: "order_65f2a1b2c3d4e5f6g7h8i9j1",
    balanceAfter: 478622.25,
    timestamp: new Date("2024-03-21T09:45:01Z")
  },
  {
    _id: "tx_65f4a1b2c3d4e5f6g7h8i9j3",
    userId: "user_65f1a2b3c4d5e6f7a8b9c0d2",
    amount: 1000000.00,
    type: "PAYIN",
    referenceId: "PAY-987654321",
    balanceAfter: 1000000.00,
    timestamp: new Date("2024-02-01T12:05:00Z")
  }
];
