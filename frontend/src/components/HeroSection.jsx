import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Play, Zap, ShieldCheck, 
  Crown, Headphones, Sparkles, Star 
} from 'lucide-react';
import { SafeImage } from './SafeImage';

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20">
      
      {/* Background ambient gold glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#DFB76C]/10 via-[#F3CA7E]/15 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#B98E3B]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Sub-tagline */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1c1c28] border border-[#DFB76C]/30 text-xs font-semibold text-[#DFB76C] tracking-wide shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-[#F5C97A] animate-pulse" />
              <span>Good Food. Great Mood.</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#FAF8F5] leading-[1.12]">
              Order Delicious <br />
              <span className="gold-gradient-text">Food, Anytime!</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#9E9EAA] max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              From top restaurants to your doorstep, faster than ever. Indulge in artisanal pizzas, gourmet smash burgers, and authentic delicacies.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => navigate('/restaurants')}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-[#0d0d12] gold-gradient-bg hover:opacity-95 shadow-xl shadow-[#DFB76C]/25 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span>Explore Restaurants</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/restaurants?popular=true')}
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full font-semibold text-sm text-[#FAF8F5] bg-[#161622] hover:bg-[#202030] border border-[#2e2e3e] hover:border-[#DFB76C]/50 transition-all duration-300 group"
              >
                <div className="w-7 h-7 rounded-full bg-[#DFB76C]/20 border border-[#DFB76C]/40 flex items-center justify-center text-[#DFB76C] group-hover:scale-110 transition-transform">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Watch Video</span>
              </button>
            </div>
          </div>

          {/* Right Column: Original 3D Glowing Burger with Orbital Golden Light Ribbons */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-80 sm:w-96 h-80 sm:h-96 flex items-center justify-center">
              
              {/* Glowing back aura */}
              <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-[#F3CA7E]/30 via-[#DFB76C]/40 to-transparent blur-3xl animate-pulse-gold pointer-events-none" />

              {/* Original Hero Burger Image directly from UI Mockup */}
              <div className="relative z-10 animate-float-slow">
                <img
                  src="/images/hero-burger.png"
                  alt="Foodyx Original Signature Gourmet Burger"
                  className="w-80 sm:w-96 h-auto object-contain drop-shadow-[0_20px_35px_rgba(223,183,108,0.35)] rounded-3xl"
                />
                
                {/* Floating Garnish 1: Rating Badge */}
                <div className="absolute top-2 right-2 bg-[#161622]/95 backdrop-blur-md border border-[#DFB76C]/40 rounded-2xl px-3.5 py-2 flex items-center gap-2 shadow-xl animate-bounce">
                  <div className="w-5 h-5 rounded-full bg-[#DFB76C] text-[#0d0d12] flex items-center justify-center font-bold text-xs">
                    <Star className="w-3 h-3 fill-current" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#FAF8F5]">4.9</span>
                    <span className="text-[10px] text-[#9E9EAA] block">Top Rated</span>
                  </div>
                </div>

                {/* Floating Garnish 2: Delivery Time */}
                <div className="absolute bottom-4 left-0 bg-[#161622]/95 backdrop-blur-md border border-[#DFB76C]/40 rounded-2xl px-3.5 py-2 flex items-center gap-2 shadow-xl">
                  <div className="w-5 h-5 rounded-full bg-[#DFB76C]/20 text-[#DFB76C] flex items-center justify-center">
                    <Zap className="w-3 h-3 fill-current" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#FAF8F5]">25 Mins</span>
                    <span className="text-[10px] text-[#9E9EAA] block">Superfast</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 4 Feature Cards */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-[#DFB76C]/10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            {
              icon: Zap,
              title: 'Lightning Fast',
              subtitle: 'Delivery in 30 mins'
            },
            {
              icon: ShieldCheck,
              title: '100% Secure',
              subtitle: 'Payments guaranteed'
            },
            {
              icon: Crown,
              title: 'Top Rated',
              subtitle: 'Michelin & artisanal'
            },
            {
              icon: Headphones,
              title: '24/7 Support',
              subtitle: 'Always here to help'
            }
          ].map((item, idx) => (
            <div 
              key={idx}
              className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-[#13131b]/80 border border-white/5 hover:border-[#DFB76C]/30 hover:bg-[#181822] transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#DFB76C]/10 text-[#DFB76C] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#DFB76C] group-hover:text-[#0d0d12] transition-all">
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#FAF8F5] leading-tight">
                  {item.title}
                </h4>
                <p className="text-[11px] text-[#9E9EAA] mt-0.5 leading-tight">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
