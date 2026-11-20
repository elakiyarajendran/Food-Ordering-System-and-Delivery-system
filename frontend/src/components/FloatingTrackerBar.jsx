import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bike, ChevronRight, Sparkles } from 'lucide-react';

export const FloatingTrackerBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // If already on tracking page, don't show
  if (location.pathname === '/track') return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 max-w-md w-[92%] sm:w-auto">
      <div 
        onClick={() => navigate('/track')}
        className="cursor-pointer group flex items-center justify-between gap-4 px-5 py-3 rounded-full bg-[#161622]/95 backdrop-blur-xl border border-[#DFB76C]/40 shadow-2xl shadow-[#DFB76C]/20 hover:scale-[1.02] active:scale-98 transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#DFB76C] to-[#FFE29E] text-[#0d0d12] flex items-center justify-center shadow">
            <Bike className="w-4 h-4 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <p className="text-xs font-bold text-[#FAF8F5]">Order #FDX-7429 is on the way</p>
            </div>
            <p className="text-[10px] text-[#DFB76C] font-semibold">Ravi Kumar delivering · 20 mins ETA</p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs font-bold text-[#DFB76C] pl-2 border-l border-white/10 group-hover:translate-x-1 transition-transform">
          <span>Track</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
