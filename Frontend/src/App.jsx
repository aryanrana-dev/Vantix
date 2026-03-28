import React from 'react';
import LandingPage from './landing-page/LandingPage';
import TerminalLayout from './terminal/TerminalLayout';
import HoldingsLayout from './dashboard/HoldingsLayout';
import OrdersPageLayout from './orders/OrdersPageLayout';
import { AccountManagerProvider } from './AccountManager';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <AccountManagerProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/terminal" element={<TerminalLayout />} />
          <Route path="/portfolio" element={<HoldingsLayout />} />
          <Route path="/orders" element={<OrdersPageLayout />} />
        </Routes>
      </Router>
    </AccountManagerProvider>
  );
}

export default App;
