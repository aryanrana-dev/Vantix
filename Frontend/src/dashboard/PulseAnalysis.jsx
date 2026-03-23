import React from 'react';

const PulseAnalysis = ({
  insightText = "Your portfolio is heavily skewed towards Semiconductor growth. NVDA earnings next week may increase volatility by 4.2%.",
  onRunSimulatorClick = () => {}
}) => {
  return (
    <div className="bg-pulse-card border border-white/5 rounded-xl p-6 flex flex-col justify-between">
      <h3 className="text-sm font-bold text-white mb-4 block">Pulse Analysis</h3>
      
      <p className="text-xs text-gray-400 leading-relaxed mb-6">
        {insightText}
      </p>

      <button 
        onClick={onRunSimulatorClick}
        className="w-full bg-transparent border border-pulse-green/30 text-pulse-green hover:bg-pulse-green/10 font-bold py-3 rounded text-[10px] tracking-widest uppercase transition-colors"
      >
        Run Simulator
      </button>
    </div>
  );
};

export default PulseAnalysis;
