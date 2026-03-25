# ARCHITECTURE_AND_ROADMAP.md for DeepPulse

## 1. Tech Stack & Dependencies

### Frontend (Current State)
- **Framework**: React 18+
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM
- **Icons**: Lucide React

### Backend (Future State Requirements)
- **Runtime**: Node.js
- **Framework**: Express.js - Fast, unopinionated, minimalist web framework for routing and middleware.
- **Database ORM**: Mongoose - Elegant MongoDB object modeling for Node.js.
- **Real-Time Communication**: ws (Native WebSockets) - For low-latency, bidirectional and event-based communication between the web clients and servers (Market Data).
- **Caching & Pub/Sub**: Redis - In-memory data structure store, used as a database, cache, and message broker. Essential for fast market data retrieval and WebSocket scaling.
- **Authentication**: 
  - JSONWebToken (JWT) - For secure, stateless authentication tokens.
  - bcrypt - For secure password hashing.

## 2. Frontend Architecture (Current State)

We strictly adhere to a **Smart Container / Dumb Component** architecture to ensure high reusability, testing predictability, and clear separation of concerns.

### Directory Structure
```
/src
├── App.css
├── App.jsx
├── index.css
├── main.jsx
├── /assets
├── /dashboard
│   ├── DiversityChart.jsx
│   ├── HoldingsLayout.jsx
│   ├── HoldingsTable.jsx
│   ├── PortfolioAnalysis.jsx
│   ├── PulseAnalysis.jsx
│   ├── RiskScore.jsx
│   └── SummaryCards.jsx
├── /landing-page
│   ├── About.jsx
│   ├── Hero.jsx
│   ├── LandingPage.jsx
│   ├── Navbar.jsx
│   ├── Pricing.jsx
│   └── Support.jsx
└── /terminal
    ├── /components
    │   ├── ChartArea.jsx
    │   ├── LeftNav.jsx
    │   ├── OrderBook.jsx
    │   ├── OrderModal.jsx
    │   ├── TerminalLayout.jsx
    │   ├── TopNav.jsx
    │   └── Watchlist.jsx
    └── data.js
```

### Component Inventory & Prop Interfaces

**Landing Page Components**
- `LandingPage.jsx`: Main container for the landing page.
- `Navbar.jsx`: Top navigation for the marketing site.
- `Hero.jsx`: Primary CTA and value proposition section.
- `Pricing.jsx`: Pricing tier display.
- `Support.jsx`: Customer support and FAQs.
- `About.jsx`: Information about DeepPulse.

**Dashboard Components (Portfolio & Holdings)**
- `HoldingsLayout.jsx`: Smart container that fetches or receives data and orchestrates the child presentational components.
- `SummaryCards.jsx`: 
  - *Props*: `totalInvestment` (number), `currentValue` (number), `totalReturns` (number/string), `todaysGain` (number/string).
- `HoldingsTable.jsx`: 
  - *Props*: `holdings` (Array of objects detailing instrument, qty, avgCost, ltp, curVal, pnl, netChange), `onSort` (function), `sortConfig` (object).
- `PortfolioAnalysis.jsx`: Container for analysis widgets.
- `DiversityChart.jsx`: 
  - *Props*: `diversityData` (Array of sector allocations).
- `RiskScore.jsx`: 
  - *Props*: `score` (number), `riskLevel` (string).
- `PulseAnalysis.jsx`: 
  - *Props*: `insights` (Array of market/portfolio insights).

**Terminal Components**
- `TerminalLayout.jsx`: Main layout orchestrator for the trading terminal.
- `TopNav.jsx`: Market indices, global search, and user profile summary.
- `LeftNav.jsx`: Sidebar navigation.
- `Watchlist.jsx`: 
  - *Props*: `stocks` (Array of stock objects), `onSelectStock` (function), `onRemoveStock` (function).
- `ChartArea.jsx`: Technical analysis chart integration.
  - *Props*: `activeInstrument` (object), `timeframe` (string), `chartType` (string).
- `OrderBook.jsx`: Market depth display (Bid/Ask quantities).
  - *Props*: `depthData` (object containing bids and asks).
- `OrderModal.jsx`: 
  - *Props*: `isOpen` (boolean), `onClose` (function), `instrument` (object), `onSubmitOrder` (function).

## 3. State Management Matrix

### Global States (Context API / Redux)
- **MarketDataContext**: Manages real-time WebSocket connections and broadcasts live price updates (LTP), market depth, and fundamental data to subscribed components.
- **UserWalletContext**: Tracks total margin available, utilized margin, available cash, and real-time realized/unrealized P&L.
- **AuthContext**: Manages user session, JWT token, login state, and basic profile details.
- **OrderManagerContext**: Tracks global open orders, positions, and execution statuses.

### Local States (Component Level)
- **OrderModal State**: 
  - `quantity` (number)
  - `price` (number - for limit orders)
  - `triggerPrice` (number - for SL/SL-M)
  - `orderType` (Market | Limit | SL | SL-M)
  - `productType` (MIS | CNC | NRML)
  - `validity` (Day | IOC)
- **Watchlist State**: Active selected standard (e.g., Nifty 50 vs. custom watchlist), search query.
- **HoldingsTable State**: Sorting column, sort direction, and pagination.

## 4. Backend Architecture & Data Flow (Future State)

### REST API Routing Structure
- **Auth Service**:
  - `POST /api/auth/register` - Create new user.
  - `POST /api/auth/login` - Authenticate and yield JWT.
  - `GET /api/auth/profile` - Retrieve user profile and settings.
