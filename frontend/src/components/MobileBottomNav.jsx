import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, ShoppingBag, Bike, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const MobileBottomNav = () => {
  const { totalItemCount, setIsDrawerOpen } = useCart();

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#101016]/95 backdrop-blur-xl border-t border-[#DFB76C]/15 py-2 px-4 shadow-[0_-10px_25px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-around">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[11px] font-medium transition-colors ${
              isActive ? 'text-[#DFB76C]' : 'text-[#9E9EAA] hover:text-[#FAF8F5]'
            }`
          }
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/restaurants"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[11px] font-medium transition-colors ${
              isActive ? 'text-[#DFB76C]' : 'text-[#9E9EAA] hover:text-[#FAF8F5]'
            }`
          }
        >
          <Search className="w-5 h-5" />
          <span>Search</span>
        </NavLink>

        <button
          onClick={() => setIsDrawerOpen(true)}
          className="relative flex flex-col items-center gap-1 text-[11px] font-medium text-[#9E9EAA] hover:text-[#DFB76C] transition-colors"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {totalItemCount > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-[#DFB76C] text-[#0d0d12] text-[10px] font-bold flex items-center justify-center">
                {totalItemCount}
              </span>
            )}
          </div>
          <span>Cart</span>
        </button>

        <NavLink
          to="/track"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[11px] font-medium transition-colors ${
              isActive ? 'text-[#DFB76C]' : 'text-[#9E9EAA] hover:text-[#FAF8F5]'
            }`
          }
        >
          <Bike className="w-5 h-5" />
          <span>Track</span>
        </NavLink>

        <NavLink
          to="/auth"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[11px] font-medium transition-colors ${
              isActive ? 'text-[#DFB76C]' : 'text-[#9E9EAA] hover:text-[#FAF8F5]'
            }`
          }
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </NavLink>
      </div>
    </div>
  );
};
