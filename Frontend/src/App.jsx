import React from 'react';
import LandingPage from './landing-page/LandingPage';
import TerminalLayout from './terminal/components/TerminalLayout';
import HoldingsLayout from './dashboard/HoldingsLayout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/terminal" element={<TerminalLayout />} />
        <Route path="/portfolio" element={<HoldingsLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
