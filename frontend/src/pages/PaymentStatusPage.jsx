import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Check, XCircle, Clock, Bike, ArrowRight, Home, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const PaymentStatusPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const orderId = searchParams.get('order_id') || 'FDX-7429';
  const amount = searchParams.get('amount') || '737';
  const statusParam = searchParams.get('status') || 'success';

  const [paymentStatus, setPaymentStatus] = useState(statusParam);

  useEffect(() => {
    if (paymentStatus === 'success') {
      triggerConfettiCelebration();
    }
  }, [paymentStatus]);

  const triggerConfettiCelebration = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.6 },
      colors: ['#DFB76C', '#F3CA7E', '#FFE29E', '#FFFFFF', '#B98E3B']
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  return (
    <div className="min-h-screen bg-[#0b0b0e] flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background radial gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#DFB76C]/10 via-[#F3CA7E]/15 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Main Status Container (Matches UI Mockup Screen) */}
      <div className="relative w-full max-w-3xl rounded-3xl bg-[#14141c]/95 border border-[#DFB76C]/40 p-8 sm:p-12 text-center shadow-2xl backdrop-blur-xl overflow-hidden">
        
        {/* Authentic Celebration Food (Fries and Drink) from Original Mockup */}
        <div className="absolute -bottom-2 right-0 hidden sm:block pointer-events-none opacity-90">
          <img
            src="/images/celebration-food.png"
            alt="Bon Appétit Celebration"
            className="w-48 h-auto object-contain drop-shadow-[0_10px_20px_rgba(223,183,108,0.3)]"
          />
        </div>

        {/* Calligraphy Decorative "Bon Appétit!" on Top Right */}
        <div className="absolute top-6 right-8 hidden sm:block">
          <span className="font-script text-3xl sm:text-4xl text-[#DFB76C] drop-shadow-md">
            Bon Appétit! ✨
          </span>
        </div>

        {/* Golden Checkmark with Glowing Ring */}
        <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-[#DFB76C] bg-gradient-to-tr from-[#1b1b26] to-[#121218] flex items-center justify-center shadow-[0_0_50px_rgba(223,183,108,0.4)] animate-in zoom-in duration-300">
          <Check className="w-12 h-12 sm:w-14 sm:h-14 text-[#DFB76C] stroke-[3]" />
          <span className="absolute inset-0 rounded-full border-2 border-[#FFE29E] animate-ping opacity-30" />
        </div>

        {/* Headings from Mockup */}
        <div className="mt-8 space-y-2">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#FAF8F5] tracking-tight">
            Order Placed Successfully!
          </h1>
          <p className="text-base sm:text-lg text-[#9E9EAA] font-light">
            Enjoy your meal! 🍽️
          </p>
        </div>

        {/* Order Details Badge */}
        <div className="mt-8 max-w-md mx-auto p-4 rounded-2xl bg-[#1c1c28] border border-white/5 grid grid-cols-2 gap-4 text-xs">
          <div className="text-left">
            <span className="text-[#9E9EAA] block">Order ID</span>
            <span className="font-mono font-bold text-[#DFB76C] text-sm">#{orderId}</span>
          </div>
          <div className="text-right">
            <span className="text-[#9E9EAA] block">Estimated Delivery</span>
            <span className="font-bold text-[#FAF8F5] text-sm">30-40 Mins</span>
          </div>
        </div>

        {/* Action Buttons: "Back to Home" & "Track Order" */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          <Link
            to={`/track?order_id=${orderId}`}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-sm text-[#0d0d12] gold-gradient-bg hover:opacity-95 shadow-xl shadow-[#DFB76C]/25 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
          >
            <Bike className="w-4 h-4" />
            <span>Track Order Live</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-sm text-[#FAF8F5] bg-[#1a1a24] hover:bg-[#252536] border border-white/10 flex items-center justify-center gap-2 transition-all"
          >
            <Home className="w-4 h-4 text-[#DFB76C]" />
            <span>Back to Home</span>
          </Link>
        </div>

      </div>

    </div>
  );
};
