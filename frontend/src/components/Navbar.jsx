import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, Search, Bell, User, ChevronDown, 
  Sparkles, CheckCircle2, Shield, UtensilsCrossed, 
  Bike, LogOut, Menu, X 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export const FoodyxLogo = ({ size = 'md' }) => {
  const isLg = size === 'lg';
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      {/* Golden Cloche Icon */}
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-[#F5C97A] via-[#DFB76C] to-[#B98E3B] p-2 shadow-lg shadow-[#DFB76C]/20 transition-transform duration-300 group-hover:scale-105 ${isLg ? 'w-12 h-12' : 'w-9 h-9'}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className={`text-[#0c0c10] ${isLg ? 'w-7 h-7' : 'w-5 h-5'}`}>
          {/* Elegant Cloche SVG */}
          <path d="M12 4a2 2 0 0 0-2 2c0 .35.09.68.25.96A9 9 0 0 0 3 15v1h18v-1a9 9 0 0 0-7.25-8.04A2 2 0 0 0 12 4Zm-8 13v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1H4Z" />
        </svg>
        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#FFE29E] animate-ping" />
      </div>
      <div className="flex flex-col">
        <span className={`font-brand font-bold tracking-wider text-[#FAF8F5] ${isLg ? 'text-2xl' : 'text-xl'}`}>
          Food<span className="text-[#DFB76C]">yx</span>
        </span>
      </div>
    </Link>
  );
};

