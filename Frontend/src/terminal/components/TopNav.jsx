import React from 'react';
import { Search, Bell } from 'lucide-react';

const TopNav = ({
  navLinks = [
    { label: 'Markets', id: 'markets' },
    { label: 'Portfolio', id: 'portfolio' },
    { label: 'History', id: 'history' },
    { label: 'Settings', id: 'settings' },
  ],
  activeTab = 'markets',
  marginAvailable = '$24,500.00',
  isConnected = true,
  onSearchChange = () => { },
  onSearchFocus = () => { },
  onTabSelect = () => { },
  onNotificationsClick = () => { },
  onProfileClick = () => { },
  onLogoClick = () => { },
}) => {
  return (
    <header className="h-14 bg-[#0a0f16] border-b border-white/5 flex items-center justify-between px-4 shrink-0">

      {/* Left section: Logo & Links */}
      <div className="flex items-center space-x-8">
        <div
          onClick={onLogoClick}
          className="text-xl font-bold tracking-tight text-pulse-green cursor-pointer"
        >
          VANTIX
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onTabSelect(link.id)}
              className={`text-sm font-medium transition-colors ${activeTab === link.id ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Center Section: Global Search */}
      <div className="flex-1 max-w-xl px-8 hidden lg:block">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Cmd+K to search stocks..."
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={onSearchFocus}
            className="w-full bg-[#11161d] border border-white/5 rounded-md py-1.5 pl-9 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pulse-green/50 transition-colors"
          />
        </div>
      </div>

      {/* Right Section: Account Details & Status */}
      <div className="flex items-center space-x-6">

        <div className="flex flex-col items-end justify-center">
          <span className="text-[9px] uppercase font-bold text-gray-500 tracking-widest">
            Margin Available
          </span>
          <span className="text-sm font-mono font-bold text-pulse-green">
            {marginAvailable}
          </span>
        </div>

        <div className="h-6 w-px bg-white/10"></div>

        <div className="flex items-center space-x-4">
          <button onClick={onNotificationsClick} className="text-gray-400 hover:text-white transition-colors relative">
            <Bell size={18} />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border border-[#0a0f16]"></span>
          </button>

          <div className="hidden sm:flex items-center space-x-2 bg-pulse-green/10 border border-pulse-green/20 rounded-full px-3 py-1 cursor-default">
            <div className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-pulse-green shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-red-500'}`}></div>
            <span className={`text-[10px] font-bold tracking-widest uppercase ${isConnected ? 'text-pulse-green' : 'text-red-500'}`}>
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>

          <button onClick={onProfileClick} className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 overflow-hidden border border-white/10 ml-2 hover:border-white/30 transition-colors">
            {/* Using a placeholder character since no image is provided */}
            <div className="w-full h-full flex items-center justify-center text-xs font-bold text-white bg-[#1a2332]">
              JS
            </div>
          </button>
        </div>

      </div>
    </header>
  );
};

export default TopNav;
