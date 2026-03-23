export const WATCHLIST_STOCKS = [
  { symbol: 'NVDA', name: 'NVIDIA CORP.', price: '875.24', change: '+4.28%', isGain: true },
  { symbol: 'AAPL', name: 'APPLE INC.', price: '172.45', change: '-0.12%', isGain: false },
  { symbol: 'TSLA', name: 'TESLA INC.', price: '168.30', change: '+1.45%', isGain: true },
  { symbol: 'BTC/USD', name: 'BITCOIN', price: '64,280.00', change: '+2.10%', isGain: true },
  { symbol: 'ETH/USD', name: 'ETHEREUM', price: '3,450.12', change: '-1.05%', isGain: false },
];

export const STOCK_DETAILS = {
  'NVDA': {
    price: '875.24',
    change: '+4.28%',
    isGain: true,
    bids: [
      { price: '875.22', size: '42.10', depth: 80 },
      { price: '875.20', size: '15.05', depth: 60 },
      { price: '875.18', size: '28.42', depth: 40 },
      { price: '875.15', size: '112.90', depth: 100 },
    ],
    asks: [
      { price: '875.25', size: '5.20', depth: 20 },
      { price: '875.28', size: '32.14', depth: 50 },
      { price: '875.30', size: '12.00', depth: 30 },
      { price: '875.35', size: '185.32', depth: 100 },
    ],
  },
  'AAPL': {
    price: '172.45',
    change: '-0.12%',
    isGain: false,
    bids: [
      { price: '172.42', size: '150.00', depth: 70 },
      { price: '172.40', size: '85.20', depth: 50 },
      { price: '172.38', size: '310.45', depth: 100 },
    ],
    asks: [
      { price: '172.48', size: '45.10', depth: 30 },
      { price: '172.50', size: '120.50', depth: 80 },
      { price: '172.55', size: '65.20', depth: 45 },
    ],
  },
  'TSLA': {
    price: '168.30',
    change: '+1.45%',
    isGain: true,
    bids: [
      { price: '168.25', size: '12.40', depth: 40 },
      { price: '168.20', size: '55.30', depth: 90 },
    ],
    asks: [
      { price: '168.35', size: '8.10', depth: 20 },
      { price: '168.40', size: '42.60', depth: 60 },
    ],
  },
  'BTC/USD': {
    price: '64,280.00',
    change: '+2.10%',
    isGain: true,
    bids: [
      { price: '64,275.50', size: '0.42', depth: 85 },
      { price: '64,270.00', size: '1.25', depth: 100 },
    ],
    asks: [
      { price: '64,285.20', size: '0.15', depth: 30 },
      { price: '64,290.00', size: '2.50', depth: 100 },
    ],
  },
  'ETH/USD': {
    price: '3,450.12',
    change: '-1.05%',
    isGain: false,
    bids: [
      { price: '3,448.50', size: '12.50', depth: 60 },
      { price: '3,445.00', size: '45.20', depth: 100 },
    ],
    asks: [
      { price: '3,452.12', size: '5.40', depth: 25 },
      { price: '3,455.00', size: '18.90', depth: 80 },
    ],
  }
};

export const CHART_DATA = {
  '1H': {
    labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
    yAxis: ['885.60', '880.60', '875.60', '870.60', '865.60', '860.60']
  },
  '4H': {
    labels: ['08:00', '12:00', '16:00', '20:00', '00:00', '04:00'],
    yAxis: ['890.00', '880.00', '870.00', '860.00', '850.00', '840.00']
  },
  '1D': {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    yAxis: ['900.00', '880.00', '860.00', '840.00', '820.00', '800.00']
  },
  '1W': {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    yAxis: ['1000.00', '900.00', '800.00', '700.00', '600.00', '500.00']
  }
};


