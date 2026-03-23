import React from 'react';
import { Plus } from 'lucide-react';

const Watchlist = ({
  stocks = [
    { symbol: 'NVDA', name: 'NVIDIA CORP.', price: '875.24', change: '+4.28%', isGain: true },
    { symbol: 'AAPL', name: 'APPLE INC.', price: '172.45', change: '-0.12%', isGain: false },
    { symbol: 'TSLA', name: 'TESLA INC.', price: '168.30', change: '+1.45%', isGain: true },
    { symbol: 'BTC/USD', name: 'BITCOIN', price: '64,280.00', change: '+2.10%', isGain: true },
    { symbol: 'ETH/USD', name: 'ETHEREUM', price: '3,450.12', change: '-1.05%', isGain: false },
  ],
  selectedSymbol = 'NVDA',
  onAddClick = () => { },
  onSelectStock = () => { },
}) => {
  const updateSelectedStock = (stock) => {
    onSelectStock(stock.symbol);
  };
  return (
    <div className="w-[320px] h-[calc(100vh-56px)] bg-[#0f141a] border-r border-white/5 flex flex-col shrink-0">

      {/* Header */}
      <div className="h-12 flex items-center justify-between px-4 border-b border-white/5">
        <h2 className="text-xs font-bold tracking-widest text-gray-400 uppercase">
          Live Watchlist
        </h2>
        <button
          onClick={onAddClick}
          className="w-5 h-5 rounded-full bg-pulse-green/20 flex items-center justify-center text-pulse-green hover:bg-pulse-green hover:text-[#0f141a] transition-colors"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {stocks.map((stock) => {
          const isSelected = selectedSymbol === stock.symbol;
          return (
            <div
              key={stock.symbol}
              onClick={() => updateSelectedStock(stock)}
              className={`flex items-center justify-between p-4 cursor-pointer border-b border-white/[0.02] transition-colors relative
                ${isSelected ? 'bg-pulse-green/5' : 'hover:bg-white/5'}
              `}
            >
              {/* Selected indicator (left border) */}
              {isSelected && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-pulse-green shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
              )}

              {/* Left col: Symbol & Name */}
              <div className="flex flex-col relative z-10">
                <span className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                  {stock.symbol}
                </span>
                <span className="text-[10px] uppercase font-medium text-gray-500 tracking-wider">
                  {stock.name}
                </span>
              </div>

              {/* Right col: Price & Change */}
              <div className="flex flex-col items-end relative z-10">
                <span className={`text-sm font-bold tracking-wider ${stock.isGain ? 'text-pulse-green' : 'text-rose-500'}`}>
                  {stock.change}
                </span>
                <span className="text-sm font-mono text-white">
                  ${stock.price}
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default Watchlist;
