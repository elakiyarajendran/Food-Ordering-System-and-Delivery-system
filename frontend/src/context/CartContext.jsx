import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const INITIAL_CART_ITEMS = [
  {
    id: 1,
    name: 'Royal Burger',
    price: 249,
    quantity: 1,
    image: '/images/burger.svg',
    restaurantId: 1,
    restaurantName: 'The Gourmet Hub',
    options: ['Single Patty']
  },
  {
    id: 2,
    name: 'Cheesy Paradise Pizza',
    price: 299,
    quantity: 1,
    image: '/images/pizza.svg',
    restaurantId: 1,
    restaurantName: 'The Gourmet Hub',
    options: ['Medium (10 inch)']
  },
  {
    id: 3,
    name: 'Iced Coffee',
    price: 149,
    quantity: 1,
    image: '/images/coffee.svg',
    restaurantId: 1,
    restaurantName: 'The Gourmet Hub',
    options: []
  }
];

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('foodyx_cart');
    return saved ? JSON.parse(saved) : INITIAL_CART_ITEMS;
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [conflictModal, setConflictModal] = useState({ isOpen: false, pendingItem: null });
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    localStorage.setItem('foodyx_cart', JSON.stringify(items));
  }, [items]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const currentRestaurantId = items.length > 0 ? items[0].restaurantId : null;
  const currentRestaurantName = items.length > 0 ? items[0].restaurantName : '';

  const addToCart = (item, quantity = 1, options = [], note = '') => {
    if (items.length > 0 && item.restaurantId && item.restaurantId !== currentRestaurantId) {
      setConflictModal({
        isOpen: true,
        pendingItem: { ...item, quantity, options, note }
      });
      return;
    }

    setItems(prev => {
      const existingIndex = prev.findIndex(i => i.id === item.id && JSON.stringify(i.options || []) === JSON.stringify(options));
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, {
          id: item.id,
          name: item.name,
          price: Number(item.price),
          quantity,
          image: item.image || '/images/burger.svg',
          restaurantId: item.restaurantId || item.restaurant || 1,
          restaurantName: item.restaurantName || currentRestaurantName || 'The Gourmet Hub',
          options,
          note
        }];
      }
    });

    showToast(`Added ${item.name} to cart`);
  };

  const confirmReplaceCart = () => {
    if (conflictModal.pendingItem) {
      const p = conflictModal.pendingItem;
      setItems([{
        id: p.id,
        name: p.name,
        price: Number(p.price),
        quantity: p.quantity || 1,
        image: p.image || '/images/burger.svg',
        restaurantId: p.restaurantId,
        restaurantName: p.restaurantName,
        options: p.options || [],
        note: p.note || ''
      }]);
      showToast(`Cart updated with items from ${p.restaurantName}`);
    }
    setConflictModal({ isOpen: false, pendingItem: null });
  };

  const cancelReplaceCart = () => {
    setConflictModal({ isOpen: false, pendingItem: null });
  };

  const updateQuantity = (itemId, change) => {
    setItems(prev => {
      return prev.map(item => {
        if (item.id === itemId) {
          const newQty = item.quantity + change;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeItem = (itemId) => {
    setItems(prev => prev.filter(i => i.id !== itemId));
    showToast('Item removed from cart');
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode('');
    setCouponDiscount(0);
    setCouponSuccess('');
    setCouponError('');
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 500 || items.length === 0 ? 0 : 40;
  const platformFee = items.length > 0 ? 5 : 0;
  const tax = items.length > 0 ? Math.round(subtotal * 0.05) : 0;

  const applyCoupon = (code) => {
    const cleanCode = (code || couponCode).trim().toUpperCase();
    if (!cleanCode) return;

    if (cleanCode === 'FOOD50') {
      const discount = Math.min(Math.round(subtotal * 0.50), 150);
      setCouponDiscount(discount);
      setCouponSuccess('FOOD50 applied: 50% discount (up to ₹150)!');
      setCouponError('');
      setCouponCode('FOOD50');
    } else if (cleanCode === 'TASTE20') {
      const discount = Math.min(Math.round(subtotal * 0.20), 100);
      setCouponDiscount(discount);
      setCouponSuccess('TASTE20 applied: 20% discount!');
      setCouponError('');
      setCouponCode('TASTE20');
    } else {
      setCouponError('Invalid coupon code. Try FOOD50');
      setCouponSuccess('');
      setCouponDiscount(0);
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setCouponDiscount(0);
    setCouponSuccess('');
    setCouponError('');
  };

  const grandTotal = Math.max(0, subtotal + deliveryFee + platformFee + tax - couponDiscount);
  const totalItemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      totalItemCount,
      subtotal,
      deliveryFee,
      platformFee,
      tax,
      couponCode,
      couponDiscount,
      couponError,
      couponSuccess,
      grandTotal,
      currentRestaurantId,
      currentRestaurantName,
      isDrawerOpen,
      setIsDrawerOpen,
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
      applyCoupon,
      removeCoupon,
      conflictModal,
      confirmReplaceCart,
      cancelReplaceCart,
      toastMessage
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
