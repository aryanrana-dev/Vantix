import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from './TopNav';
import LeftNav from './LeftNav';
import Watchlist from './Watchlist';
import ChartArea from './ChartArea';
import OrderBook from './OrderBook';
import { WATCHLIST_STOCKS, STOCK_DETAILS, CHART_DATA } from './data';
import OrderModal from './OrderModal';
import { MarketLivePriceProvider } from './MarketLivePrice';

const TerminalLayout = ({
  // We can pipe props through if the parent dictates,
  // but they have defaults inside the components so it renders standalone.
  onTradeClick = () => { }
}) => {
  const navigate = useNavigate();
  const [selectedStock, setSelectedStock] = useState('NVDA');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // Routing Handler for shared bars
  const handleNavClick = (id) => {
    if (id === 'portfolio' || id === 'holdings') navigate('/portfolio');
    if (id === 'markets' || id === 'watchlist') navigate('/terminal');
    if (id === 'orders') navigate('/orders');
  };

  const updateSelectedStock = (symbol) => {
    setSelectedStock(symbol);
  };

  const updateOrderModalOpen = () => {
    setIsOrderModalOpen(!isOrderModalOpen);
  };

  const currentData = STOCK_DETAILS[selectedStock] || STOCK_DETAILS['NVDA'];

  return (
    <div>
      <MarketLivePriceProvider>
        <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#0A0F16] font-sans selection:bg-pulse-green/30">
          <TopNav
            activeTab="markets"
            onTabSelect={handleNavClick}
            onLogoClick={() => navigate('/')}
          />
          <div className="flex flex-1 overflow-hidden">
            <LeftNav activeRoute="watchlist" onRouteSelect={handleNavClick} />
            <Watchlist
              stocks={['AAPL', 'NVDA', 'TSLA']}
              onSelectStock={updateSelectedStock}
              selectedSymbol={selectedStock}
            />
            <div className="flex flex-col flex-1 relative bg-[#0b0c10]">
              <ChartArea
                selectedStock={selectedStock}
                currentPrice={currentData.price}
                chartData={CHART_DATA}
              />
              <OrderBook
                bids={currentData.bids}
                asks={currentData.asks}
                onBuyClick={updateOrderModalOpen}
              />
            </div>
          </div>
        </div>
        <div className="z-50">
          <OrderModal
            selectedSymbol={selectedStock}
            isOpen={isOrderModalOpen}
            onClose={updateOrderModalOpen}
          />
        </div>
      </MarketLivePriceProvider>
    </div>
  );
};

export default TerminalLayout;
