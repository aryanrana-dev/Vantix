import React from 'react';

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 px-6 max-w-5xl mx-auto bg-[#1a1c23]/30 rounded-3xl border border-white/5 my-12">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
          Transparent Economics
        </h2>
        <p className="text-gray-400">No hidden fees. No compromises.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Core Access Card */}
        <div className="bg-[#0b0c10] border border-white/10 p-8 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="text-pulse-green text-xs font-bold tracking-widest uppercase mb-2">Core Access</div>
            <h3 className="text-3xl font-bold text-white mb-8">Zero Brokerage</h3>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-gray-300 text-sm">
                <span className="w-2 h-2 rounded-full bg-pulse-green mr-3"></span>
                Unlimited Equity Trades
              </li>
              <li className="flex items-center text-gray-300 text-sm">
                <span className="w-2 h-2 rounded-full bg-pulse-green mr-3"></span>
                Real-time Basic Data
              </li>
              <li className="flex items-center text-gray-300 text-sm">
                <span className="w-2 h-2 rounded-full bg-pulse-green mr-3"></span>
                Standard API Access
              </li>
            </ul>
          </div>
          <button className="w-full border border-white/20 hover:bg-white/5 text-white py-3 rounded-lg font-medium transition-colors text-sm">
            Open Account
          </button>
        </div>

        {/* Kinetic Pro Card */}
        <div className="pulse-card p-8 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-4 right-4 bg-pulse-green text-[#0b0c10] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
            Most Popular
          </div>
          
          <div className="relative z-10">
            <div className="text-pulse-green text-xs font-bold tracking-widest uppercase mb-2">Kinetic Pro</div>
            <div className="flex items-end mb-8">
              <h3 className="text-4xl font-extrabold text-white">$29</h3>
              <span className="text-gray-400 ml-1 mb-1">/mo</span>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-gray-300 text-sm">
                <span className="w-2 h-2 rounded-full bg-pulse-green mr-3 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                Sub-ms Execution Speed
              </li>
              <li className="flex items-center text-gray-300 text-sm">
                <span className="w-2 h-2 rounded-full bg-pulse-green mr-3 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                Level 2 Order Book Data
              </li>
              <li className="flex items-center text-gray-300 text-sm">
                <span className="w-2 h-2 rounded-full bg-pulse-green mr-3 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                Advanced AI Trend Mapping
              </li>
              <li className="flex items-center text-gray-300 text-sm">
                <span className="w-2 h-2 rounded-full bg-pulse-green mr-3 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                Priority Support Lane
              </li>
            </ul>
          </div>
          <button className="relative z-10 w-full bg-pulse-green hover:bg-[#059669] text-white py-3 rounded-lg font-medium transition-colors text-sm shadow-[0_4px_14px_rgba(16,185,129,0.4)]">
            Upgrade to Pro
          </button>
          
          {/* Decorative Card Background Effect */}
          <div className="absolute right-0 bottom-0 w-48 h-32 bg-white/5 rounded-tl-full blur-2xl group-hover:bg-pulse-green/10 transition duration-500 pointer-events-none"></div>
        </div>

      </div>
    </section>
  );
};

export default Pricing;
