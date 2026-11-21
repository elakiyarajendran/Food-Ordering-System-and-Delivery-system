import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, Clock, CheckCircle2, ChevronRight, 
  RotateCcw, Star, Bike, ArrowLeft 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ReviewModal } from '../components/ReviewModal';
import { SafeImage } from '../components/SafeImage';

export const OrdersPage = () => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [selectedReviewOrder, setSelectedReviewOrder] = useState(null);

  const MOCK_ORDERS = [
    {
      id: 1,
      order_id: 'FDX-7429',
      restaurant_name: 'The Gourmet Hub',
      restaurant_address: '12 Sterling Road, Nungambakkam',
      created_at: '20 Nov 2026, 9:20 PM',
      status: 'Out for delivery',
      total: 737,
      items: [
        { name: 'Royal Burger', quantity: 1, price: 249, image: '/images/burger.svg' },
        { name: 'Cheesy Paradise Pizza', quantity: 1, price: 299, image: '/images/pizza.svg' },
        { name: 'Iced Coffee', quantity: 1, price: 149, image: '/images/coffee.svg' }
      ]
    },
    {
      id: 2,
      order_id: 'FDX-5120',
      restaurant_name: 'Pizza Palace',
      restaurant_address: '45 Khader Nawaz Khan Road',
      created_at: '18 Nov 2026, 8:15 PM',
      status: 'Delivered',
      total: 440,
      items: [
        { name: 'Margherita Di Bufala', quantity: 1, price: 320, image: '/images/pizza.svg' },
        { name: 'Garlic Butter Sticks', quantity: 1, price: 120, image: '/images/pizza.svg' }
      ]
    }
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders/history/');
      if (res.ok) {
        const data = await res.json();
        setOrders(data.length > 0 ? data : MOCK_ORDERS);
      } else {
        setOrders(MOCK_ORDERS);
      }
    } catch (e) {
      setOrders(MOCK_ORDERS);
    }
  };

  const handleReorder = (order) => {
    order.items.forEach(it => {
      addToCart({
        id: it.id || Date.now(),
        name: it.name,
        price: it.price,
        restaurantId: 1,
        restaurantName: order.restaurant_name,
        image: it.image || '/images/burger.svg'
      }, it.quantity || 1);
    });
    navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-[#0b0b0e] py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="w-10 h-10 rounded-full bg-[#161622] border border-white/10 flex items-center justify-center text-[#E2E2E6] hover:text-[#DFB76C] transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#FAF8F5]">
            Order History
          </h1>
          <p className="text-xs text-[#9E9EAA]">
            Track ongoing orders and reorder your past favorites
          </p>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => {
          const isActive = order.status !== 'Delivered' && order.status !== 'Cancelled';
          return (
            <div
              key={order.order_id}
              className={`p-6 rounded-3xl bg-[#14141c] border transition-all ${
                isActive 
                  ? 'border-[#DFB76C]/40 shadow-xl shadow-[#DFB76C]/10' 
                  : 'border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-[#FAF8F5]">{order.restaurant_name}</h3>
                    <span className="font-mono text-xs text-[#DFB76C]">#{order.order_id}</span>
                  </div>
                  <p className="text-xs text-[#9E9EAA] mt-0.5">{order.restaurant_address}</p>
                  <p className="text-[11px] text-[#9E9EAA] flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3 text-[#DFB76C]" />
                    <span>{order.created_at}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${
                    isActive 
                      ? 'bg-amber-950/60 border-amber-500/40 text-amber-400' 
                      : order.status === 'Delivered'
                      ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400'
                      : 'bg-rose-950/60 border-rose-500/40 text-rose-400'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${
                      isActive ? 'bg-amber-400 animate-ping' : order.status === 'Delivered' ? 'bg-emerald-400' : 'bg-rose-400'
                    }`} />
                    <span>{order.status}</span>
                  </span>
                </div>
              </div>

              {/* Items Breakdown */}
              <div className="py-4 space-y-1.5">
                {order.items?.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-xs text-[#E2E2E6]">
                    <span>{it.quantity}x {it.name}</span>
                    <span className="font-semibold text-[#FAF8F5]">₹{it.price * (it.quantity || 1)}</span>
                  </div>
                ))}
              </div>

              {/* Footer Actions */}
              <div className="border-t border-white/5 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-sm font-bold text-[#FAF8F5]">
                  Total Paid: <span className="text-[#DFB76C]">₹{order.total}</span>
                </div>

                <div className="flex items-center gap-2">
                  {isActive ? (
                    <Link
                      to={`/track?order_id=${order.order_id}`}
                      className="px-5 py-2.5 rounded-full text-xs font-bold text-[#0d0d12] gold-gradient-bg shadow-md flex items-center gap-1.5 hover:scale-105 transition-all"
                    >
                      <Bike className="w-3.5 h-3.5" />
                      <span>Track Order Live</span>
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => setSelectedReviewOrder(order)}
                        className="px-4 py-2 rounded-full text-xs font-semibold text-[#FAF8F5] bg-[#1d1d2b] hover:bg-[#28283a] border border-white/10 flex items-center gap-1.5"
                      >
                        <Star className="w-3.5 h-3.5 text-[#DFB76C]" />
                        <span>Rate & Review</span>
                      </button>

                      <button
                        onClick={() => handleReorder(order)}
                        className="px-5 py-2 rounded-full text-xs font-bold text-[#0d0d12] gold-gradient-bg flex items-center gap-1.5 hover:scale-105 transition-all"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reorder</span>
                      </button>
                    </>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

      <ReviewModal
        isOpen={!!selectedReviewOrder}
        onClose={() => setSelectedReviewOrder(null)}
        restaurantName={selectedReviewOrder?.restaurant_name}
        orderId={selectedReviewOrder?.order_id}
      />

    </div>
  );
};
