import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, Clock, MapPin, Tag, Plus, ArrowLeft, 
  Sparkles, CheckCircle2, MessageSquare, ThumbsUp 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { FoodItemModal } from '../components/FoodItemModal';

export const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [restaurant, setRestaurant] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback data if backend is starting
  const FALLBACK_DETAIL = {
    id: 1,
    name: 'The Gourmet Hub',
    tagline: 'Exquisite flavours crafted with passion',
    cuisines: 'Italian, Continental, Gourmet',
    address: '12 Sterling Road, Nungambakkam, Chennai',
    avg_rating: '4.8',
    total_reviews: '21,400',
    cost_for_two: 500,
    delivery_time_mins: 30,
    discount_percent: 50,
    discount_code: 'FOOD50',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    categories: [
      {
        id: 1,
        name: 'Signature Starters',
        items: [
          {
            id: 101,
            name: 'Truffle Fries Supreme',
            description: 'Crisp hand-cut golden potatoes tossed in Italian white truffle oil and freshly grated parmesan.',
            price: 189,
            is_veg: true,
            image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=400&q=80'
          },
          {
            id: 102,
            name: 'Crispy Calamari Rings',
            description: 'Tender calamari rings dusted in herbed semolina, fried crisp and served with garlic aioli.',
            price: 249,
            is_veg: false,
            image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=400&q=80'
          }
        ]
      },
      {
        id: 2,
        name: 'Artisanal Pizzas',
        items: [
          {
            id: 2,
            name: 'Cheesy Paradise Pizza',
            description: 'Overloaded with mozzarella, vintage cheddar, golden corn, and aromatic basil leaves.',
            price: 299,
            is_veg: true,
            is_popular: true,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80'
          },
          {
            id: 202,
            name: 'Smoked BBQ Pepperoni Pizza',
            description: 'Slow-cured spicy pepperoni slices atop rich marinara and melted mozzarella.',
            price: 389,
            is_veg: false,
            image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=400&q=80'
          }
        ]
      },
      {
        id: 3,
        name: 'Gourmet Mains',
        items: [
          {
            id: 1,
            name: 'Royal Burger',
            description: 'Signature toasted brioche bun, succulent prime patty, caramelized onions and smoked cheddar.',
            price: 249,
            is_veg: false,
            is_popular: true,
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80'
          },
          {
            id: 3,
            name: 'Creamy Alfredo Pasta',
            description: 'Fettuccine drenched in silky butter-parmesan reduction infused with crushed roasted garlic.',
            price: 279,
            is_veg: true,
            is_popular: true,
            image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=400&q=80'
          },
          {
            id: 4,
            name: 'Spicy Dragon Bowl',
            description: 'Wok-tossed ramen noodles with crunchy peppers, fiery dragon chili glaze, and steamed edamame.',
            price: 319,
            is_veg: false,
            is_popular: true,
            image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=80'
          }
        ]
      },
      {
        id: 4,
        name: 'Beverages & Desserts',
        items: [
          {
            id: 301,
            name: 'Iced Coffee',
            description: 'Slow-brewed dark roast espresso shaken over crystal ice with velvety whipped cream.',
            price: 149,
            is_veg: true,
            image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=400&q=80'
          },
          {
            id: 302,
            name: 'Belgian Molten Lava Cake',
            description: 'Warm dark chocolate cake with a molten center, served with vanilla bean ice cream.',
            price: 199,
            is_veg: true,
            image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80'
          }
        ]
      }
    ]
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/restaurants/${id || 1}/`);
      if (res.ok) {
        const data = await res.json();
        setRestaurant(data);
        if (data.categories?.length > 0) {
          setActiveCategory(data.categories[0].id);
        }
      } else {
        setRestaurant(FALLBACK_DETAIL);
        setActiveCategory(FALLBACK_DETAIL.categories[0].id);
      }
    } catch (e) {
      setRestaurant(FALLBACK_DETAIL);
      setActiveCategory(FALLBACK_DETAIL.categories[0].id);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCustomize = (item) => {
    setSelectedFood({
      ...item,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name
    });
    setIsModalOpen(true);
  };

  if (!restaurant) return null;

  return (
    <div className="min-h-screen pb-20">
      
      {/* Cover Banner */}
      <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-[#15151e]">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0e] via-[#0b0b0e]/60 to-transparent" />
        
        {/* Back Link */}
        <div className="absolute top-6 left-4 sm:left-8 z-10">
          <Link
            to="/restaurants"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-xs font-bold text-[#FAF8F5] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Restaurants</span>
          </Link>
        </div>

        {/* Restaurant Name & Meta info */}
        <div className="absolute bottom-6 left-4 sm:left-8 right-4 sm:right-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#DFB76C] text-[#0d0d12]">
              <Tag className="w-3.5 h-3.5" /> {restaurant.discount_percent}% OFF Special
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#FAF8F5]">
              {restaurant.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#9E9EAA]">{restaurant.cuisines}</p>
            <p className="text-xs text-[#9E9EAA] flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#DFB76C]" />
              <span>{restaurant.address}</span>
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-4 bg-[#14141c]/90 border border-white/10 rounded-2xl p-3 px-5 backdrop-blur-md shrink-0">
            <div className="text-center">
              <div className="flex items-center gap-1 text-sm font-bold text-[#DFB76C]">
                <Star className="w-4 h-4 fill-current" />
                <span>{restaurant.avg_rating}</span>
              </div>
              <span className="text-[10px] text-[#9E9EAA]">{restaurant.total_reviews} ratings</span>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div className="text-center">
              <div className="flex items-center gap-1 text-sm font-bold text-[#FAF8F5]">
                <Clock className="w-4 h-4 text-[#DFB76C]" />
                <span>{restaurant.delivery_time_mins} min</span>
              </div>
              <span className="text-[10px] text-[#9E9EAA]">Delivery Time</span>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div className="text-center">
              <div className="text-sm font-bold text-[#FAF8F5]">₹{restaurant.cost_for_two}</div>
              <span className="text-[10px] text-[#9E9EAA]">For two</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Layout: Category Rail + Food List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sticky Category Navigator (SRS FR-R2) */}
          <div className="lg:col-span-3">
            <div className="sticky top-28 bg-[#121219] rounded-2xl border border-white/5 p-4 space-y-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#DFB76C] px-3 pb-2 border-b border-white/5">
                Menu Categories
              </h3>
              {restaurant.categories?.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                    activeCategory === cat.id
                      ? 'bg-[#DFB76C] text-[#0d0d12] font-bold shadow-md'
                      : 'text-[#9E9EAA] hover:text-[#FAF8F5] hover:bg-[#1a1a24]'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-[10px] opacity-75">({cat.items?.length || 0})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Food Items List */}
          <div className="lg:col-span-9 space-y-10">
            {restaurant.categories?.map((cat) => {
              if (activeCategory && activeCategory !== cat.id) return null;
              return (
                <div key={cat.id} className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h2 className="text-xl font-bold text-[#FAF8F5]">{cat.name}</h2>
                    <span className="text-xs text-[#9E9EAA]">{cat.items?.length} items</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {cat.items?.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleOpenCustomize(item)}
                        className="group p-4 rounded-3xl bg-[#14141c]/90 border border-white/5 hover:border-[#DFB76C]/30 flex gap-4 transition-all hover:bg-[#181824] cursor-pointer shadow-lg"
                      >
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            {/* Veg Indicator */}
                            <span className={`w-3.5 h-3.5 rounded-sm border inline-flex items-center justify-center mb-1.5 ${
                              item.is_veg ? 'border-emerald-500 bg-emerald-950/60' : 'border-rose-500 bg-rose-950/60'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${item.is_veg ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                            </span>

                            <h4 className="text-sm font-bold text-[#FAF8F5] group-hover:text-[#DFB76C] transition-colors">
                              {item.name}
                            </h4>
                            <p className="text-xs text-[#9E9EAA] line-clamp-2 mt-1 leading-relaxed">
                              {item.description}
                            </p>
                          </div>

                          <div className="mt-3 text-sm font-extrabold text-[#DFB76C]">
                            ₹{item.price}
                          </div>
                        </div>

                        {/* Image & Add Button */}
                        <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-[#20202e] shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenCustomize(item);
                            }}
                            className="absolute bottom-1.5 right-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#0d0d12] gold-gradient-bg shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1"
                          >
                            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>ADD</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Customer Reviews Section */}
            <div className="mt-12 p-6 rounded-3xl bg-[#121219] border border-white/5 space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-[#FAF8F5]">Customer Reviews</h3>
                  <p className="text-xs text-[#9E9EAA]">Verified reviews from satisfied diners</p>
                </div>
                <div className="flex items-center gap-2 bg-[#DFB76C]/10 px-3 py-1.5 rounded-full text-[#DFB76C] font-bold text-xs">
                  <Star className="w-4 h-4 fill-current" />
                  <span>4.8 Overall</span>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    name: 'Elakiya R',
                    date: '20 Nov 2026',
                    rating: 5,
                    text: 'The Cheesy Paradise Pizza arrived piping hot! Incredibly authentic cheese pull and aroma.',
                    tags: ['Cheesy Paradise Pizza', 'Fast Delivery']
                  },
                  {
                    name: 'Karthik V',
                    date: '19 Nov 2026',
                    rating: 5,
                    text: 'Royal Burger is top notch. The caramelized onion sauce adds so much richness.',
                    tags: ['Royal Burger']
                  }
                ].map((rev, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-[#171722] border border-white/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#DFB76C]/20 text-[#DFB76C] font-bold text-xs flex items-center justify-center">
                          {rev.name[0]}
                        </div>
                        <span className="text-xs font-bold text-[#FAF8F5]">{rev.name}</span>
                        <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full">Verified</span>
                      </div>
                      <span className="text-[10px] text-[#9E9EAA]">{rev.date}</span>
                    </div>

                    <div className="flex text-[#DFB76C]">
                      {[...Array(rev.rating)].map((_, j) => (
                        <Star key={j} className="w-3 h-3 fill-current" />
                      ))}
                    </div>

                    <p className="text-xs text-[#E2E2E6]">{rev.text}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

      <FoodItemModal
        item={selectedFood}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

    </div>
  );
};
