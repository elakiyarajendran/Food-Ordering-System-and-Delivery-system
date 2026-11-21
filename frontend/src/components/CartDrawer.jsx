import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight, Tag, ShoppingBag, Gift } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SafeImage } from './SafeImage';

export const CartDrawer = () => {
  const { 
    items, 
    subtotal, 
    deliveryFee, 
    platformFee, 
    tax, 
    couponCode, 
    couponDiscount, 
    couponError, 
    couponSuccess, 
    grandTotal, 
    isDrawerOpen, 
    setIsDrawerOpen, 
    updateQuantity, 
    removeItem, 
    clearCart,
    applyCoupon,
    removeCoupon,
    conflictModal,
    confirmReplaceCart,
    cancelReplaceCart
  } = useCart();

  const navigate = useNavigate();

  if (!isDrawerOpen) return null;

  const handleProceed = () => {
    setIsDrawerOpen(false);
    navigate('/payment');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#121218] border-l border-[#DFB76C]/20 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#DFB76C]/10 text-[#DFB76C] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-[#FAF8F5]">Your Cart</h2>
            </div>

            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-[#9E9EAA] hover:text-rose-400 font-medium px-2 py-1 rounded transition-colors"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 text-[#9E9EAA] hover:text-[#FAF8F5] flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#1c1c28] border border-white/10 flex items-center justify-center text-[#9E9EAA]">
                  <ShoppingBag className="w-7 h-7 text-[#DFB76C]" />
                </div>
                <h3 className="text-base font-bold text-[#FAF8F5]">Your cart is empty</h3>
                <p className="text-xs text-[#9E9EAA] max-w-xs">
                  Explore our curated restaurants and taste something extraordinary today.
                </p>
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    navigate('/restaurants');
                  }}
                  className="mt-2 px-5 py-2.5 rounded-full text-xs font-bold text-[#0d0d12] gold-gradient-bg"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div 
                      key={item.id}
                      className="p-3.5 rounded-2xl bg-[#171722] border border-white/5 flex items-center justify-between gap-3 group hover:border-[#DFB76C]/30 transition-all"
                    >
                      {/* Safe Image Thumbnail */}
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#222230] shrink-0">
                        <SafeImage
                          src={item.image}
                          name={item.name}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-[#FAF8F5] truncate">{item.name}</h4>
                        <p className="text-xs text-[#DFB76C] font-semibold mt-0.5">₹{item.price}</p>
                        {item.options && item.options.length > 0 && (
                          <p className="text-[10px] text-[#9E9EAA] truncate">{item.options.join(', ')}</p>
                        )}
                      </div>

                      {/* Quantity Controls (- 1 +) */}
                      <div className="flex items-center bg-[#101017] border border-white/10 rounded-full px-2 py-1 shrink-0">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 flex items-center justify-center text-[#9E9EAA] hover:text-[#FAF8F5] transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-[#FAF8F5]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#DFB76C] hover:text-white transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code Card */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#DFB76C]/10 via-[#F3CA7E]/5 to-transparent border border-[#DFB76C]/30 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#DFB76C]/20 text-[#DFB76C] flex items-center justify-center shrink-0">
                      <Gift className="w-5 h-5 animate-bounce" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-[#FAF8F5]">Get 50% OFF</h5>
                      <p className="text-[11px] text-[#DFB76C]">Use Code: FOOD50</p>
                    </div>
                  </div>

                  {couponCode === 'FOOD50' ? (
                    <button
                      onClick={removeCoupon}
                      className="px-3 py-1 rounded-full text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20"
                    >
                      Applied ✓
                    </button>
                  ) : (
                    <button
                      onClick={() => applyCoupon('FOOD50')}
                      className="px-3 py-1.5 rounded-full text-xs font-bold text-[#0d0d12] gold-gradient-bg shadow-sm"
                    >
                      Apply
                    </button>
                  )}
                </div>

                {couponError && <p className="text-xs text-rose-400">{couponError}</p>}
                {couponSuccess && <p className="text-xs text-emerald-400">{couponSuccess}</p>}

                {/* Price Breakdown */}
                <div className="p-4 rounded-2xl bg-[#161622] border border-white/5 space-y-2 text-xs">
                  <div className="flex justify-between text-[#9E9EAA]">
                    <span>Subtotal</span>
                    <span className="text-[#FAF8F5] font-semibold">₹{subtotal}</span>
                  </div>

                  <div className="flex justify-between text-[#9E9EAA]">
                    <span>Delivery Fee</span>
                    <span className="text-[#FAF8F5] font-semibold">₹{deliveryFee}</span>
                  </div>

                  {platformFee > 0 && (
                    <div className="flex justify-between text-[#9E9EAA]">
                      <span>Platform Fee</span>
                      <span className="text-[#FAF8F5] font-semibold">₹{platformFee}</span>
                    </div>
                  )}

                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-emerald-400 font-semibold">
                      <span>Discount ({couponCode})</span>
                      <span>-₹{couponDiscount}</span>
                    </div>
                  )}

                  <div className="border-t border-white/10 pt-2 flex justify-between text-sm font-bold text-[#FAF8F5]">
                    <span>Total</span>
                    <span className="text-base text-[#DFB76C]">₹{grandTotal}</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer Checkout CTA */}
          {items.length > 0 && (
            <div className="p-5 bg-[#101016] border-t border-white/5 shrink-0">
              <button
                onClick={handleProceed}
                className="w-full py-3.5 px-6 rounded-full font-bold text-sm text-[#0d0d12] gold-gradient-bg hover:opacity-95 shadow-xl shadow-[#DFB76C]/20 flex items-center justify-center gap-2 transition-transform active:scale-98"
              >
                <span>Proceed to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Conflict Modal */}
      {conflictModal.isOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-sm rounded-3xl bg-[#161622] border border-[#DFB76C]/40 p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-[#DFB76C]/10 text-[#DFB76C] mx-auto flex items-center justify-center">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#FAF8F5]">Replace cart items?</h3>
            <p className="text-xs text-[#9E9EAA]">
              Your cart contains items from another restaurant. Do you want to discard them and add items from{' '}
              <span className="text-[#DFB76C] font-semibold">{conflictModal.pendingItem?.restaurantName}</span>?
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={cancelReplaceCart}
                className="py-2.5 px-4 rounded-xl text-xs font-semibold text-[#E2E2E6] bg-[#1f1f2d] hover:bg-[#28283a]"
              >
                Cancel
              </button>
              <button
                onClick={confirmReplaceCart}
                className="py-2.5 px-4 rounded-xl text-xs font-bold text-[#0d0d12] gold-gradient-bg"
              >
                Yes, Replace
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
