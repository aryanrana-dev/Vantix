import { useState } from 'react';
import { HeartPulse, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
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
    if (!formData.email || !formData.password) {
      alert("Please enter both email and password.");
      return;
    }
    console.log('Login authentication attempted with:', formData);
    alert('Authentication successful! Uplink established.');
    navigate('/terminal');
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
        <div className="w-full max-w-md pulse-card p-8 sm:p-10 shadow-2xl flex flex-col border border-white/5 bg-[#13151a]">

          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-pulse-text-muted text-sm mb-10">
            Authenticate to access your high-performance financial profile.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">

            {/* Email Field */}
            <div>
              <label className="block text-[10px] font-bold text-pulse-text-muted uppercase tracking-widest mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ALEXANDER@KINETIC.COM"
                className="w-full bg-[#0b0c10] border border-transparent rounded-md p-3 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-pulse-green/50 focus:ring-1 focus:ring-pulse-green/50 transition-colors"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[10px] font-bold text-pulse-text-muted uppercase tracking-widest">
                  Authentication Key
                </label>
                <a href="#" className="text-[10px] text-pulse-green hover:underline">FORGOT?</a>
              </div>
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

            {/* Checkbox */}
            <div className="pt-2 flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-700 bg-[#0b0c10] text-pulse-green focus:ring-pulse-green focus:ring-offset-[#13151a]"
                />
              </div>
              <div className="ml-3 text-[11px] sm:text-xs text-pulse-text-muted">
                <label htmlFor="rememberMe">
                  Maintain secure uplink <span className="text-pulse-green">(Remember me)</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-pulse-green hover:bg-[#0fd08c] text-black font-bold py-3.5 rounded-md flex items-center justify-center transition-colors shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              >
                AUTHENTICATE <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </form>

          {/* Registration Link */}
          <div className="mt-8 text-xs text-center text-pulse-text-muted uppercase tracking-widest font-semibold">
            New to Vantix? <Link to="/signup" className="text-pulse-green hover:text-[#0fd08c] transition-colors ml-1">Initialize Here</Link>
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

export default Login;