export const Navbar = () => {
  const { totalItemCount, setIsDrawerOpen } = useCart();
  const { user, logout, switchDemoRole } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/restaurants?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Restaurants', path: '/restaurants' },
    { label: 'Track Order', path: '/track' },
    { label: 'Offers', path: '/restaurants?offer=true' },
    { label: 'Dashboards', path: '/dashboards' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0b0b0e]/90 border-b border-[#DFB76C]/15 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <FoodyxLogo />
          
          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`text-sm font-medium transition-all duration-200 relative py-1 ${
                    isActive 
                      ? 'text-[#DFB76C] font-semibold' 
                      : 'text-[#E2E2E6]/80 hover:text-[#DFB76C]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#DFB76C] to-transparent rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Search Bar - Center */}
        <form 
          onSubmit={handleSearchSubmit} 
          className="hidden md:flex items-center flex-1 max-w-md mx-4 relative"
        >
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9EAA]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for food, cuisines, dishes..."
              className="w-full bg-[#16161f] text-[#FAF8F5] text-sm pl-10 pr-4 py-2.5 rounded-full border border-[#2a2a35] focus:outline-none focus:border-[#DFB76C]/60 focus:ring-1 focus:ring-[#DFB76C]/40 transition-all placeholder:text-[#9E9EAA]/60"
            />
          </div>
        </form>

        {/* Right Actions: Cart, User Avatar, Mobile Toggle */}
        <div className="flex items-center gap-3">
          
          {/* Notification Bell (from Mobile Mockup) */}
          <button 
            onClick={() => navigate('/track')} 
            title="Active Notifications"
            className="hidden sm:flex relative p-2.5 rounded-full bg-[#16161f] text-[#DFB76C] hover:bg-[#20202c] border border-[#2a2a35] transition-all"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#DFB76C]" />
          </button>

          {/* Cart Trigger Button */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="relative flex items-center justify-center p-2.5 rounded-full bg-[#16161f] text-[#DFB76C] hover:bg-[#222230] border border-[#DFB76C]/30 shadow-md transition-all group"
            title="Open Cart"
          >
            <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {totalItemCount > 0 && (
              <span className="absolute -top-1 -right-1.5 min-w-[20px] h-[20px] px-1 rounded-full bg-gradient-to-r from-[#F3CA7E] to-[#DFB76C] text-[#0d0d12] text-xs font-bold flex items-center justify-center shadow-lg animate-bounce">
                {totalItemCount}
              </span>
            )}
          </button>

          {/* User Profile Avatar with Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full bg-[#16161f] border border-[#2a2a35] hover:border-[#DFB76C]/50 transition-all"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#DFB76C] to-[#F7D592] text-[#0d0d12] font-bold text-sm flex items-center justify-center shadow">
                {user ? (user.first_name ? user.first_name[0] : 'E') : 'G'}
              </div>
              <span className="hidden sm:inline text-xs font-medium text-[#E2E2E6] max-w-[90px] truncate">
                {user ? user.first_name || user.username : 'Account'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#9E9EAA]" />
            </button>

            {/* Dropdown Menu */}
            {isUserMenuOpen && (
              <div 
                className="absolute right-0 mt-3 w-72 rounded-2xl bg-[#14141c] border border-[#DFB76C]/25 shadow-2xl p-3 z-50 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150"
                onClick={() => setIsUserMenuOpen(false)}
              >
                {/* User Card */}
                <div className="p-3 bg-[#1d1d28] rounded-xl border border-white/5 mb-2">
                  <p className="text-sm font-bold text-[#FAF8F5]">
                    {user ? `${user.first_name} ${user.last_name || ''}` : 'Guest User'}
                  </p>
                  <p className="text-xs text-[#9E9EAA] truncate">{user?.email || 'guest@foodyx.com'}</p>
                  <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#DFB76C]/15 text-[#DFB76C] capitalize border border-[#DFB76C]/30">
                    Role: {user?.role ? user.role.replace('_', ' ') : 'Customer'}
                  </div>
                </div>

                {/* Role Switcher for SRS / Reviewer Evaluation */}
                <div className="px-2 py-1.5 text-[11px] font-semibold tracking-wider text-[#9E9EAA] uppercase">
                  Switch Demo Role
                </div>
                <div className="grid grid-cols-2 gap-1.5 mb-2">
                  {[
                    { key: 'customer', label: 'Customer', icon: User },
                    { key: 'restaurant_owner', label: 'Owner', icon: UtensilsCrossed },
                    { key: 'delivery_partner', label: 'Delivery', icon: Bike },
                    { key: 'admin', label: 'Admin', icon: Shield },
                  ].map(r => (
                    <button
                      key={r.key}
                      onClick={() => switchDemoRole(r.key)}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-left transition-all ${
                        user?.role === r.key 
                          ? 'bg-[#DFB76C] text-[#0d0d12] font-semibold' 
                          : 'bg-[#1b1b26] text-[#E2E2E6] hover:bg-[#252536]'
                      }`}
                    >
                      <r.icon className="w-3.5 h-3.5" />
                      {r.label}
                    </button>
                  ))}
                </div>

                <div className="border-t border-[#2a2a35] my-1" />

                <Link to="/orders" className="flex items-center gap-2 px-3 py-2 text-xs text-[#E2E2E6] hover:bg-[#1f1f2d] rounded-lg">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#DFB76C]" /> Order History
                </Link>
                <Link to="/dashboards" className="flex items-center gap-2 px-3 py-2 text-xs text-[#E2E2E6] hover:bg-[#1f1f2d] rounded-lg">
                  <Sparkles className="w-3.5 h-3.5 text-[#DFB76C]" /> Partner Dashboards
                </Link>
                <Link to="/auth" className="flex items-center gap-2 px-3 py-2 text-xs text-[#E2E2E6] hover:bg-[#1f1f2d] rounded-lg">
                  <User className="w-3.5 h-3.5 text-[#DFB76C]" /> Login / Register
                </Link>
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-left"
                >
                  <LogOut className="w-3.5 h-3.5" /> Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#E2E2E6] hover:text-[#DFB76C] transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#101017] border-b border-[#2a2a35] px-4 pt-2 pb-6 space-y-3 animate-in fade-in duration-200">
          <form onSubmit={handleSearchSubmit} className="relative mt-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9EAA]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for food..."
              className="w-full bg-[#181824] text-sm text-[#FAF8F5] pl-9 pr-4 py-2.5 rounded-xl border border-[#2a2a35]"
            />
          </form>
          <div className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm text-[#FAF8F5] hover:bg-[#1c1c28] hover:text-[#DFB76C]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
