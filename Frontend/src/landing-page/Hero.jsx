import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section id="hero" className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-[90vh] flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        <div className="space-y-8">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-white">
            Trading at the <br />
            <span className="text-pulse-green italic font-bold">Speed</span> of Thought
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-lg leading-relaxed">
            Experience sub-millisecond execution with our proprietary obsidian-engine architecture. Institutional liquidity at your fingertips.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
            <button className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-pulse-green hover:bg-[#059669] text-white px-8 py-3 rounded font-semibold transition-colors">
              <span>Start Trading</span>
              <ArrowRight size={18} />
            </button>
            <button className="w-full sm:w-auto border border-white/10 hover:bg-white/5 text-white px-8 py-3 rounded font-semibold transition-colors">
              View Markets
            </button>
          </div>
        </div>

        <div className="w-full relative group">
          {/* Subtle glow effect behind the chart */}
          <div className="absolute -inset-1 bg-gradient-to-r from-pulse-green/20 to-transparent blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
          
          <div className="relative aspect-video bg-pulse-card border border-white/10 rounded-2xl p-6 flex items-center justify-center overflow-hidden">
            <div className="w-full h-full flex flex-col justify-end space-y-4 relative z-10">
               {/* Decorative abstract chart visual */}
               <div className="flex items-end space-x-2 h-full justify-around w-full opacity-80">
                  {[40, 70, 45, 90, 65, 80, 55, 100].map((h, i) => (
                    <div 
                      key={i} 
                      className={`w-8 rounded-t-sm ${i % 2 === 0 ? 'bg-pulse-green' : 'bg-red-500'}`} 
                      style={{ height: `${h}%` }}
                    />
                  ))}
               </div>
               
               <div className="h-2 w-full bg-white/5 rounded-full mt-4 flex items-center">
                 <div className="h-full w-1/3 bg-white/20 rounded-full mx-auto shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
