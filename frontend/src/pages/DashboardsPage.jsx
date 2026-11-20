import React, { useState } from 'react';
import { 
  UtensilsCrossed, Bike, Shield, CheckCircle2, 
  XCircle, Clock, TrendingUp, AlertTriangle, 
  ToggleLeft, ToggleRight, DollarSign, Users, Award 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const DashboardsPage = () => {
  const { user, switchDemoRole } = useAuth();
  const [activeTab, setActiveTab] = useState(user?.role || 'restaurant_owner');

  // Sample dynamic dashboard data
  const [restaurantOrders, setRestaurantOrders] = useState([
    {
      id: 'FDX-7429',
      customer: 'Elakiya R',
      items: '1x Royal Burger, 1x Cheesy Paradise Pizza, 1x Iced Coffee',
      total: 737,
      status: 'Preparing',
      time: '5 mins ago'
    },
    {
      id: 'FDX-9824',
      customer: 'Karthik V',
      items: '2x Truffle Fries Supreme, 1x Creamy Alfredo Pasta',
      total: 657,
      status: 'Placed',
      time: 'Just now'
    }
  ]);

  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Cheesy Paradise Pizza', price: 299, available: true, category: 'Pizzas' },
    { id: 2, name: 'Royal Burger', price: 249, available: true, category: 'Burgers' },
    { id: 3, name: 'Creamy Alfredo Pasta', price: 279, available: true, category: 'Pastas' },
    { id: 4, name: 'Spicy Dragon Bowl', price: 319, available: false, category: 'Mains' },
  ]);

  const [deliveryTasks, setDeliveryTasks] = useState([
    {
      id: 'FDX-7429',
      pickup: 'The Gourmet Hub, Nungambakkam',
      dropoff: 'Flat 402, Golden Towers, Anna Nagar',
      customerName: 'Elakiya R',
      amount: 737,
      status: 'Out for delivery'
    }
  ]);

  const updateOrderStatus = (orderId, newStatus) => {
    setRestaurantOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    // also notify backend
    fetch(`/api/orders/${orderId}/simulate/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    }).catch(() => {});
  };

  const toggleItemAvailability = (id) => {
    setMenuItems(prev => prev.map(m => m.id === id ? { ...m, available: !m.available } : m));
  };

  const updateDeliveryStatus = (taskId, newStatus) => {
    setDeliveryTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    fetch(`/api/orders/${taskId}/simulate/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    }).catch(() => {});
  };

  return (
    <div className="min-h-screen bg-[#0b0b0e] py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Top Header & Role Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#DFB76C]">
            SRS Module 4.9 · Partner Portals
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#FAF8F5]">
            Operational Dashboards
          </h1>
          <p className="text-xs text-[#9E9EAA]">
            Live order processing, partner dispatch, and platform analytics
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-[#14141c] rounded-2xl border border-white/10">
          {[
            { key: 'restaurant_owner', label: 'Restaurant Owner', icon: UtensilsCrossed },
            { key: 'delivery_partner', label: 'Delivery Partner', icon: Bike },
            { key: 'admin', label: 'Admin Platform', icon: Shield },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                switchDemoRole(tab.key);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.key
                  ? 'bg-[#DFB76C] text-[#0d0d12] shadow-md'
                  : 'text-[#9E9EAA] hover:text-[#FAF8F5]'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 1. RESTAURANT OWNER PORTAL (FR-M1 & FR-M2) */}
      {activeTab === 'restaurant_owner' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Incoming Orders Box with Alert */}
          <div className="p-6 rounded-3xl bg-[#14141c] border border-[#DFB76C]/30 shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#DFB76C]/10 text-[#DFB76C] flex items-center justify-center">
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#FAF8F5]">Live Kitchen Display (KDS)</h3>
                  <p className="text-xs text-[#9E9EAA]">Accept, prepare, and mark orders ready for pickup</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Kitchen Online</span>
              </div>
            </div>

            {/* Orders Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {restaurantOrders.map((ord) => (
                <div key={ord.id} className="p-5 rounded-2xl bg-[#1a1a26] border border-white/5 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs font-bold text-[#DFB76C]">#{ord.id}</span>
                    <span className="text-[11px] text-[#9E9EAA]">{ord.time}</span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-[#FAF8F5]">{ord.customer}</h4>
                    <p className="text-xs text-[#E2E2E6] mt-1">{ord.items}</p>
                    <p className="text-xs font-bold text-[#DFB76C] mt-2">Amount: ₹{ord.total}</p>
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    {ord.status === 'Placed' && (
                      <>
                        <button
                          onClick={() => updateOrderStatus(ord.id, 'Preparing')}
                          className="flex-1 py-2 rounded-xl text-xs font-bold text-[#0d0d12] bg-[#DFB76C] hover:bg-[#FFE29E]"
                        >
                          Accept & Prepare
                        </button>
                        <button
                          onClick={() => updateOrderStatus(ord.id, 'Cancelled')}
                          className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20"
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {ord.status === 'Preparing' && (
                      <button
                        onClick={() => updateOrderStatus(ord.id, 'Ready')}
                        className="w-full py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500"
                      >
                        Mark Ready For Pickup
                      </button>
                    )}

                    {ord.status === 'Ready' && (
                      <span className="w-full text-center py-2 rounded-xl text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20">
                        Waiting for Delivery Partner
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Menu Management (FR-M1) */}
          <div className="p-6 rounded-3xl bg-[#14141c] border border-white/5 space-y-4">
            <h3 className="text-base font-bold text-[#FAF8F5]">Menu Item Stock & Availability</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {menuItems.map(item => (
                <div key={item.id} className="p-4 rounded-2xl bg-[#181824] border border-white/5 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#FAF8F5]">{item.name}</h4>
                    <span className="text-xs font-semibold text-[#DFB76C]">₹{item.price}</span>
                  </div>
                  <button
                    onClick={() => toggleItemAvailability(item.id)}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold border transition-colors ${
                      item.available
                        ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400'
                        : 'bg-rose-950/60 border-rose-500/40 text-rose-400'
                    }`}
                  >
                    {item.available ? 'In Stock' : 'Out of Stock'}
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* 2. DELIVERY PARTNER PORTAL (FR-M3) */}
      {activeTab === 'delivery_partner' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-6 rounded-3xl bg-[#14141c] border border-[#DFB76C]/30 shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#DFB76C]/10 text-[#DFB76C] flex items-center justify-center">
                  <Bike className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#FAF8F5]">Delivery Partner Taskboard</h3>
                  <p className="text-xs text-[#9E9EAA]">Welcome back, Ravi Kumar (4.9 Rating)</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                On Duty
              </span>
            </div>

            <div className="space-y-4">
              {deliveryTasks.map(task => (
                <div key={task.id} className="p-5 rounded-2xl bg-[#1b1b26] border border-white/5 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs font-bold text-[#DFB76C]">#{task.id}</span>
                    <span className="text-xs font-bold text-[#FAF8F5]">COD / Paid: ₹{task.amount}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-3 rounded-xl bg-[#14141d] border border-white/5">
                      <span className="text-[#9E9EAA] block">Pickup Location</span>
                      <span className="font-bold text-[#FAF8F5]">{task.pickup}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#14141d] border border-white/5">
                      <span className="text-[#9E9EAA] block">Dropoff Customer</span>
                      <span className="font-bold text-[#FAF8F5]">{task.customerName} - {task.dropoff}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => updateDeliveryStatus(task.id, 'Delivered')}
                      className="flex-1 py-3 rounded-full text-xs font-bold text-[#0d0d12] gold-gradient-bg shadow-md hover:scale-102 transition-all"
                    >
                      Mark Order Delivered ✓
                    </button>
                    <button
                      onClick={() => updateDeliveryStatus(task.id, 'Out for delivery')}
                      className="px-4 py-3 rounded-full text-xs font-semibold text-[#FAF8F5] bg-[#222232] border border-white/10"
                    >
                      Update Live GPS Ping
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. ADMIN PLATFORM OVERVIEW (FR-M4) */}
      {activeTab === 'admin' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Key Metric Tiles */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Platform GMV', value: '₹14,82,450', change: '+24.6% this week', icon: DollarSign },
              { label: 'Total Orders Completed', value: '4,289', change: '+18% today', icon: CheckCircle2 },
              { label: 'Active Restaurant Partners', value: '48', change: '4 pending approval', icon: UtensilsCrossed },
              { label: 'Avg Customer Rating', value: '4.82★', change: '99.4% on-time delivery', icon: Award },
            ].map((metric, i) => (
              <div key={i} className="p-5 rounded-2xl bg-[#14141c] border border-white/5 space-y-2">
                <div className="flex justify-between items-center text-[#9E9EAA]">
                  <span className="text-xs font-semibold">{metric.label}</span>
                  <metric.icon className="w-4 h-4 text-[#DFB76C]" />
                </div>
                <div className="text-xl font-extrabold text-[#FAF8F5]">{metric.value}</div>
                <div className="text-[11px] text-emerald-400">{metric.change}</div>
              </div>
            ))}
          </div>

          {/* Active Promo Codes Admin */}
          <div className="p-6 rounded-3xl bg-[#14141c] border border-white/5 space-y-4">
            <h3 className="text-base font-bold text-[#FAF8F5]">Coupon Code Configurations</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#181824] border border-[#DFB76C]/30 flex justify-between items-center">
                <div>
                  <span className="font-mono font-bold text-[#DFB76C] text-sm">FOOD50</span>
                  <p className="text-[#9E9EAA] mt-0.5">50% discount up to ₹150 for first-time orders</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-950/60 text-emerald-400 font-bold text-[10px]">Active</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#181824] border border-white/10 flex justify-between items-center">
                <div>
                  <span className="font-mono font-bold text-[#DFB76C] text-sm">TASTE20</span>
                  <p className="text-[#9E9EAA] mt-0.5">20% discount on gourmet meals above ₹299</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-950/60 text-emerald-400 font-bold text-[10px]">Active</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
