import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const DEMO_USERS = {
  customer: {
    id: 1,
    username: 'elakiya',
    first_name: 'Elakiya',
    last_name: 'R',
    email: 'customer@foodyx.com',
    role: 'customer',
    phone: '+91 98401 23456',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  restaurant_owner: {
    id: 2,
    username: 'chef_marco',
    first_name: 'Marco',
    last_name: 'Pierre',
    email: 'owner@foodyx.com',
    role: 'restaurant_owner',
    phone: '+91 98402 34567',
    avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=200&q=80'
  },
  delivery_partner: {
    id: 3,
    username: 'ravi_kumar',
    first_name: 'Ravi',
    last_name: 'Kumar',
    email: 'delivery@foodyx.com',
    role: 'delivery_partner',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80'
  },
  admin: {
    id: 4,
    username: 'admin',
    first_name: 'System',
    last_name: 'Administrator',
    email: 'admin@foodyx.com',
    role: 'admin',
    phone: '+91 99999 88888',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('foodyx_user');
    return saved ? JSON.parse(saved) : DEMO_USERS.customer;
  });

  const [token, setToken] = useState(() => localStorage.getItem('foodyx_token') || 'demo_jwt_token_foodyx_2026');

  useEffect(() => {
    if (user) {
      localStorage.setItem('foodyx_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('foodyx_user');
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      const res = await fetch('/api/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setToken(data.access);
        localStorage.setItem('foodyx_token', data.access);
        return { success: true };
      }
    } catch (e) {
      console.warn("Backend login offline, falling back to local auth", e);
    }

    // fallback mock login
    const foundDemo = Object.values(DEMO_USERS).find(u => u.email.toLowerCase() === email.toLowerCase());
    const targetUser = foundDemo || {
      id: Date.now(),
      username: email.split('@')[0],
      first_name: email.split('@')[0],
      email: email,
      role: 'customer'
    };
    setUser(targetUser);
    setToken('local_jwt_token');
    return { success: true };
  };

  const register = async (email, password, name, role = 'customer') => {
    try {
      const res = await fetch('/api/auth/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, role })
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setToken(data.access);
        localStorage.setItem('foodyx_token', data.access);
        return { success: true };
      }
    } catch (e) {
      console.warn("Backend register error, local fallback", e);
    }
    const newUser = {
      id: Date.now(),
      username: email.split('@')[0],
      first_name: name || 'Customer',
      email,
      role
    };
    setUser(newUser);
    return { success: true };
  };

  const switchDemoRole = (roleKey) => {
    const selected = DEMO_USERS[roleKey] || DEMO_USERS.customer;
    setUser(selected);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('foodyx_user');
    localStorage.removeItem('foodyx_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, switchDemoRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
