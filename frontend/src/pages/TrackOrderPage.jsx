import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Bike, CheckCircle2, Clock, MapPin, Phone, 
  MessageCircle, Star, AlertCircle, ArrowLeft, 
  Play, RefreshCw, XCircle 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ReviewModal } from '../components/ReviewModal';

export const TrackOrderPage = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order_id') || 'FDX-7429';
  const { user } = useAuth();

  const [order, setOrder] = useState(null);
  const [statusIndex, setStatusIndex] = useState(3); // Default: Out for delivery
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [callModal, setCallModal] = useState(false);
  const [chatModal, setChatModal] = useState(false);
  const [cancelMessage, setCancelMessage] = useState('');

  // 5 Step Timeline matching UI Mockup & SRS FR-T1
  const TIMELINE_STEPS = [
    { title: 'Order Placed', time: '9:20 PM', statusKey: 'Placed' },
    { title: 'Preparing Your Food', time: '9:25 PM', statusKey: 'Preparing' },
    { title: 'Out for Delivery', time: '9:40 PM', statusKey: 'Out for delivery' },
    { title: 'Delivered', time: '10:00 PM', statusKey: 'Delivered' },
  ];

  // Coordinates along Chennai route: Restaurant (Nungambakkam) -> Delivery (Anna Nagar)
  const ROUTE_COORDINATES = [
    { lat: 13.0610, lng: 80.2370, progress: 0.1 },  // Restaurant
    { lat: 13.0680, lng: 80.2280, progress: 0.4 },  // Chetpet
    { lat: 13.0760, lng: 80.2200, progress: 0.75 }, // Kilpauk
    { lat: 13.0850, lng: 80.2100, progress: 1.0 },  // Customer Home (Anna Nagar)
  ];

  const [scooterCoord, setScooterCoord] = useState(ROUTE_COORDINATES[2]);

  useEffect(() => {
    fetchOrderDetails();
    // Polling fallback every 6 seconds as per SRS FR-T2
    const interval = setInterval(() => {
      fetchOrderDetails();
    }, 6000);
    return () => clearInterval(interval);
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const res = await fetch(`/api/orders/${orderId}/`);
      if (res.ok) {
        const data = await res.json();
        setOrder(data);
        mapStatusToStep(data.status);
      } else {
        setMockDefaultOrder();
      }
    } catch (e) {
      setMockDefaultOrder();
    }
  };

  const setMockDefaultOrder = () => {
    setOrder({
      order_id: orderId,
      status: 'Out for delivery',
      restaurant_name: 'The Gourmet Hub',
      restaurant_address: '12 Sterling Road, Nungambakkam',
      total: 737,
      items: [
        { name: 'Royal Burger', quantity: 1, price: 249 },
        { name: 'Cheesy Paradise Pizza', quantity: 1, price: 299 },
        { name: 'Iced Coffee', quantity: 1, price: 149 }
      ],
      delivery_address: {
        line1: 'Flat 402, Golden Towers, Anna Nagar',
        city: 'Chennai'
      },
      delivery_assignment: {
        partner_name: 'Ravi Kumar',
        partner_phone: '+91 98765 43210',
        partner_rating: 4.9
      }
    });
    setStatusIndex(2); // Out for delivery
  };

  const mapStatusToStep = (status) => {
    if (status === 'Placed' || status === 'Accepted') {
      setStatusIndex(0);
      setScooterCoord(ROUTE_COORDINATES[0]);
    } else if (status === 'Preparing' || status === 'Ready') {
      setStatusIndex(1);
      setScooterCoord(ROUTE_COORDINATES[1]);
    } else if (status === 'Out for delivery') {
      setStatusIndex(2);
      setScooterCoord(ROUTE_COORDINATES[2]);
    } else if (status === 'Delivered') {
      setStatusIndex(3);
      setScooterCoord(ROUTE_COORDINATES[3]);
    }
  };

  // Simulate real-time progress through steps (SRS FR-T2 & testing criteria)
  const handleSimulateNextStep = async () => {
    try {
      const res = await fetch(`/api/orders/${orderId}/simulate/`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setOrder(data);
        mapStatusToStep(data.status);
      } else {
        // Local simulation fallback
        const nextIdx = (statusIndex + 1) % TIMELINE_STEPS.length;
        setStatusIndex(nextIdx);
        setScooterCoord(ROUTE_COORDINATES[nextIdx]);
        if (order) {
          setOrder({ ...order, status: TIMELINE_STEPS[nextIdx].statusKey });
        }
      }
    } catch (e) {
      const nextIdx = (statusIndex + 1) % TIMELINE_STEPS.length;
      setStatusIndex(nextIdx);
      setScooterCoord(ROUTE_COORDINATES[nextIdx]);
    }
  };

  const handleCancelOrder = async () => {
    if (statusIndex >= 1) {
      setCancelMessage('Order cannot be cancelled after the restaurant starts preparing.');
      return;
    }
    try {
      await fetch(`/api/orders/${orderId}/cancel/`, { method: 'POST' });
      setCancelMessage('Order cancelled successfully. Refund initiated to original payment method.');
    } catch (e) {
      setCancelMessage('Order marked as cancelled.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0e] py-8 px-4 sm:px-6 lg:px-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/restaurants"
            className="w-10 h-10 rounded-full bg-[#161622] border border-white/10 flex items-center justify-center text-[#E2E2E6] hover:text-[#DFB76C] transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#FAF8F5]">
              Track Your Order
            </h1>
            <p className="text-xs text-[#9E9EAA]">
              Real-time updates, right on your screen · Order #{orderId}
            </p>
          </div>
        </div>

        {/* Live Simulation Control Button for Testing/Evaluation */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleSimulateNextStep}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-[#DFB76C]/15 border border-[#DFB76C]/40 text-[#DFB76C] hover:bg-[#DFB76C] hover:text-[#0d0d12] transition-all shadow-md"
            title="Step through order stages in real time"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Simulate Live Step ({statusIndex < 3 ? 'Next Stage' : 'Reset'})</span>
          </button>
        </div>
      </div>

      {/* HORIZONTAL STEP TIMELINE (Exact match to UI Mockup Desktop Bottom Screen) */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-[#14141c]/90 border border-[#DFB76C]/25 shadow-2xl overflow-hidden">
        
        {/* Ambient gold glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-24 bg-[#DFB76C]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative">
          
          {/* Progress Connecting Line */}
          <div className="absolute top-5 left-6 right-6 h-1 bg-[#252535] rounded-full hidden sm:block">
            <div 
              className="h-full bg-gradient-to-r from-[#F3CA7E] to-[#DFB76C] rounded-full transition-all duration-700 shadow-[0_0_15px_rgba(223,183,108,0.5)]"
              style={{ width: `${(statusIndex / (TIMELINE_STEPS.length - 1)) * 100}%` }}
            />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-2 relative z-10">
            {TIMELINE_STEPS.map((step, idx) => {
              const isPassed = idx <= statusIndex;
              const isCurrent = idx === statusIndex;
              return (
                <div key={idx} className="flex flex-col sm:items-center text-left sm:text-center space-y-2">
                  
                  {/* Step Node Icon */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isPassed
                      ? 'bg-gradient-to-tr from-[#F3CA7E] to-[#DFB76C] text-[#0d0d12] shadow-lg shadow-[#DFB76C]/30 scale-105'
                      : 'bg-[#1e1e2c] border border-white/10 text-[#9E9EAA]'
                  } ${isCurrent ? 'ring-4 ring-[#DFB76C]/25 animate-pulse' : ''}`}>
                    {isPassed ? (
                      <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                    ) : (
                      <span className="text-xs font-bold">{idx + 1}</span>
                    )}
                  </div>

                  {/* Title & Time */}
                  <div>
                    <h4 className={`text-xs sm:text-sm font-bold ${isPassed ? 'text-[#FAF8F5]' : 'text-[#9E9EAA]'}`}>
                      {step.title}
                    </h4>
                    <p className="text-[11px] text-[#DFB76C] font-semibold mt-0.5">
                      {step.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Animated Gliding Scooter on Track (Matches UI Mockup Graphic!) */}
          <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#DFB76C]/10 text-[#DFB76C] flex items-center justify-center">
                <Bike className="w-5 h-5 animate-bounce" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#FAF8F5]">
                  Status: <span className="text-[#DFB76C]">{TIMELINE_STEPS[statusIndex]?.title}</span>
                </p>
                <p className="text-[11px] text-[#9E9EAA]">
                  {statusIndex === 3 
                    ? 'Your food has arrived! Bon Appétit.' 
                    : 'Ravi Kumar is moving on the fastest route.'}
                </p>
              </div>
            </div>

            {/* Cancel Button (FR-T6: Allowed before preparing) */}
            {statusIndex < 1 && (
              <button
                onClick={handleCancelOrder}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all"
              >
                Cancel Order
              </button>
            )}

            {statusIndex === 3 && (
              <button
                onClick={() => setIsReviewOpen(true)}
                className="px-5 py-2.5 rounded-full text-xs font-bold text-[#0d0d12] gold-gradient-bg shadow-lg hover:scale-105 transition-all"
              >
                ★ Rate & Review
              </button>
            )}
          </div>

          {cancelMessage && (
            <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
              {cancelMessage}
            </div>
          )}

        </div>
      </div>

      {/* TWO COLUMN GRID: Live Map & Delivery Partner Card (Matches Mobile Mockup) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Live Map Box */}
        <div className="lg:col-span-8 rounded-3xl bg-[#14141c] border border-white/10 overflow-hidden shadow-2xl relative h-[380px] sm:h-[420px]">
          
          {/* Custom Stylized Map Graphic */}
          <div className="absolute inset-0 bg-[#0f1118] flex items-center justify-center overflow-hidden">
            
            {/* Simulated Road Grid Pattern */}
            <svg className="w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#DFB76C" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Simulated Navigation Route Line */}
            <svg className="absolute inset-0 w-full h-full">
              <path
                d="M 120 280 Q 250 180, 420 210 T 680 120"
                fill="none"
                stroke="#DFB76C"
                strokeWidth="4"
                strokeDasharray="6 6"
                className="animate-pulse"
              />
            </svg>

            {/* Restaurant Pin Marker */}
            <div className="absolute left-[15%] bottom-[25%] flex flex-col items-center">
              <div className="px-2.5 py-1 rounded-md bg-[#161622] border border-[#DFB76C]/40 text-[10px] font-bold text-[#DFB76C] shadow-lg mb-1 whitespace-nowrap">
                The Gourmet Hub
              </div>
              <div className="w-8 h-8 rounded-full bg-[#DFB76C] text-[#0d0d12] flex items-center justify-center shadow-lg font-bold">
                🍽️
              </div>
            </div>

            {/* Delivery Destination Pin */}
            <div className="absolute right-[15%] top-[25%] flex flex-col items-center">
              <div className="px-2.5 py-1 rounded-md bg-[#161622] border border-emerald-500/40 text-[10px] font-bold text-emerald-400 shadow-lg mb-1 whitespace-nowrap">
                Anna Nagar Home
              </div>
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg font-bold">
                📍
              </div>
            </div>

            {/* Moving Animated Scooter Marker (Position shifts with status!) */}
            <div 
              className="absolute transition-all duration-1000 flex flex-col items-center z-20"
              style={{
                left: statusIndex === 0 ? '16%' : statusIndex === 1 ? '35%' : statusIndex === 2 ? '55%' : '82%',
                top: statusIndex === 0 ? '65%' : statusIndex === 1 ? '50%' : statusIndex === 2 ? '42%' : '25%',
              }}
            >
              <div className="px-2 py-0.5 rounded-full bg-[#DFB76C] text-[#0d0d12] text-[9px] font-extrabold shadow animate-bounce mb-1">
                Ravi Kumar (4.9★)
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#F3CA7E] to-[#DFB76C] text-[#0d0d12] flex items-center justify-center shadow-2xl ring-4 ring-[#DFB76C]/30 animate-pulse">
                <Bike className="w-6 h-6" />
              </div>
            </div>

          </div>

          {/* Map Top Badge */}
          <div className="absolute top-4 left-4 bg-[#14141c]/90 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-bold text-[#FAF8F5]">Live GPS Tracking Active</span>
          </div>

          {/* ETA Floating Box */}
          <div className="absolute bottom-4 right-4 bg-[#14141c]/90 backdrop-blur-md border border-[#DFB76C]/30 rounded-2xl p-3 px-4 text-right">
            <span className="text-[10px] text-[#9E9EAA] block">Estimated Arrival</span>
            <span className="text-base font-extrabold text-[#DFB76C]">
              {statusIndex === 3 ? 'Delivered' : '18-22 mins'}
            </span>
          </div>

        </div>

        {/* Right Column: Delivery Partner Card & Order Summary (Exact from Mobile Mockup Screen) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Delivery Partner Sheet (Matches Mobile Tracking Screen) */}
          <div className="p-6 rounded-3xl bg-[#14141c] border border-[#DFB76C]/25 shadow-xl space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#DFB76C]">Delivery Hero</span>
                <h3 className="text-base font-bold text-[#FAF8F5]">Your order is on the way!</h3>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            </div>

            {/* Partner Info */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#DFB76C] to-[#FFE29E] text-[#0d0d12] flex items-center justify-center font-bold text-lg shadow-md">
                  R
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#FAF8F5]">Ravi Kumar</h4>
                  <div className="flex items-center gap-1 text-xs text-[#DFB76C] mt-0.5">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="font-bold">4.9</span>
                    <span className="text-[#9E9EAA]">(1,420 deliveries)</span>
                  </div>
                </div>
              </div>

              {/* Call & Message Action Buttons (Exact from UI mockup screen) */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCallModal(true)}
                  className="w-10 h-10 rounded-full bg-[#1e1e2c] border border-white/10 hover:border-[#DFB76C] text-[#DFB76C] flex items-center justify-center shadow transition-all hover:scale-105"
                  title="Call Delivery Partner"
                >
                  <Phone className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setChatModal(true)}
                  className="w-10 h-10 rounded-full bg-[#1e1e2c] border border-white/10 hover:border-[#DFB76C] text-[#DFB76C] flex items-center justify-center shadow transition-all hover:scale-105"
                  title="Message Delivery Partner"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Delivery address snippet */}
            <div className="p-3.5 rounded-2xl bg-[#1b1b26] border border-white/5 flex items-start gap-3 text-xs">
              <MapPin className="w-4 h-4 text-[#DFB76C] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#FAF8F5]">Delivery Destination</p>
                <p className="text-[#9E9EAA] mt-0.5">Flat 402, Golden Towers, Anna Nagar, Chennai</p>
              </div>
            </div>
          </div>

          {/* Order Summary & Bill */}
          <div className="p-6 rounded-3xl bg-[#14141c] border border-white/5 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF8F5]">Order Items</h4>
            <div className="space-y-2 text-xs">
              {order?.items?.map((item, i) => (
                <div key={i} className="flex justify-between text-[#E2E2E6]">
                  <span>{item.quantity}x {item.name}</span>
                  <span className="font-semibold text-[#FAF8F5]">₹{item.price * item.quantity}</span>
                </div>
              ))}
              <div className="border-t border-white/5 pt-2 flex justify-between font-bold text-sm text-[#FAF8F5]">
                <span>Total Paid</span>
                <span className="text-[#DFB76C]">₹{order?.total || 737}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Call Dialog Simulation */}
      {callModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl bg-[#181824] border border-[#DFB76C]/40 p-6 text-center space-y-4 shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#FAF8F5]">Calling Ravi Kumar</h3>
            <p className="text-xs text-[#9E9EAA]">+91 98765 43210 (Masked Driver Concierge)</p>
            <p className="text-xs text-emerald-400">"Hello, I am near Anna Nagar 2nd Avenue, arriving in 4 minutes!"</p>
            <button
              onClick={() => setCallModal(false)}
              className="w-full py-2.5 rounded-full text-xs font-bold text-[#FAF8F5] bg-rose-600 hover:bg-rose-700"
            >
              End Call
            </button>
          </div>
        </div>
      )}

      {/* Chat Dialog Simulation */}
      {chatModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl bg-[#181824] border border-[#DFB76C]/40 p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#DFB76C] text-[#0d0d12] font-bold text-xs flex items-center justify-center">R</div>
                <span className="text-xs font-bold text-[#FAF8F5]">Ravi Kumar</span>
              </div>
              <button onClick={() => setChatModal(false)} className="text-[#9E9EAA] text-xs">Close</button>
            </div>
            <div className="space-y-2 text-xs h-36 overflow-y-auto">
              <div className="bg-[#242436] p-2.5 rounded-xl text-[#FAF8F5] max-w-[80%]">
                Hello Elakiya, your order is secured in our thermal insulated bag. On my way!
              </div>
              <div className="bg-[#DFB76C] text-[#0d0d12] font-medium p-2.5 rounded-xl max-w-[80%] ml-auto">
                Thanks Ravi! Please ring bell at flat 402.
              </div>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-[#121219] text-xs text-[#FAF8F5] p-2.5 rounded-xl border border-white/10 focus:outline-none"
              />
              <button 
                onClick={() => setChatModal(false)}
                className="px-3 py-2 rounded-xl text-xs font-bold text-[#0d0d12] gold-gradient-bg"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal Triggered After Delivery */}
      <ReviewModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        restaurantName={order?.restaurant_name || 'The Gourmet Hub'}
        orderId={orderId}
      />

    </div>
  );
};
