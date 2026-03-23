import React from 'react';

const RiskScore = ({
  score = '6.8',
  description = 'MODERATE-HIGH',
  subtitle = 'Based on volatility indexing',
}) => {
  return (
    <div className="bg-[#0f141a] border border-white/5 rounded-xl p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-sm font-bold text-white mb-1">Risk Score</h3>
        <p className="text-[10px] text-gray-500">{subtitle}</p>
      </div>
      
      <div className="flex flex-col items-center justify-center my-6">
        <span className="text-6xl font-bold text-white tracking-tighter mb-2">{score}</span>
        <span className="text-[10px] font-bold text-pulse-green tracking-widest uppercase">{description}</span>
      </div>

      {/* Progress Bar Mock */}
      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden flex">
         <div className="h-full bg-pulse-green" style={{ width: '68%' }}></div>
      </div>
    </div>
  );
};

export default RiskScore;
