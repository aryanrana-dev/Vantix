import React from 'react';

const DiversityChart = ({
  chartData = [
    { label: 'Tech Equity', percentage: '70.2%', color: 'bg-pulse-green', stroke: '#10b981', dashCount: 70 },
    { label: 'Crypto Assets', percentage: '19.5%', color: 'bg-slate-300', stroke: '#cbd5e1', dashCount: 20 },
    { label: 'Cash', percentage: '10.3%', color: 'bg-gray-600', stroke: '#475569', dashCount: 10 },
  ]
}) => {
  return (
    <div className="bg-[#0f141a] border border-white/5 rounded-xl p-6 flex flex-col justify-between">
      <h3 className="text-sm font-bold text-white mb-6">Portfolio Diversity</h3>
      
      <div className="flex items-center space-x-8">
        {/* Donut Chart Mock */}
        <div className="relative w-32 h-32 shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            {/* Tech Equity Range */}
            <circle cx="64" cy="64" r="52" fill="transparent" stroke="#10b981" strokeWidth="16" strokeDasharray="228.6 326.7" />
            {/* Crypto Assets Range */}
            <circle cx="64" cy="64" r="52" fill="transparent" stroke="#cbd5e1" strokeWidth="16" strokeDasharray="63.7 326.7" strokeDashoffset="-228.6" />
            {/* Cash Range */}
            <circle cx="64" cy="64" r="52" fill="transparent" stroke="#475569" strokeWidth="16" strokeDasharray="32.6 326.7" strokeDashoffset="-292.3" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
             <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">Equity</span>
             <span className="text-xl font-bold text-white tracking-tight">70%</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col space-y-4 flex-1">
          {chartData.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                <span className="text-xs text-gray-400">{item.label}</span>
              </div>
              <span className="text-xs font-bold font-mono text-white">{item.percentage}</span>
            </div>
          ))}
        </div>
      </div>
    
    </div>
  );
};

export default DiversityChart;
