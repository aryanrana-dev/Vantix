import React from 'react';
import { Landmark, TrendingUp, BarChart, Wallet } from 'lucide-react';

const SummaryCards = ({
  totalInvested = { value: '$210,450.00', subtext: 'Last updated 2m ago' },
  currentValue = { value: '$234,500.00', growth: '+11.4%', text: 'Overall Growth', isPositive: true },
  dayPnL = { value: '+$1,240.50', percentage: '(0.53%)', isPositive: true },
  availableFunds = '$24,500.00',
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

      {/* Total Invested */}
      <div className="bg-pulse-card border border-white/5 rounded-xl p-6 relative overflow-hidden flex flex-col justify-between h-32">
        <Landmark size={80} className="absolute right-0 bottom-0 translate-x-4 translate-y-4 text-white/[0.03]" />
        <div>
          <h3 className="text-xs font-bold text-gray-400 mb-2">Total Invested</h3>
          <div className="text-3xl font-bold text-white tracking-tight">{totalInvested.value}</div>
        </div>
        <div className="flex items-center space-x-2 text-[10px] text-gray-500">
          <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>
          <span>{totalInvested.subtext}</span>
        </div>
      </div>

      {/* Current Value */}
      <div className="bg-[#0f141a] border border-pulse-green/30 rounded-xl p-6 relative overflow-hidden flex flex-col justify-between h-32">
        <TrendingUp size={80} className="absolute right-0 bottom-0 translate-x-4 -translate-y-2 text-white/[0.03]" />
        <div>
          <h3 className="text-xs font-bold text-gray-400 mb-2">Current Value</h3>
          <div className="text-3xl font-bold text-white tracking-tight">{currentValue.value}</div>
        </div>
        <div className="flex items-center space-x-1.5">
          <TrendingUp size={12} className={currentValue.isPositive ? 'text-pulse-green' : 'text-rose-500'} />
          <span className={`text-[10px] font-bold ${currentValue.isPositive ? 'text-pulse-green' : 'text-rose-500'}`}>
            {currentValue.growth}
          </span>
          <span className="text-[10px] text-pulse-green/70">{currentValue.text}</span>
        </div>
      </div>

      {/* Day's P&L */}
      <div className="bg-pulse-card border border-white/5 rounded-xl p-6 relative overflow-hidden flex flex-col justify-between h-32">
        <BarChart size={80} className="absolute right-0 bottom-0 translate-x-4 translate-y-4 text-white/[0.03]" />
        <div>
          <h3 className="text-xs font-bold text-gray-400 mb-2">Day's P&L</h3>
          <div className={`text-3xl font-bold tracking-tight ${dayPnL.isPositive ? 'text-pulse-green' : 'text-rose-500'}`}>
            {dayPnL.value}
          </div>
        </div>
        <div className={`text-[11px] font-bold ${dayPnL.isPositive ? 'text-pulse-green' : 'text-rose-500'}`}>
          {dayPnL.percentage}
        </div>
      </div>

      {/* Available Funds */}
      <div className="bg-pulse-card border border-white/5 rounded-xl p-6 relative overflow-hidden flex flex-col justify-between h-32">
        <Wallet size={80} className="absolute right-0 bottom-0 translate-x-4 translate-y-4 text-white/[0.03]" />
        <div>
          <h3 className="text-xs font-bold text-gray-400 mb-2">Available Funds</h3>
          <div className="text-3xl font-bold text-white tracking-tight">${availableFunds}</div>
        </div>
        <div className="flex items-center space-x-2 text-[10px] text-gray-500">
          <div className="w-1.5 h-1.5 rounded-full bg-pulse-green"></div>
          <span>{"Ready for deployment"}</span>
        </div>
      </div>

    </div>
  );
};

export default SummaryCards;
