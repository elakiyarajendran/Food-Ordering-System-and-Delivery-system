import React, { useState } from 'react';
import { X, Plus, Minus, Check, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const FoodItemModal = ({ item, isOpen, onClose }) => {
  const { addToCart } = useCart();
  
  if (!isOpen || !item) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [note, setNote] = useState('');

  const defaultOptions = [
    { name: 'Regular Size', extraPrice: 0 },
    { name: 'Large Gourmet Portion', extraPrice: 80 },
    { name: 'Extra Melted Cheddar & Mozzarella', extraPrice: 50 },
    { name: 'Chef Special Herb Dust & Dip', extraPrice: 30 }
  ];

  const availableOptions = (item.options && item.options.length > 0)
    ? item.options.map(o => ({ name: o.name, extraPrice: Number(o.extra_price || o.extraPrice || 0) }))
    : defaultOptions;

  const toggleOption = (opt) => {
    setSelectedOptions(prev => {
      const exists = prev.find(p => p.name === opt.name);
      if (exists) {
        return prev.filter(p => p.name !== opt.name);
      } else {
        return [...prev, opt];
      }
    });
  };

  const extraTotal = selectedOptions.reduce((acc, curr) => acc + curr.extraPrice, 0);
  const unitPrice = Number(item.price) + extraTotal;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    addToCart(
      item, 
      quantity, 
      selectedOptions.map(o => o.name), 
      note
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-[#14141c] border border-[#DFB76C]/30 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative h-48 w-full bg-[#1b1b26] shrink-0">
          <img
            src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14141c] via-transparent to-black/40" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Veg / Non-Veg tag */}
          <div className="absolute bottom-3 left-4 flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded text-xs font-bold border flex items-center gap-1 ${
              item.is_veg 
                ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/50' 
                : 'bg-rose-950/80 text-rose-400 border-rose-500/50'
            }`}>
              <span className={`w-2 h-2 rounded-full ${item.is_veg ? 'bg-emerald-400' : 'bg-rose-400'}`} />
              {item.is_veg ? 'Pure Veg' : 'Non-Veg'}
            </span>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          <div>
            <h3 className="text-xl font-bold text-[#FAF8F5]">{item.name}</h3>
            <p className="text-xs text-[#9E9EAA] mt-1 leading-relaxed">{item.description}</p>
            <div className="mt-2 text-lg font-bold text-[#DFB76C]">
              ₹{Number(item.price)}
            </div>
          </div>

          {/* Options / Customization */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#DFB76C] mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Select Add-ons & Customisations
            </h4>
            <div className="space-y-2">
              {availableOptions.map((opt, i) => {
                const isSelected = selectedOptions.some(o => o.name === opt.name);
                return (
                  <button
                    key={i}
                    onClick={() => toggleOption(opt)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-sm text-left transition-all ${
                      isSelected
                        ? 'bg-[#DFB76C]/10 border-[#DFB76C] text-[#FAF8F5]'
                        : 'bg-[#1a1a24] border-white/5 text-[#E2E2E6] hover:bg-[#20202e]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-[#DFB76C] border-[#DFB76C] text-[#0d0d12]' : 'border-white/20'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className="font-medium text-xs sm:text-sm">{opt.name}</span>
                    </div>
                    <span className="text-xs font-semibold text-[#DFB76C]">
                      {opt.extraPrice > 0 ? `+₹${opt.extraPrice}` : 'Included'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Special Cooking Note (FR-F3) */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-[#9E9EAA] block mb-1.5">
              Special Cooking Instructions (Optional)
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g., Less spicy, extra crispy, sauce on the side"
              className="w-full bg-[#1a1a24] text-xs text-[#FAF8F5] p-3 rounded-xl border border-white/10 focus:outline-none focus:border-[#DFB76C]/50 placeholder:text-[#9E9EAA]/50"
            />
          </div>
        </div>

        {/* Footer: Quantity & Add Button */}
        <div className="p-4 bg-[#101017] border-t border-[#DFB76C]/15 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center bg-[#1c1c28] border border-white/10 rounded-full px-2 py-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#9E9EAA] hover:text-[#FAF8F5]"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center text-sm font-bold text-[#FAF8F5]">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#DFB76C] hover:text-[#FAF8F5]"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleAdd}
            className="flex-1 py-3 px-6 rounded-full font-bold text-sm text-[#0d0d12] gold-gradient-bg hover:opacity-95 shadow-lg shadow-[#DFB76C]/20 flex items-center justify-between"
          >
            <span>Add Item</span>
            <span>₹{totalPrice}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
