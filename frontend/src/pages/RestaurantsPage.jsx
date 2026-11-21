import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Search, MapPin, ChevronDown, Star, Clock, 
  Tag, Filter, Sparkles, Gift, Home as HomeIcon, 
  UtensilsCrossed, Bike, Percent, User as UserIcon, Crown 
} from 'lucide-react';
import { FoodyxLogo } from '../components/Navbar';
import { SafeImage } from '../components/SafeImage';

export const RestaurantsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedCuisine, setSelectedCuisine] = useState(searchParams.get('cuisine') || 'All');
  const [selectedCity, setSelectedCity] = useState('Chennai');
  const [vegOnly, setVegOnly] = useState(false);
  const [minRating, setMinRating] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const CUISINES = ['All', 'Pizza', 'Burger', 'Chinese', 'Italian', 'Desserts', 'Healthy'];
  const CITIES = ['Chennai', 'Mumbai', 'Bangalore', 'Delhi', 'Hyderabad'];

  // Static reliable local data matching the UI mockup
  const MOCK_RESTAURANTS = [
    {
      id: 1,
      name: 'The Gourmet Hub',
      cuisines: 'Italian, Continental, Gourmet',
      city: 'Chennai',
      avg_rating: '4.8',
      total_reviews: '21k+',
      delivery_time_mins: 30,
      cost_for_two: 500,
      discount_percent: 50,
      discount_code: 'FOOD50',
      image: '/images/gourmet-hub.svg',
      is_veg: false
    },
    {
      id: 2,
      name: 'Pizza Palace',
      cuisines: 'Pizza, Italian, Fast Food',
      city: 'Chennai',
      avg_rating: '4.7',
      total_reviews: '18k+',
      delivery_time_mins: 32,
      cost_for_two: 400,
      discount_percent: 20,
      discount_code: 'PIZZA20',
      image: '/images/pizza-palace.svg',
      is_veg: true
    },
    {
      id: 3,
      name: 'Burger Boulevard',
      cuisines: 'Burger, American, Fast Food',
      city: 'Chennai',
      avg_rating: '4.8',
      total_reviews: '15k+',
      delivery_time_mins: 28,
      cost_for_two: 350,
      discount_percent: 30,
      discount_code: 'BURGER30',
      image: '/images/burger-blvd.svg',
      is_veg: false
    },
    {
      id: 4,
      name: 'Pasta Planet',
      cuisines: 'Italian, Pasta, Desserts',
      city: 'Chennai',
      avg_rating: '4.7',
      total_reviews: '12k+',
      delivery_time_mins: 35,
      cost_for_two: 450,
      discount_percent: 20,
      discount_code: 'PASTA20',
      image: '/images/pasta-planet.svg',
      is_veg: true
    },
    {
      id: 5,
      name: 'Dragon Wok Express',
      cuisines: 'Chinese, Asian, Dumplings',
      city: 'Chennai',
      avg_rating: '4.6',
      total_reviews: '9.5k+',
      delivery_time_mins: 26,
      cost_for_two: 380,
      discount_percent: 35,
      discount_code: 'DRAGON35',
      image: '/images/dragon-bowl.svg',
      is_veg: false
    },
    {
      id: 6,
      name: 'Green Gourmet Bowls',
      cuisines: 'Healthy, Salads, Beverages',
      city: 'Chennai',
      avg_rating: '4.9',
      total_reviews: '8.2k+',
      delivery_time_mins: 22,
      cost_for_two: 420,
      discount_percent: 25,
      discount_code: 'GREEN25',
      image: '/images/pasta.svg',
      is_veg: true
    }
  ];

  useEffect(() => {
    fetchRestaurants();
  }, [search, selectedCuisine, selectedCity, vegOnly, minRating, sortBy]);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (selectedCuisine && selectedCuisine !== 'All') params.append('cuisine', selectedCuisine);
      if (selectedCity) params.append('city', selectedCity);
      if (vegOnly) params.append('veg_only', 'true');
      if (minRating) params.append('rating_min', '4.5');
      if (sortBy) params.append('sort_by', sortBy);

      const res = await fetch(`/api/restaurants/?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setRestaurants(data.length > 0 ? data : MOCK_RESTAURANTS);
      } else {
        setRestaurants(MOCK_RESTAURANTS);
      }
    } catch (e) {
      setRestaurants(MOCK_RESTAURANTS);
    } finally {
      setLoading(false);
    }
  };

  const filteredRestaurants = restaurants.filter(r => {
    if (selectedCuisine !== 'All' && !r.cuisines?.toLowerCase().includes(selectedCuisine.toLowerCase())) {
      return false;
    }
    if (search && !r.name.toLowerCase().includes(search.toLowerCase()) && !r.cuisines?.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (minRating && Number(r.avg_rating) < 4.5) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0b0b0e] flex flex-col lg:flex-row">
      
      {/* LEFT SIDEBAR */}
      <aside className="hidden lg:flex w-64 bg-[#101016] border-r border-[#DFB76C]/15 flex-col justify-between p-6 shrink-0 sticky top-20 h-[calc(100vh-5rem)]">
        <div className="space-y-6">
          <FoodyxLogo />

          <nav className="space-y-1.5 pt-4">
            <Link
              to="/"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#9E9EAA] hover:text-[#FAF8F5] hover:bg-[#181824] transition-all"
            >
              <HomeIcon className="w-4 h-4 text-[#DFB76C]" />
              <span>Home</span>
            </Link>

            <Link
              to="/restaurants"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#0d0d12] gold-gradient-bg shadow-md transition-all"
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Restaurants</span>
            </Link>

            <Link
              to="/track"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#9E9EAA] hover:text-[#FAF8F5] hover:bg-[#181824] transition-all"
            >
              <Bike className="w-4 h-4 text-[#DFB76C]" />
              <span>Track Order</span>
            </Link>

            <Link
              to="/restaurants?offer=true"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#9E9EAA] hover:text-[#FAF8F5] hover:bg-[#181824] transition-all"
            >
              <Percent className="w-4 h-4 text-[#DFB76C]" />
              <span>Offers</span>
            </Link>

            <Link
              to="/auth"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#9E9EAA] hover:text-[#FAF8F5] hover:bg-[#181824] transition-all"
            >
              <UserIcon className="w-4 h-4 text-[#DFB76C]" />
              <span>Profile</span>
            </Link>
          </nav>
        </div>

        {/* Promo Code Card at bottom of sidebar */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1b1b26] to-[#14141d] border border-[#DFB76C]/30 shadow-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#DFB76C]">Special Promo</span>
            <div className="w-6 h-6 rounded-full bg-[#DFB76C]/20 text-[#DFB76C] flex items-center justify-center">
              <Gift className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-xs font-bold text-[#FAF8F5]">Get 50% OFF on your first order!</p>
          <div className="pt-1">
            <span className="inline-block text-[11px] font-mono font-bold text-[#0d0d12] bg-[#DFB76C] px-2.5 py-0.5 rounded-md shadow">
              FOOD50
            </span>
          </div>
        </div>
      </aside>

      {/* MAIN RESTAURANTS CONTENT */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
        
        {/* Top Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#FAF8F5] tracking-tight">
              Restaurants
            </h1>
            <p className="text-xs text-[#9E9EAA] mt-0.5">
              Discover top restaurants near you
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <Crown className="w-4 h-4 text-[#DFB76C] animate-pulse" />
            <span className="font-script text-2xl md:text-3xl text-[#DFB76C]">
              Taste the Extraordinary
            </span>
          </div>
        </div>

        {/* Search Bar & City Selector Strip */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9EAA]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search restaurants, cuisines, dishes..."
              className="w-full bg-[#15151e] text-xs sm:text-sm text-[#FAF8F5] pl-10 pr-4 py-3 rounded-full border border-white/10 focus:outline-none focus:border-[#DFB76C]/60"
            />
          </div>

          <div className="relative shrink-0 w-full sm:w-auto">
            <div className="flex items-center gap-2 bg-[#15151e] border border-white/10 rounded-full px-4 py-2.5 text-xs font-semibold text-[#FAF8F5]">
              <MapPin className="w-3.5 h-3.5 text-[#DFB76C]" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-transparent text-xs text-[#FAF8F5] focus:outline-none cursor-pointer pr-2"
              >
                {CITIES.map(c => (
                  <option key={c} value={c} className="bg-[#15151e] text-white">
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Cuisine Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CUISINES.map((c) => {
            const isSelected = selectedCuisine === c;
            return (
              <button
                key={c}
                onClick={() => setSelectedCuisine(c)}
                className={`px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'gold-pill-active'
                    : 'bg-[#15151e] text-[#9E9EAA] hover:text-[#FAF8F5] border border-white/5 hover:border-[#DFB76C]/30'
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        {/* Secondary Filter Toggles */}
        <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
          <button
            onClick={() => setVegOnly(!vegOnly)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border transition-all ${
              vegOnly 
                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-400 font-bold' 
                : 'bg-[#15151e] border-white/10 text-[#9E9EAA]'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${vegOnly ? 'bg-emerald-400' : 'bg-white/40'}`} />
            <span>Pure Veg Only</span>
          </button>

          <button
            onClick={() => setMinRating(!minRating)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border transition-all ${
              minRating 
                ? 'bg-[#DFB76C]/15 border-[#DFB76C] text-[#DFB76C] font-bold' 
                : 'bg-[#15151e] border-white/10 text-[#9E9EAA]'
            }`}
          >
            <Star className="w-3 h-3 fill-current" />
            <span>Rating 4.5+</span>
          </button>
        </div>

        {/* Restaurant Cards Grid with SafeImage */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 pt-2">
          {filteredRestaurants.map((res) => (
            <Link
              key={res.id}
              to={`/restaurants/${res.id}`}
              className="group rounded-3xl bg-[#14141c]/90 border border-white/5 hover:border-[#DFB76C]/30 p-3.5 shadow-xl transition-all duration-300 hover:-translate-y-1 block flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#1d1d28] mb-3">
                  <SafeImage
                    src={res.image}
                    name={res.name}
                    type="restaurant"
                    alt={res.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-2.5 left-2.5 bg-gradient-to-r from-[#DFB76C] to-[#F3CA7E] text-[#0d0d12] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                    <Tag className="w-3 h-3" />
                    <span>{res.discount_percent}% OFF</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm sm:text-base font-bold text-[#FAF8F5] group-hover:text-[#DFB76C] transition-colors truncate">
                      {res.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs font-bold text-[#DFB76C]">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{res.avg_rating}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#9E9EAA] truncate">{res.cuisines}</p>
                </div>
              </div>

              <div className="pt-3 mt-3 flex items-center justify-between text-xs text-[#9E9EAA] border-t border-white/5">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#DFB76C]" />
                  <span>{res.delivery_time_mins} min</span>
                </div>
                <span className="font-semibold text-[#FAF8F5]">₹{res.cost_for_two} for two</span>
              </div>
            </Link>
          ))}
        </div>

      </main>

    </div>
  );
};
