import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { FloatingTrackerBar } from './components/FloatingTrackerBar';
import { useCart } from './context/CartContext';

// Pages
import { HomePage } from './pages/HomePage';
import { RestaurantsPage } from './pages/RestaurantsPage';
import { RestaurantDetailPage } from './pages/RestaurantDetailPage';
import { PaymentPage } from './pages/PaymentPage';
import { PaymentStatusPage } from './pages/PaymentStatusPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { OrdersPage } from './pages/OrdersPage';
import { AuthPage } from './pages/AuthPage';
import { DashboardsPage } from './pages/DashboardsPage';

export const App = () => {
  const { toastMessage } = useCart();

  return (
    <div className="min-h-screen bg-[#0b0b0e] text-[#FAF8F5] flex flex-col font-sans selection:bg-[#DFB76C]/30 selection:text-[#DFB76C]">
      
      {/* Top Navbar */}
      <Navbar />

      {/* Main Routed Content */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/restaurants" element={<RestaurantsPage />} />
          <Route path="/restaurants/:id" element={<RestaurantDetailPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment-status" element={<PaymentStatusPage />} />
          <Route path="/track" element={<TrackOrderPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboards" element={<DashboardsPage />} />
        </Routes>
      </div>

      {/* Slide-in Cart Drawer (Desktop & Mobile) */}
      <CartDrawer />

      {/* Floating Active Order Tracker Pill (FR-H6) */}
      <FloatingTrackerBar />

      {/* Mobile Bottom Navigation (< 640px) */}
      <MobileBottomNav />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#161622]/95 border border-[#DFB76C]/50 px-5 py-2.5 rounded-full shadow-2xl text-xs font-bold text-[#DFB76C] animate-in fade-in slide-in-from-top-2 duration-200">
          {toastMessage}
        </div>
      )}

      {/* Luxury Footer */}
      <Footer />

    </div>
  );
};
