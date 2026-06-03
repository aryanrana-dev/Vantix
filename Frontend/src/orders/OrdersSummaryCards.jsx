import React from 'react';
import { BarChart3 } from 'lucide-react';

const OrdersSummaryCards = ({
  executionRatio = { value: '94.2%', change: '+12%', isPositive: true },
  tradeVolume = { value: '$1.24M', desc: 'Institutional settlement active' },
  activeMargin = { value: '$42,890', change: '-2.4%', isPositive: false, desc: 'Utilization: 14% of $300,000 limit' }
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
      {/* Execution Ratio Card */}
      <div className="pulse-card p-6 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-pulse-text-muted uppercase tracking-wider">Execution Ratio</span>
          <span className={`text-sm font-bold ${executionRatio.isPositive ? 'text-pulse-green' : 'text-red-500'}`}>
            {executionRatio.change}
          </span>
        </div>

        <div className="mt-4 mb-3">
          <span className="text-3xl font-bold text-white">{executionRatio.value} (WIP)</span>
        </div>

        <div className="w-full bg-pulse-border h-1.5 rounded-full mt-auto">
          <div
            className="bg-pulse-green h-1.5 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"
            style={{ width: executionRatio.value }}
          />
        </div>
      </div>

      {/* Trade Volume Card */}
      <div className="pulse-card p-6 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-pulse-text-muted uppercase tracking-wider">Trade Volume (24h)</span>
          <BarChart3 className="w-4 h-4 text-pulse-text-muted" />
        </div>

        <div className="mt-4 mb-2">
          <span className="text-3xl font-bold text-white">{tradeVolume.value} (WIP)</span>
        </div>

        <div className="mt-auto">
          <span className="text-xs text-pulse-text-muted italic">{tradeVolume.desc}</span>
        </div>
      </div>

      {/* Active Margin Card */}
      <div className="pulse-card p-6 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-pulse-text-muted uppercase tracking-wider">Active Margin</span>
          <span className={`text-sm font-bold ${activeMargin.isPositive ? 'text-pulse-green' : 'text-red-500'}`}>
            {activeMargin.change}
          </span>
        </div>

        <div className="mt-4 mb-2">
          <span className="text-3xl font-bold text-white">{activeMargin.value} (WIP)</span>
        </div>

        <div className="mt-auto">
          <span className="text-xs text-pulse-text-muted">{activeMargin.desc}</span>
        </div>
      </div>
    </div>
  );
};

export default OrdersSummaryCards;
