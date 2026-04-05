import { useNavigate } from 'react-router-dom';
import { LayoutGrid, Eye, Briefcase, FileText, Wallet, HelpCircle, LogOut } from 'lucide-react';
import axios from 'axios';

const NavItem = ({ icon: Icon, label, active, onClick, bottom }) => (
  <button
    onClick={onClick}
    className={`w-full h-12 flex items-center space-x-4 px-6 transition-all duration-200
      ${active
        ? 'bg-white/5 border-l-2 border-pulse-green text-pulse-green shadow-[inset_1px_0_0_rgba(16,185,129,0.3)]'
        : 'text-gray-400 hover:text-white hover:bg-white/[0.02] border-l-2 border-transparent'
      }
      ${bottom ? 'mt-auto' : ''}
    `}
  >
    <Icon size={18} />
    <span className="text-sm font-bold tracking-wide">{label}</span>
  </button>
);

const LeftNav = ({
  activeRoute = 'dashboard',
  onRouteSelect = () => { },
  onHelpSelect = () => { },
}) => {
  const navigate = useNavigate();
  const onSignoutSelect = async () => {
    const response = await axios.get("http://localhost:3000/signout", {
      withCredentials: true
    });
    if (response.data.success) {
      navigate("/");
      console.log("Signed out successfully");
    } else {
      console.log("Failed to sign out");
    }
  }
  return (
    <aside className="w-[240px] h-[calc(100vh-56px)] bg-[#0A0F16] border-r border-white/5 flex flex-col py-6 shrink-0 z-10">

      {/* User Profile Summary */}
      <div className="px-6 flex items-center space-x-3 mb-10">
        <div className="w-10 h-10 rounded shadow-md overflow-hidden bg-white/10 shrink-0">
          {/* Placeholder Avatar */}
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-white tracking-wide leading-tight">Vantix Pro</span>
          <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">Active Trader</span>
        </div>
      </div>

      {/* Top Navigation Links */}
      <div className="flex flex-col space-y-1">
        <NavItem
          icon={LayoutGrid}
          label="Dashboard"
          active={activeRoute === 'dashboard'}
          onClick={() => onRouteSelect('dashboard')}
        />
        <NavItem
          icon={Eye}
          label="Watchlist"
          active={activeRoute === 'watchlist'}
          onClick={() => onRouteSelect('watchlist')}
        />
        <NavItem
          icon={Briefcase}
          label="Holdings" // Explicitly renamed from Positions here
          active={activeRoute === 'holdings'}
          onClick={() => onRouteSelect('holdings')}
        />
        <NavItem
          icon={FileText}
          label="Orders"
          active={activeRoute === 'orders'}
          onClick={() => onRouteSelect('orders')}
        />
        <NavItem
          icon={Wallet}
          label="Wallet"
          active={activeRoute === 'wallet'}
          onClick={() => onRouteSelect('wallet')}
        />
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col space-y-1 mt-auto pb-4">
        <NavItem
          icon={HelpCircle}
          label="Support"
          onClick={onHelpSelect}
        />
        <NavItem
          icon={LogOut}
          label="Sign Out"
          onClick={onSignoutSelect}
        />
      </div>

    </aside>
  );
};

export default LeftNav;
