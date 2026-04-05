import { useState } from 'react';
import { HeartPulse, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');

  const handleGoogleSignup = () => {
    console.log('Google Signup Clicked');
    window.location.href = "http://localhost:3000/auth/google";
  };

  const handleEmailSignup = (e) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter an email address');
      return;
    }
    console.log('Email Signup with:', email);
    alert(`Signup process started for ${email}`);
  };

  return (
    <div className="min-h-screen bg-pulse-bg text-white flex flex-col items-center justify-center font-sans tracking-wide relative">
      {/* Background gradients if needed to match image exactly - pulse-bg already has radial gradient from index.css */}

      {/* Main Container */}
      <div className="w-full max-w-md flex flex-col items-center z-10 px-6">

        {/* Logo */}
        <div className="flex items-center space-x-2 mb-10">
          <HeartPulse className="text-pulse-green w-8 h-8" />
          <span className="text-2xl font-bold tracking-tight">Vantix</span>
        </div>

        {/* Card */}
        <div className="pulse-card w-full p-8 shadow-2xl flex flex-col">

          <h1 className="text-2xl font-bold text-center mb-2">Create your Vantix Account</h1>
          <p className="text-pulse-text-muted text-sm text-center mb-8 px-4">
            Access high-performance financial intelligence with the obsidian standard.
          </p>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full bg-pulse-green hover:bg-[#0fd08c] text-black font-semibold py-3 rounded-md flex items-center justify-center transition-colors mb-6 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#000000" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#000000" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#000000" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#000000" />
            </svg>
            Sign up with Google
          </button>

          {/* Divider */}
          <div className="flex items-center w-full mb-6 relative">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="px-4 text-[10px] text-pulse-text-muted font-semibold tracking-widest uppercase bg-transparent">
              OR CONTINUE WITH EMAIL
            </span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          <form onSubmit={handleEmailSignup} className="flex flex-col">
            <div className="mb-6">
              <label htmlFor="email" className="block text-[10px] font-bold text-pulse-text-muted uppercase tracking-widest mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-[#0b0c10] border border-white/10 rounded-md p-3 text-white placeholder-gray-600 focus:outline-none focus:border-pulse-green focus:ring-1 focus:ring-pulse-green transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#16181d] hover:bg-[#1f2127] border border-white/5 text-white font-semibold py-3 rounded-md transition-colors"
            >
              Continue with Email
            </button>
          </form>

          {/* Encrypted Verification Footer */}
          <div className="mt-8 flex items-center justify-center text-pulse-text-muted opacity-80">
            <ShieldCheck className="w-3 h-3 mr-2" />
            <span className="text-[10px] tracking-widest uppercase font-semibold">End-to-end encrypted verification</span>
          </div>
        </div>

        {/* Login Link */}
        <div className="mt-8 text-sm text-pulse-text-muted">
          Already have an account? <Link to="/login" className="text-pulse-green font-semibold hover:text-[#0fd08c] transition-colors">Log in</Link>
        </div>
      </div>

      {/* Page Footer */}
      <div className="absolute bottom-6 w-full flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 text-[10px] text-pulse-text-muted uppercase tracking-widest px-6 text-center">
        <span>© 2026 VANTIX TECHNOLOGIES. ALL RIGHTS RESERVED.</span>
        <div className="flex items-center space-x-6">
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link to="/security" className="hover:text-white transition-colors">Security</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
