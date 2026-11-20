import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Sparkles, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { FoodyxLogo } from '../components/Navbar';

export const AuthPage = () => {
  const navigate = useNavigate();
  const { login, register, switchDemoRole } = useAuth();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('customer@foodyx.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('Elakiya R');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        await register(email, password, name);
      } else {
        await login(email, password);
      }
      navigate('/restaurants');
    } catch (err) {
      setError('Authentication failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoSelect = (roleKey, demoEmail) => {
    switchDemoRole(roleKey);
    setEmail(demoEmail);
    setPassword('password123');
    navigate('/restaurants');
  };

  return (
    <div className="min-h-screen bg-[#0b0b0e] flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background ambient gold swirls */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#DFB76C]/10 via-[#F3CA7E]/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

      {/* Main Card (Matches UI Mockup Screen: Welcome Back!) */}
      <div className="relative w-full max-w-md rounded-3xl bg-[#13131b]/95 border border-[#DFB76C]/30 p-8 sm:p-10 shadow-2xl backdrop-blur-2xl">
        
        {/* Brand Centerpiece */}
        <div className="flex flex-col items-center text-center space-y-2 mb-8">
          <FoodyxLogo size="lg" />
          <h1 className="text-2xl font-extrabold text-[#FAF8F5] pt-3">
            {isSignUp ? 'Create Your Account' : 'Welcome Back!'}
          </h1>
          <p className="text-xs text-[#9E9EAA]">
            {isSignUp ? 'Join the luxury dining experience' : 'Log in to continue your delicious journey'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400 text-center">
            {error}
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {isSignUp && (
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-[#DFB76C] uppercase tracking-wider block">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9EAA]" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Elakiya R"
                  className="w-full bg-[#1b1b26] text-xs sm:text-sm text-[#FAF8F5] pl-10 pr-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-[#DFB76C]"
                />
              </div>
            </div>
          )}

          {/* Email Address */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-[#DFB76C] uppercase tracking-wider block">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9EAA]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="customer@foodyx.com"
                className="w-full bg-[#1b1b26] text-xs sm:text-sm text-[#FAF8F5] pl-10 pr-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-[#DFB76C]"
              />
            </div>
          </div>

          {/* Password with Eye Toggle */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-semibold text-[#DFB76C] uppercase tracking-wider block">
                Password
              </label>
              {!isSignUp && (
                <button
                  type="button"
                  onClick={() => alert('Password reset link sent to registered email.')}
                  className="text-[11px] text-[#DFB76C] hover:underline"
                >
                  Forgot Password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9EAA]" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#1b1b26] text-xs sm:text-sm text-[#FAF8F5] pl-10 pr-10 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-[#DFB76C]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9E9EAA] hover:text-[#FAF8F5]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Big Golden Login Button (Exact from UI mockup screen) */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 px-6 rounded-full font-bold text-sm text-[#0d0d12] gold-gradient-bg hover:opacity-95 shadow-xl shadow-[#DFB76C]/25 transition-all hover:scale-102 active:scale-98"
          >
            {loading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Login')}
          </button>
        </form>

        {/* "or continue with" Divider (Exact from Mockup) */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <span className="relative bg-[#13131b] px-3 text-[11px] text-[#9E9EAA]">
            or continue with
          </span>
        </div>

        {/* Social Icons: Google, Apple, Key (Exact from Mockup) */}
        <div className="flex items-center justify-center gap-4">
          <button 
            onClick={() => handleDemoSelect('customer', 'customer@foodyx.com')}
            title="Sign in with Google"
            className="w-11 h-11 rounded-full bg-[#1b1b26] border border-white/10 hover:border-[#DFB76C]/40 flex items-center justify-center text-[#FAF8F5] hover:scale-110 transition-transform"
          >
            <span className="font-bold text-sm text-red-400">G</span>
          </button>
          
          <button 
            onClick={() => handleDemoSelect('customer', 'customer@foodyx.com')}
            title="Sign in with Apple"
            className="w-11 h-11 rounded-full bg-[#1b1b26] border border-white/10 hover:border-[#DFB76C]/40 flex items-center justify-center text-[#FAF8F5] hover:scale-110 transition-transform"
          >
            <span className="font-bold text-sm">🍎</span>
          </button>

          <button 
            onClick={() => handleDemoSelect('admin', 'admin@foodyx.com')}
            title="One-Touch Passkey Login"
            className="w-11 h-11 rounded-full bg-[#1b1b26] border border-white/10 hover:border-[#DFB76C]/40 flex items-center justify-center text-[#DFB76C] hover:scale-110 transition-transform"
          >
            <ShieldCheck className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Demo Role Logins for Testing */}
        <div className="mt-6 pt-4 border-t border-white/5 space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9EAA] block text-center">
            Instant Demo Logins (Click to Test)
          </span>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <button
              onClick={() => handleDemoSelect('customer', 'customer@foodyx.com')}
              className="p-2 rounded-xl bg-[#1b1b26] text-[#FAF8F5] hover:bg-[#252536] border border-white/5 font-medium"
            >
              👤 Customer (Elakiya)
            </button>
            <button
              onClick={() => handleDemoSelect('restaurant_owner', 'owner@foodyx.com')}
              className="p-2 rounded-xl bg-[#1b1b26] text-[#FAF8F5] hover:bg-[#252536] border border-white/5 font-medium"
            >
              🍳 Restaurant Owner
            </button>
            <button
              onClick={() => handleDemoSelect('delivery_partner', 'delivery@foodyx.com')}
              className="p-2 rounded-xl bg-[#1b1b26] text-[#FAF8F5] hover:bg-[#252536] border border-white/5 font-medium"
            >
              🛵 Delivery Partner
            </button>
            <button
              onClick={() => handleDemoSelect('admin', 'admin@foodyx.com')}
              className="p-2 rounded-xl bg-[#1b1b26] text-[#FAF8F5] hover:bg-[#252536] border border-white/5 font-medium"
            >
              🛡️ Admin Operator
            </button>
          </div>
        </div>

        {/* Toggle Sign Up / Log In */}
        <div className="mt-6 text-center text-xs text-[#9E9EAA]">
          {isSignUp ? (
            <span>Already have an account?{' '}
              <button onClick={() => setIsSignUp(false)} className="text-[#DFB76C] font-bold hover:underline">
                Login
              </button>
            </span>
          ) : (
            <span>Don't have an account?{' '}
              <button onClick={() => setIsSignUp(true)} className="text-[#DFB76C] font-bold hover:underline">
                Sign Up
              </button>
            </span>
          )}
        </div>

      </div>

    </div>
  );
};
