import React, { useState } from 'react';
import { Star, X, Check, ThumbsUp, Sparkles } from 'lucide-react';

export const ReviewModal = ({ isOpen, onClose, restaurantName, orderId }) => {
  if (!isOpen) return null;

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState('');
  const [selectedTags, setSelectedTags] = useState(['Lightning fast delivery', 'Piping hot food']);
  const [submitted, setSubmitted] = useState(false);

  const TAGS = [
    'Cheesy Paradise Pizza',
    'Royal Burger',
    'Lightning fast delivery',
    'Piping hot food',
    'Generous portion',
    'Eco-friendly packaging'
  ];

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/reviews/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_id: orderId,
          rating,
          text,
          dish_tags: selectedTags
        })
      });
    } catch (err) {
      console.warn("Offline fallback review submit", err);
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md rounded-3xl bg-[#14141c] border border-[#DFB76C]/30 p-6 sm:p-8 text-center space-y-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 text-[#9E9EAA] hover:text-[#FAF8F5] flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-8 space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="text-lg font-bold text-[#FAF8F5]">Thank You For Your Review!</h3>
            <p className="text-xs text-[#9E9EAA]">Your feedback helps our culinary partners improve.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#DFB76C]">
                Verified Customer Feedback
              </span>
              <h3 className="text-xl font-bold text-[#FAF8F5] mt-1">
                Rate {restaurantName || 'The Gourmet Hub'}
              </h3>
              <p className="text-xs text-[#9E9EAA] mt-0.5">How was your culinary experience?</p>
            </div>

            {/* Interactive Stars (1 to 5) */}
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="p-1 transition-transform hover:scale-125 focus:outline-none"
                >
                  <Star className={`w-8 h-8 ${
                    (hoverRating || rating) >= star
                      ? 'fill-[#DFB76C] text-[#DFB76C] drop-shadow-[0_0_8px_rgba(223,183,108,0.6)]'
                      : 'text-[#303042]'
                  }`} />
                </button>
              ))}
            </div>

            {/* Compliment Chips */}
            <div className="flex flex-wrap gap-2 justify-center">
              {TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all ${
                      isSelected
                        ? 'bg-[#DFB76C]/15 border-[#DFB76C] text-[#DFB76C]'
                        : 'bg-[#1a1a24] border-white/5 text-[#9E9EAA] hover:text-[#FAF8F5]'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>

            {/* Review Text */}
            <textarea
              rows="3"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write a few words about the flavours, packaging, or delivery..."
              className="w-full bg-[#181824] text-xs text-[#FAF8F5] p-3 rounded-2xl border border-white/10 focus:outline-none focus:border-[#DFB76C] placeholder:text-[#9E9EAA]/50"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-full font-bold text-sm text-[#0d0d12] gold-gradient-bg hover:opacity-95 shadow-xl shadow-[#DFB76C]/20 transition-all hover:scale-102"
            >
              Submit Review
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
