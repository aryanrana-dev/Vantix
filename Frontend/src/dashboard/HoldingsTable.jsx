import React from 'react';
import { MoreVertical, Download, Filter } from 'lucide-react';

const HoldingsTable = ({
  holdings = [
    { symbol: 'NVDA', name: 'NVIDIA Corp', qty: '150.00', avgCost: '$425.20', ltp: '$894.35', currentValue: '$134,152.50', pnlValue: '+$70,372.50', pnlPercent: '+110.3%', isGain: true, iconColor: 'bg-emerald-500' },
    { symbol: 'AAPL', name: 'Apple Inc', qty: '200.00', avgCost: '$182.50', ltp: '$191.22', currentValue: '$38,244.00', pnlValue: '+$1,744.00', pnlPercent: '+4.78%', isGain: true, iconColor: 'bg-slate-300' },
    { symbol: 'TSLA', name: 'Tesla, Inc.', qty: '85.00', avgCost: '$210.15', ltp: '$175.40', currentValue: '$14,909.00', pnlValue: '-$2,953.75', pnlPercent: '-16.5%', isGain: false, iconColor: 'bg-red-500' },
    { symbol: 'BTC/USD', name: 'Bitcoin', qty: '0.450', avgCost: '$52,140.00', ltp: '$68,420.10', currentValue: '$30,789.05', pnlValue: '+$7,326.05', pnlPercent: '+31.2%', isGain: true, iconColor: 'bg-amber-500' },
    { symbol: 'ETH/USD', name: 'Ethereum', qty: '4.20', avgCost: '$2,850.00', ltp: '$3,420.50', currentValue: '$14,366.10', pnlValue: '+$2,396.10', pnlPercent: '+20.0%', isGain: true, iconColor: 'bg-indigo-400' },
  ],
  onExportCSV = () => { },
  onFilterClick = () => { },
  onActionClick = () => { }
}) => {
  return (
    <div className="bg-pulse-card border border-white/5 rounded-xl flex flex-col mb-8 overflow-hidden">

      {/* Header Area */}
      <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-4 h-4 rounded-full bg-pulse-green flex items-center justify-center">
            <div className="w-1 h-3 bg-[#0f141a]"></div>
          </div>
          <h2 className="text-lg font-bold text-white">Active Holdings</h2>
        </div>

        <div className="flex space-x-3">
          <button onClick={onExportCSV} className="text-xs font-bold text-gray-300 flex items-center space-x-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors border border-white/5">
            <span>Export CSV</span>
          </button>
          <button onClick={onFilterClick} className="text-xs font-bold text-gray-300 flex items-center space-x-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors border border-white/5">
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 text-[10px] uppercase font-bold text-gray-500 tracking-wider">
              <th className="py-4 px-6 font-medium">Instrument</th>
              <th className="py-4 px-6 font-medium">Qty</th>
              <th className="py-4 px-6 font-medium">Avg. Cost</th>
              <th className="py-4 px-6 font-medium">LTP</th>
              <th className="py-4 px-6 font-medium">Current Value</th>
              {/* <th className="py-4 px-6 font-medium">P&L</th> */}
              <th className="py-4 px-6 font-medium text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.02]">
            {holdings.map((holding, idx) => (
              <tr key={idx} className="hover:bg-white/[0.02] transition-colors group">
                {/* Instrument */}
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded shrink-0 bg-emerald-500`}></div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-white tracking-wide">{holding.instrumentToken}</span>
                      <span className="text-[10px] text-gray-500">{holding.name}</span>
                    </div>
                  </div>
                </td>

                {/* QTY */}
                <td className="py-4 px-6 text-sm text-gray-300 font-mono">
                  {holding.quantity}
                </td>

                {/* Avg Cost */}
                <td className="py-4 px-6 text-sm text-gray-300 font-mono">
                  {holding.averageCost}
                </td>

                {/* LTP */}
                <td className="py-4 px-6 text-sm text-gray-300 font-mono">
                  {holding.averageCost}
                </td>

                {/* Current Value */}
                <td className="py-4 px-6 text-sm text-gray-300 font-mono">
                  {holding.averageCost * holding.quantity}
                </td>

                {/* P&L */}
                {/* <td className="py-4 px-6">
                  <div className="flex flex-col">
                    <span className={`text-sm font-bold font-mono tracking-wide ${holding.isGain ? 'text-pulse-green' : 'text-rose-500'}`}>
                      {holding.pnlValue}
                    </span>
                    <span className={`text-[10px] font-bold ${holding.isGain ? 'text-pulse-green' : 'text-rose-500'}`}>
                      {holding.pnlPercent}
                    </span>
                  </div>
                </td> */}

                {/* Action */}
                <td className="py-4 px-6 text-center">
                  <button onClick={() => onActionClick(holding.symbol)} className="text-gray-500 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5 opacity-0 group-hover:opacity-100">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination mock */}
      <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
        <span>Showing {holdings.length} of {holdings.length} instruments</span>
        <div className="flex space-x-2">
          <button className="px-2 py-1 hover:text-white transition-colors cursor-not-allowed opacity-50">&lt;</button>
          <button className="px-2 py-1 hover:text-white transition-colors cursor-not-allowed opacity-50">&gt;</button>
        </div>
      </div>

    </div>
  );
};

export default HoldingsTable;
