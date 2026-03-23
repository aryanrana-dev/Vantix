import React from 'react';
import { useState } from 'react';
import { Settings, Maximize } from 'lucide-react';


const ChartArea = ({
  selectedStock = 'NVDA',
  chartData,
  timeframes = ['1H', '4H', '1D', '1W'],
  currentPrice = '875.24',
  onSettingsClick = () => { },
  onFullscreenClick = () => { }
}) => {
  const [activeTimeframe, setActiveTimeframe] = useState('1H');
  const handleTimeframeSelect = (tf) => {
    setActiveTimeframe(tf);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0b0c10] border-b border-white/5 relative h-full">

      {/* Chart Header */}
      <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center space-x-6">
          <h1 className="text-lg font-bold text-white tracking-tight">{selectedStock}</h1>
          <div className="flex space-x-1 bg-white/5 rounded p-1">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => handleTimeframeSelect(tf)}
                className={`text-xs font-bold px-3 py-1 rounded transition-colors ${activeTimeframe === tf
                  ? 'bg-white/10 text-white'
                  : 'text-gray-500 hover:text-white'
                  }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4 text-gray-400">
          <button onClick={onSettingsClick} className="hover:text-white transition-colors">
            <Settings size={18} />
          </button>
          <button onClick={onFullscreenClick} className="hover:text-white transition-colors">
            <Maximize size={18} />
          </button>
        </div>
      </div>

      {/* Main Chart Rendering Area (Mock Visual) */}
      <div className="flex-1 w-full relative overflow-hidden">

        {/* Y-Axis Prices Mock */}
        <div className="absolute right-4 top-4 bottom-8 flex flex-col justify-between text-[10px] font-mono text-gray-500 z-10">
          {chartData?.[activeTimeframe]?.yAxis.map((price, i) => (
            <span key={`${activeTimeframe}-y-${i}`}>{price}</span>
          ))}
        </div>

        {/* X-Axis Time Mock */}
        <div className="absolute bottom-2 left-16 right-16 flex justify-between text-[10px] font-mono text-gray-500 z-10 w-[70%]">
          {chartData?.[activeTimeframe]?.labels.map((label, i) => (
            <span key={`${activeTimeframe}-x-${i}`}>{label}</span>
          ))}
        </div>

        {/* Horizontal Current Price Line */}
        <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-pulse-green/30 px-4 -translate-y-1/2 flex items-center justify-end z-10">
          <div className="bg-pulse-green text-[#0b0c10] text-[10px] font-bold font-mono px-2 py-0.5 rounded ml-auto">
            {currentPrice}
          </div>
        </div>

        {/* Candlesticks Mock (SVG) */}
        <svg className="w-full h-full absolute inset-0 pl-16 pt-16 pr-24 pb-12" preserveAspectRatio="none">
          <g transform="translate(0, 100)">
            {/* Array of mock bars: [x, height, offset, isGain] */}
            {[
              [20, 60, 40, false],
              [40, 80, 20, false],
              [60, 120, -50, true],
              [80, 100, -20, true],
              [100, 60, -30, false],
              [120, 140, -80, true],
              [140, 110, -50, true],
              [160, 50, 20, false],
              [180, 170, -110, true],
            ].map(([x, h, y, isGain], i) => (
              <React.Fragment key={i}>
                {/* Wick */}
                <line
                  x1={x + 4} y1={y - 10}
                  x2={x + 4} y2={y + h + 10}
                  stroke={isGain ? '#10b981' : '#f43f5e'}
                  strokeWidth="1"
                  opacity="0.3"
                />
                {/* Body */}
                <rect
                  x={x} y={y}
                  width="8" height={h}
                  fill={isGain ? '#10b981' : '#881337'}
                  rx="1"
                />
              </React.Fragment>
            ))}
          </g>
        </svg>

      </div>
    </div>
  );
};

export default ChartArea;
