import React from 'react';
import { Search, Calendar, Download } from 'lucide-react';

const OrderBookHeader = ({
  activeTab = 'Executed',
  tabs = ['Open (2)', 'Executed', 'GTT', 'Rejected'],
  onTabClick = () => {},
  searchValue = '',
  onSearchChange = () => {},
  onDateRangeClick = () => {},
  onDownloadClick = () => {}
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      {/* Title & Tabs */}
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <h1 className="text-2xl font-bold text-white">Order Book</h1>
        
        <div className="flex items-center bg-[#1a1c24] rounded-lg p-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => onTabClick(tab)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-pulse-green text-[#0b0c10]'
                    : 'text-pulse-text-muted hover:text-white'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pulse-text-muted group-focus-within:text-pulse-green transition-colors" />
          <input
            type="text"
            placeholder="Search by symbol..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-[#1a1c24] border border-pulse-border rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-pulse-text-muted focus:outline-none focus:border-pulse-green focus:ring-1 focus:ring-pulse-green transition-all w-64"
          />
        </div>

        <button
          onClick={onDateRangeClick}
          className="flex items-center gap-2 bg-[#1a1c24] border border-pulse-border hover:border-pulse-text-muted rounded-lg px-4 py-2 text-sm text-white transition-colors"
        >
          <Calendar className="w-4 h-4 text-pulse-text-muted" />
          <span>Date Range</span>
        </button>

        <button
          onClick={onDownloadClick}
          className="flex items-center justify-center bg-[#1a1c24] border border-pulse-border hover:border-pulse-text-muted rounded-lg p-2 text-white transition-colors"
          aria-label="Download"
        >
          <Download className="w-4 h-4 text-pulse-text-muted" />
        </button>
      </div>
    </div>
  );
};

export default OrderBookHeader;
