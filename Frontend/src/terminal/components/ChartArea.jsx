import React, { useState } from 'react';
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
  const [hoverX, setHoverX] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);

  const handleTimeframeSelect = (tf) => {
    setActiveTimeframe(tf);
    setHoverX(null);
    setHoverIndex(null);
  };

  // Mock distinctive candlestick data per timeframe to make the chart functional visually
  const getMockCandles = (tf) => {
    const base = [
      [20, 60, 40, false],
      [40, 80, 20, false],
      [60, 120, -50, true],
      [80, 100, -20, true],
      [100, 60, -30, false],
      [120, 140, -80, true],
      [140, 110, -50, true],
      [160, 50, 20, false],
      [180, 170, -110, true]
    ];
    
    // Use multipliers to alter the shape so switching timeframes visually updates the chart
    const multipliers = { '1H': 1, '4H': 0.8, '1D': 1.2, '1W': 1.5 };
    const m = multipliers[tf] || 1;
    
    return base.map(([x, h, y, isGain], i) => [
      x, 
      h * m, 
      y * (m > 1 ? 0.9 : 1.1), 
      (tf === '1D' || tf === '1W') ? (i % 2 === 0 ? !isGain : isGain) : isGain,
      // Mock OHLC data for tooling
      { O: (800 + i*10*m).toFixed(2), H: (850 + i*10*m).toFixed(2), L: (790 + i*10*m).toFixed(2), C: (820 + i*10*m).toFixed(2) }
    ]);
  };

  const activeCandles = getMockCandles(activeTimeframe);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - 64; // adjust for left padding (pl-16)

    let closestIdx = 0;
    let minDiff = Infinity;
    
    activeCandles.forEach(([cx], i) => {
      const diff = Math.abs(cx - x);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = i;
      }
    });

    if (minDiff < 30) {
      setHoverX(activeCandles[closestIdx][0] + 64); // match SVG X including padding
      setHoverIndex(closestIdx);
    } else {
      setHoverX(null);
      setHoverIndex(null);
    }
  };

  const handleMouseLeave = () => {
    setHoverX(null);
    setHoverIndex(null);
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

      {/* Main Chart Rendering Area */}
      <div 
        className="flex-1 w-full relative overflow-hidden cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >

        {/* Y-Axis Prices Mock */}
        <div className="absolute right-4 top-4 bottom-8 flex flex-col justify-between text-[10px] font-mono text-gray-500 z-10 pointer-events-none">
          {chartData?.[activeTimeframe]?.yAxis.map((price, i) => (
            <span key={`${activeTimeframe}-y-${i}`}>{price}</span>
          ))}
        </div>

        {/* X-Axis Time Mock */}
        <div className="absolute bottom-2 left-16 right-16 flex justify-between text-[10px] font-mono text-gray-500 z-10 w-[70%] pointer-events-none">
          {chartData?.[activeTimeframe]?.labels.map((label, i) => (
            <span key={`${activeTimeframe}-x-${i}`}>{label}</span>
          ))}
        </div>

        {/* Horizontal Current Price Line */}
        <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-pulse-green/30 px-4 -translate-y-1/2 flex items-center justify-end z-10 pointer-events-none">
          <div className="bg-pulse-green text-[#0b0c10] text-[10px] font-bold font-mono px-2 py-0.5 rounded ml-auto">
            {currentPrice}
          </div>
        </div>

        {/* Crosshair & Tooltip */}
        {hoverX !== null && hoverIndex !== null && (
          <>
            {/* Vertical Line */}
            <div 
              className="absolute top-0 bottom-8 border-l border-dashed border-white/30 z-20 pointer-events-none transition-all duration-75"
              style={{ left: hoverX + 3 }} // align with candle center
            />
            
            {/* Tooltip Overlay */}
            <div className="absolute top-4 left-4 bg-[#11161d] border border-white/10 rounded-lg p-2 flex space-x-3 text-[10px] font-mono z-30 pointer-events-none shadow-xl">
              <div className="flex space-x-1"><span className="text-gray-500">O:</span><span className="text-white">{activeCandles[hoverIndex][4].O}</span></div>
              <div className="flex space-x-1"><span className="text-gray-500">H:</span><span className="text-white">{activeCandles[hoverIndex][4].H}</span></div>
              <div className="flex space-x-1"><span className="text-gray-500">L:</span><span className="text-white">{activeCandles[hoverIndex][4].L}</span></div>
              <div className="flex space-x-1"><span className="text-gray-500">C:</span><span className="text-white">{activeCandles[hoverIndex][4].C}</span></div>
            </div>
          </>
        )}

        {/* Candlesticks (SVG) */}
        <svg className="w-full h-full absolute inset-0 pl-16 pt-16 pr-24 pb-12 pointer-events-none" preserveAspectRatio="none">
          <g transform="translate(0, 100)">
            {activeCandles.map(([x, h, y, isGain], i) => (
              <React.Fragment key={i}>
                {/* Wick */}
                <line
                  x1={x + 4} y1={y - 10}
                  x2={x + 4} y2={y + h + 10}
                  stroke={isGain ? '#10b981' : '#f43f5e'}
                  strokeWidth="1"
                  opacity={hoverIndex !== null && hoverIndex !== i ? "0.1" : "0.5"}
                  className="transition-opacity duration-200"
                />
                {/* Body */}
                <rect
                  x={x} y={y}
                  width="8" height={h}
                  fill={isGain ? '#10b981' : '#881337'}
                  rx="1"
                  opacity={hoverIndex !== null && hoverIndex !== i ? "0.3" : "1"}
                  className="transition-opacity duration-200"
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
