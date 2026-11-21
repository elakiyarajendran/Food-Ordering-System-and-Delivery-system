import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Plus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { FoodItemModal } from './FoodItemModal';
import { SafeImage } from './SafeImage';

export const PopularPicks = () => {
  const { addToCart } = useCart();
  const [selectedFood, setSelectedFood] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Exact dishes from the provided UI Mockup with reliable local images
  const POPULAR_ITEMS = [
    {
      id: 2,
      name: 'Cheesy Paradise Pizza',
      rating: '4.8',
      reviews: '12k+',
      price: 299,
      is_veg: true,
      restaurantId: 1,
      restaurantName: 'The Gourmet Hub',
      description: 'Overloaded with mozzarella, vintage cheddar, golden corn, and aromatic basil leaves.',
      image: '/images/pizza.svg',
      options: [
        { name: 'Medium (10 inch)', extraPrice: 0 },
        { name: 'Large (12 inch)', extraPrice: 100 },
        { name: 'Extra Cheese Burst', extraPrice: 60 }
      ]
    },
    {
      id: 1,
      name: 'Royal Burger',
      rating: '4.7',
      reviews: '9k+',
      price: 249,
      is_veg: false,
      restaurantId: 1,
      restaurantName: 'The Gourmet Hub',
      description: 'Signature toasted brioche bun, succulent prime patty, caramelized onions and smoked cheddar.',
      image: '/images/burger.svg',
      options: [
        { name: 'Single Patty', extraPrice: 0 },
        { name: 'Double Patty Deluxe', extraPrice: 80 },
        { name: 'French Fries Add-on', extraPrice: 50 }
      ]
    },
    {
      id: 3,
      name: 'Creamy Alfredo Pasta',
      rating: '4.8',
      reviews: '7k+',
      price: 279,
      is_veg: true,
      restaurantId: 1,
      restaurantName: 'The Gourmet Hub',
      description: 'Fettuccine drenched in silky butter-parmesan reduction infused with crushed roasted garlic.',
      image: '/images/pasta.svg',
      options: [
        { name: 'Add Sautéed Mushrooms', extraPrice: 40 },
        { name: 'Add Grilled Chicken', extraPrice: 70 }
      ]
    },
    {
      id: 4,
      name: 'Spicy Dragon Bowl',
      rating: '4.9',
      reviews: '10k+',
      price: 319,
      is_veg: false,
      restaurantId: 1,
      restaurantName: 'The Gourmet Hub',
      description: 'Wok-tossed ramen noodles with crunchy peppers, fiery dragon chili glaze, and steamed edamame.',
      image: '/images/dragon-bowl.svg',
      options: [
        { name: 'Mild Spice', extraPrice: 0 },
        { name: 'Extra Fiery Sichuan Chili', extraPrice: 20 },
        { name: 'Add Crispy Wontons', extraPrice: 40 }
      ]
    }
  ];

  const handleQuickAdd = (e, item) => {
    e.stopPropagation();
    addToCart(item, 1, item.options?.length ? [item.options[0].name] : []);
  };

  const handleOpenCustomize = (item) => {
    setSelectedFood(item);
    setIsModalOpen(true);
  };

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#FAF8F5]">
            Popular Picks
          </h2>
          <p className="text-xs text-[#9E9EAA] mt-1">
            Most-ordered culinary masterpieces across the city
          </p>
        </div>

        <Link
          to="/restaurants"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#DFB76C] hover:text-[#FFE29E] transition-colors group"
        >
          <span>See all</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* 4 Cards Grid - Matches UI Mockup */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {POPULAR_ITEMS.map((item) => (
          <div
            key={item.id}
            onClick={() => handleOpenCustomize(item)}
            className="group relative rounded-3xl bg-[#14141c]/90 border border-white/5 hover:border-[#DFB76C]/30 p-3.5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
          >
            {/* Food Image with SafeImage */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#1d1d28] mb-3.5">
              <SafeImage
                src={item.image}
                name={item.name}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Veg / Non-Veg Indicator */}
              <div className="absolute top-2.5 left-2.5">
                <span className={`w-4 h-4 rounded-sm border flex items-center justify-center ${
                  item.is_veg 
                    ? 'border-emerald-500 bg-[#0d1f14]/80' 
                    : 'border-rose-500 bg-[#240e13]/80'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${item.is_veg ? 'bg-emerald-400' : 'bg-rose-500'}`} />
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-1.5">
              <h3 className="text-sm sm:text-base font-bold text-[#FAF8F5] group-hover:text-[#DFB76C] transition-colors truncate">
                {item.name}
              </h3>

              {/* Star Rating & Review Count */}
              <div className="flex items-center gap-1 text-xs text-[#9E9EAA]">
                <Star className="w-3.5 h-3.5 fill-[#DFB76C] text-[#DFB76C]" />
                <span className="font-semibold text-[#FAF8F5]">{item.rating}</span>
                <span>({item.reviews})</span>
              </div>

              {/* Price & Add (+) Button */}
              <div className="flex items-center justify-between pt-2">
                <div className="text-base sm:text-lg font-bold text-[#FAF8F5]">
                  ₹{item.price}
                </div>

                <button
                  onClick={(e) => handleQuickAdd(e, item)}
                  title="Quick Add to Cart"
                  className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#F3CA7E] to-[#DFB76C] text-[#0d0d12] flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-200"
                >
                  <Plus className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Customisation Sheet Modal */}
      <FoodItemModal
        item={selectedFood}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

    </section>
  );
};
