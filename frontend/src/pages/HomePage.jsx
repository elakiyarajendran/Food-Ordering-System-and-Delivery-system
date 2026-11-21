import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { PopularPicks } from '../components/PopularPicks';
import { Link } from 'react-router-dom';
import { Star, Clock, Tag, ArrowRight, Sparkles } from 'lucide-react';
import { SafeImage } from '../components/SafeImage';

export const HomePage = () => {
  const FEATURED_RESTAURANTS = [
    {
      id: 1,
      name: 'The Gourmet Hub',
      cuisines: 'Italian, Continental, Gourmet',
      rating: '4.8',
      time: '30 min',
      cost: '₹500 for two',
      discount: '50% OFF',
      image: '/images/res-gourmet.png'
    },
    {
      id: 2,
      name: 'Pizza Palace',
      cuisines: 'Pizza, Italian, Fast Food',
      rating: '4.7',
      time: '32 min',
      cost: '₹400 for two',
      discount: '20% OFF',
      image: '/images/res-pizza.png'
    },
    {
      id: 3,
      name: 'Burger Boulevard',
      cuisines: 'Burger, American, Fast Food',
      rating: '4.8',
      time: '28 min',
      cost: '₹350 for two',
      discount: '30% OFF',
      image: '/images/res-burger.png'
    },
    {
      id: 4,
      name: 'Pasta Planet',
      cuisines: 'Italian, Pasta, Desserts',
      rating: '4.7',
      time: '35 min',
      cost: '₹450 for two',
      discount: '20% OFF',
      image: '/images/res-pasta.png'
    }
  ];

  return (
    <div className="min-h-screen">
      <HeroSection />

      <PopularPicks />

      {/* Featured Restaurants Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#DFB76C] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Finest Dining Experiences</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#FAF8F5]">
              Featured Restaurants
            </h2>
          </div>
          <Link
            to="/restaurants"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#DFB76C] hover:text-[#FFE29E] transition-colors"
          >
            <span>Explore all</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_RESTAURANTS.map((res) => (
            <Link
              key={res.id}
              to={`/restaurants/${res.id}`}
              className="group rounded-3xl bg-[#14141c]/90 border border-white/5 hover:border-[#DFB76C]/30 p-3.5 shadow-xl transition-all duration-300 hover:-translate-y-1 block"
            >
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#1d1d28] mb-3">
                <SafeImage
                  src={res.image}
                  name={res.name}
                  type="restaurant"
                  alt={res.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute bottom-2.5 left-2.5 bg-[#DFB76C] text-[#0d0d12] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                  <Tag className="w-3.5 h-3.5" />
                  <span>{res.discount}</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#FAF8F5] group-hover:text-[#DFB76C] transition-colors truncate">
                    {res.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs font-bold text-[#DFB76C]">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{res.rating}</span>
                  </div>
                </div>

                <p className="text-xs text-[#9E9EAA] truncate">{res.cuisines}</p>

                <div className="pt-2 flex items-center justify-between text-xs text-[#9E9EAA] border-t border-white/5">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#DFB76C]" />
                    <span>{res.time}</span>
                  </div>
                  <span className="font-medium text-[#E2E2E6]">{res.cost}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 bg-gradient-to-r from-[#171724] via-[#1f1f2e] to-[#121218] border border-[#DFB76C]/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <span className="font-script text-3xl sm:text-4xl text-[#DFB76C] block">Taste the Extraordinary</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FAF8F5]">
              Get 50% OFF on your first culinary order!
            </h3>
            <p className="text-xs sm:text-sm text-[#9E9EAA] max-w-md">
              Apply coupon code <span className="font-bold text-[#DFB76C] px-2 py-0.5 rounded bg-[#DFB76C]/10 border border-[#DFB76C]/30">FOOD50</span> during checkout.
            </p>
          </div>
          <Link
            to="/restaurants"
            className="px-8 py-3.5 rounded-full font-bold text-sm text-[#0d0d12] gold-gradient-bg shadow-xl hover:scale-105 transition-all shrink-0"
          >
            Claim 50% OFF
          </Link>
        </div>
      </section>

    </div>
  );
};