- **Market Data Service**:
  - `GET /api/market/instruments` - List of tradable instruments.
  - `GET /api/market/historical/:symbol` - Historical OHLCV data for charting.
- **Order Management Service**:
  - `POST /api/orders/place` - Validate margin and place a new order.
  - `PUT /api/orders/modify/:id` - Modify an open order.
  - `DELETE /api/orders/cancel/:id` - Cancel an open order.
  - `GET /api/orders` - Fetch user's order history.
- **Portfolio & Ledger Service**:
  - `GET /api/portfolio/holdings` - Fetch long-term holdings (CNC).
  - `GET /api/portfolio/positions` - Fetch current day intraday positions (MIS).
  - `GET /api/wallet/balance` - Retrieve cash/margin balances.

### WebSocket Architecture (ws + Redis)
- **Channels / Rooms**:
  - `live_feeds`: Broadcasts ticks (LTP, Volume, High, Low, Close).
  - `market_depth`: Broadcasts Top 5 Bid/Ask for active instruments.
  - `user_channel_{userId}`: Private channel for pushing order execution updates, margin alerts, and trade confirmations.
- **Events Emitted by Server**:
  - `tick_update`: Streams raw price changes.
  - `order_status_change`: Pushes real-time status (PENDING -> EXECUTED).
- **Events Emitted by Client**:
  - `subscribe_instrument`: Client requests to join a specific instrument's room to save bandwidth.
  - `unsubscribe_instrument`: Client leaves the room when it's removed from the watchlist.

## 5. Database Schema Design (MongoDB)

### User Schema
```javascript
{
  _id: ObjectId,
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  wallet: {
    cashBalance: { type: Number, default: 0 },
    usedMargin: { type: Number, default: 0 }
  },
  settings: {
    darkMode: { type: Boolean, default: true },
    defaultProduct: { type: String, enum: ['MIS', 'CNC'], default: 'CNC' }
  },
  createdAt: Timestamp
}
```

### Order Schema
```javascript
{
  _id: ObjectId,
  userId: { type: ObjectId, ref: 'User', index: true },
  instrumentToken: { type: String, required: true },
  transactionType: { type: String, enum: ['BUY', 'SELL'], required: true },
  productType: { type: String, enum: ['MIS', 'CNC', 'NRML'], required: true },
  orderType: { type: String, enum: ['MARKET', 'LIMIT', 'SL', 'SL-M'] },
  quantity: { type: Number, required: true },
  price: { type: Number },
  triggerPrice: { type: Number },
  status: { type: String, enum: ['PENDING', 'EXECUTED', 'REJECTED', 'CANCELLED'] },
  averageExecutionPrice: { type: Number },
  rejectionReason: { type: String },
  timestamps: {
    placedAt: Date,
    executedAt: Date
  }
}
```

### Transaction / Ledger Schema (Double-Entry principles)
```javascript
{
  _id: ObjectId,
  userId: { type: ObjectId, ref: 'User', index: true },
  amount: { type: Number, required: true }, // Negative for debits, Positive for credits
  type: { type: String, enum: ['PAYIN', 'PAYOUT', 'BROKERAGE', 'TRADE_SETTLEMENT'] },
  referenceId: { type: String }, // Links to OrderId or PaymentGateway TxId
  balanceAfter: { type: Number }, // To ensure atomic consistency, using optimistic locking
  timestamp: Date
}
```

### Holdings Schema
```javascript
{
  _id: ObjectId,
  userId: { type: ObjectId, ref: 'User', index: true },
  instrumentToken: { type: String, required: true },
  quantity: { type: Number, required: true },
  averageCost: { type: Number, required: true },
  // Realized and Unrealized P&L is calculated dynamically on the fly:
  // Unrealized PnL = (LTP - averageCost) * quantity
  lastUpdatedAt: Date
}
```

## 6. Execution Roadmap

### Phase 1: Static UI & Component Polish (Current Focus)
- [x] Complete Landing Page scaffolding.
- [x] Finish Watchlist, Order Book, and Terminal Layouts.
- [x] Consolidate dumb components for Portfolio & Holdings (SummaryCards, HoldingsTable).
- [ ] Implement responsive breakpoints mapping for mobile-friendly dashboards.
- [ ] Finalize the interactive OrderModal with static mock data.

### Phase 2: State Management & Data Mocking
- [ ] Setup Context API structures (`MarketDataContext`, `UserWalletContext`).
- [ ] Wrap the terminal and dashboard with Providers.
- [ ] Connect `OrderModal.jsx` and `Watchlist.jsx` to local and global contexts.
- [x] Create a mock data service (`data.js`) to simulate realistic market ticks natively inside the browser for demo purposes (Backend `data.js` also created, solely for testing purposes).

### Phase 3: API Backend Initialization (Node.js & MongoDB)
- [x] Initialize Express.js backend repository.
- [ ] Provision MongoDB clusters and create the Mongoose models (User, Order, Holdings, Ledger).
- [ ] Implement JWT Authentication and build `/api/auth` endpoints.
- [ ] Build atomic ledger transactions (ensure User cash balances logically map to DB sessions/transactions).
- [ ] Develop `/api/orders` logic (Margin validation -> Database write).

### Phase 4: WebSocket Integration & Real-Time Sync
- [ ] Integrate native WebSockets (ws) on the Node.js server with a Redis Pub/Sub adapter.
- [ ] Implement a Mock Tick Generator worker to continuously emit LTP updates to `live_feeds`.
- [ ] Connect the React frontend to native WebSockets.
- [ ] Subscribe `Watchlist.jsx` and `ChartArea.jsx` to live streams.
- [ ] Implement visual flashes (green/red ticks) when prices change in the UI.
