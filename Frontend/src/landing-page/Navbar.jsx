import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0B0C10]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="text-xl font-bold tracking-tight text-pulse-green">
          VANTIX
        </div>

        <div className="hidden md:flex items-center space-x-8 text-sm text-gray-300">
          <a href="#hero" className="hover:text-white transition-colors">Markets</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#support" className="hover:text-white transition-colors">Support</a>
        </div>

        <div>
          <button className="bg-pulse-green hover:bg-[#059669] text-white px-5 py-2 rounded font-medium text-sm transition-colors">
            Start Trading
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
