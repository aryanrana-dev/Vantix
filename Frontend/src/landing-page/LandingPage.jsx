import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Pricing from './Pricing';
import Support from './Support';

const Footer = () => (
  <footer className="w-full bg-[#07080b] py-8 border-t border-white/5 mt-12">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
      <div className="mb-4 md:mb-0">
        <span className="font-bold text-white tracking-widest uppercase">Vantix</span>
        <br />
        &copy; 2026 Vantix. All rights reserved. High-performance trading involves risk.
      </div>
      <div className="flex items-center space-x-6">
        <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
        <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
        <a href="#risk" className="hover:text-white transition-colors">Risk Disclosure</a>
        <a href="#status" className="hover:text-white transition-colors">System Status</a>
      </div>
    </div>
  </footer>
);

const LandingPage = () => {
  const navigate = useNavigate();

  const handleNavClick = (id) => {
    if (id == 'signup') navigate('/signup');
  }

  return (
    <div className="bg-pulse-bg text-white min-h-screen pt-16">
      <Navbar onRouteSelect={handleNavClick} />
      <Hero />
      <About />
      <Pricing />
      <Support />
      <Footer />
    </div>
  );
};

export default LandingPage;
