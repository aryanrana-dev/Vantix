import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from '../terminal/TopNav';
import LeftNav from '../terminal/LeftNav';
import SummaryCards from './SummaryCards';
import PortfolioAnalysis from './PortfolioAnalysis';
import HoldingsTable from './HoldingsTable';
import { USERS, ORDERS, HOLDINGS, TRANSACTIONS } from '../../../Backend/data';

const HoldingsLayout = () => {
  const navigate = useNavigate();

  // Navigation handlers
  const handleNavClick = (id) => {
    if (id === 'markets' || id === 'watchlist') navigate('/terminal');
    if (id === 'portfolio' || id === 'holdings' || id === 'dashboard') navigate('/portfolio');
    if (id === 'orders') navigate('/orders');
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#0A0F16] font-sans overflow-hidden">
      {/* Reusing TopNav and overriding active tab */}
      <TopNav
        activeTab="portfolio"
        onTabSelect={handleNavClick}
        onLogoClick={() => navigate('/')}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Reusing existing LeftNav layout but updating it to match the expanded text version */}
        <LeftNav activeRoute="holdings" onRouteSelect={handleNavClick} />

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-8 wrapper-scroll">

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Portfolio Overview</h1>
              <p className="text-sm text-gray-400">Real-time valuation of your digital and equity assets.</p>
            </div>

            <div className="flex items-center space-x-2 bg-pulse-green/10 border border-pulse-green/20 rounded-full px-4 py-2 cursor-default shrink-0">
              <div className="w-2 h-2 rounded-full bg-pulse-green shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-pulse-green">Live Market Feed</span>
            </div>
          </div>

          <SummaryCards availableFunds={USERS[0].wallet.cashBalance} />

          <PortfolioAnalysis />

          <HoldingsTable holdings={HOLDINGS} />

        </div>
      </div>
    </div>
  );
};

export default HoldingsLayout;
