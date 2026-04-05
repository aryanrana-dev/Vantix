import React, { useState } from 'react';
import { HeartPulse, ArrowRight, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    password: '',
    confirmPassword: '',
    age: '',
    income: '',
    acceptedProtocol: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    if (!formData.acceptedProtocol) {
      alert("You must accept the Vantix Protocol.");
      return;
    }
    console.log('Onboarding process completed with data:', formData);
    alert('Onboarding successful! Profile initialized.');
    // Optional: navigate to dashboard after successful onboarding
    // navigate('/terminal');
  };

  return (
    <div className="min-h-screen bg-pulse-bg text-white flex flex-col font-sans tracking-wide relative overflow-hidden">
      
      {/* Top Header */}
      <div className="w-full flex justify-between items-center p-6 absolute top-0 left-0 right-0 z-20">
        <div className="flex items-center space-x-2">
          <HeartPulse className="text-pulse-green w-6 h-6" />
          <span className="text-xl font-bold tracking-tight">VANTIX</span>
        </div>
        <div className="text-[10px] text-pulse-text-muted tracking-widest uppercase font-semibold">
          Obsidian Lens V2.6
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex flex-col items-center justify-center z-10 px-4 mt-16 sm:mt-0 pb-24">
        
        {/* Card */}
        <div className="w-full max-w-xl pulse-card p-8 sm:p-10 shadow-2xl flex flex-col border border-white/5 bg-[#13151a]">
          
          <h1 className="text-3xl font-bold mb-2">Let's Get Started</h1>
          <p className="text-pulse-text-muted text-sm mb-10">
            Initialize your high-performance financial profile.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
            
            {/* Full Name */}
            <div>
              <label className="block text-[10px] font-bold text-pulse-text-muted uppercase tracking-widest mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="ALEXANDER KINETIC"
                className="w-full bg-[#0b0c10] border border-transparent rounded-md p-3 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-pulse-green/50 focus:ring-1 focus:ring-pulse-green/50 transition-colors"
                required
              />
            </div>

            {/* Password Row */}
            <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-4">
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-pulse-text-muted uppercase tracking-widest mb-2">
                  Create Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-[#0b0c10] border border-transparent rounded-md p-3 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-pulse-green/50 focus:ring-1 focus:ring-pulse-green/50 transition-colors"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-pulse-text-muted uppercase tracking-widest mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-[#0b0c10] border border-transparent rounded-md p-3 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-pulse-green/50 focus:ring-1 focus:ring-pulse-green/50 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Age & Income Row */}
            <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-4">
              <div className="w-full sm:w-1/3">
                <label className="block text-[10px] font-bold text-pulse-text-muted uppercase tracking-widest mb-2">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="28"
                  className="w-full bg-[#0b0c10] border border-transparent rounded-md p-3 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-pulse-green/50 focus:ring-1 focus:ring-pulse-green/50 transition-colors"
                  required
                />
              </div>
              <div className="flex-1 relative">
                <label className="block text-[10px] font-bold text-pulse-text-muted uppercase tracking-widest mb-2">
                  Annual Income
                </label>
                <div className="relative">
                  <select
                    name="income"
                    value={formData.income}
                    onChange={handleChange}
                    className="w-full bg-[#0b0c10] border border-transparent rounded-md p-3 text-sm text-white focus:outline-none focus:border-pulse-green/50 focus:ring-1 focus:ring-pulse-green/50 transition-colors appearance-none"
                    required
                  >
                    <option value="" disabled className="text-gray-700">Select Range</option>
                    <option value="0-50k">$0 - $50,000</option>
                    <option value="50k-100k">$50,000 - $100,000</option>
                    <option value="100k-250k">$100,000 - $250,000</option>
                    <option value="250k+">$250,000+</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-pulse-text-muted pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Checkbox */}
            <div className="pt-2 flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="acceptedProtocol"
                  name="acceptedProtocol"
                  type="checkbox"
                  checked={formData.acceptedProtocol}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-700 bg-[#0b0c10] text-pulse-green focus:ring-pulse-green focus:ring-offset-[#13151a]"
                />
              </div>
              <div className="ml-3 text-[11px] sm:text-xs text-pulse-text-muted">
                <label htmlFor="acceptedProtocol">
                  I accept the <span className="text-pulse-green hover:underline cursor-pointer">Vantix Protocol</span> and data privacy standards.
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-pulse-green hover:bg-[#0fd08c] text-black font-bold py-3.5 rounded-md flex items-center justify-center transition-colors shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              >
                CONTINUE <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-xs text-center text-pulse-text-muted uppercase tracking-widest font-semibold">
            Already verified? <Link to="/login" className="text-pulse-green hover:text-[#0fd08c] transition-colors ml-1">Authenticate Here</Link>
          </div>
        </div>
      </div>

      {/* Page Footer */}
      <div className="absolute bottom-0 w-full bg-[#0b0c10]/80 backdrop-blur-md border-t border-white/5 py-4 px-6 flex flex-col md:flex-row items-center justify-between text-[8px] sm:text-[10px] text-pulse-text-muted uppercase tracking-widest z-20 space-y-4 md:space-y-0">
        <div>
          © 2026 KINETIC DEEP. SECURED BY OBSIDIAN LENS.
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/compliance" className="hover:text-white transition-colors">Compliance</Link>
          <div className="flex items-center bg-[#13151a] border border-white/5 rounded-full px-3 py-1.5 space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-pulse-green animate-pulse"></div>
            <span>Secure Uplink Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
