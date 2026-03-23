import React from 'react';
import { MessageSquare, HelpCircle, Search } from 'lucide-react';

const Support = () => {
  return (
    <section id="support" className="py-24 px-6 max-w-4xl mx-auto flex flex-col items-center border-t border-white/5">
      <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-12 text-center">
        How can we help?
      </h2>

      {/* Search Bar */}
      <div className="w-full max-w-2xl relative mb-12">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
        <input 
          type="text" 
          placeholder="Search Knowledge Base..." 
          className="w-full bg-[#111218] border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-pulse-green/50 transition-colors"
        />
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
        
        {/* Chatbot Card */}
        <div className="pulse-card p-6 flex flex-col hover:bg-white/5 transition duration-300 cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <MessageSquare className="text-pulse-green" size={24} />
            <span className="bg-pulse-green/20 text-pulse-green text-[10px] font-bold px-2 py-0.5 rounded border border-pulse-green/30 uppercase tracking-widest">
              Online
            </span>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">AI Chatbot</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Instant answers to technical queries and trading mechanics.
          </p>
        </div>

        {/* Human Desk Card */}
        <div className="bg-[#111218] border border-white/10 rounded-2xl p-6 flex flex-col hover:bg-white/5 transition duration-300 cursor-pointer">
          <div className="mb-4">
            <HelpCircle className="text-pulse-green" size={24} />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Human Desk</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            24/7 dedicated account managers for institutional clients.
          </p>
        </div>
        
      </div>

      {/* System Status Pill */}
      <div className="flex items-center space-x-2 bg-pulse-green/10 border border-pulse-green/20 rounded-full px-4 py-2">
        <div className="w-2 h-2 rounded-full bg-pulse-green shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
        <span className="text-pulse-green text-[10px] font-bold tracking-widest uppercase">
          System Status: All Systems Operational
        </span>
      </div>
    </section>
  );
};

export default Support;
