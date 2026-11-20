import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Sparkles, MapPin, Phone, Mail } from 'lucide-react';
import { FoodyxLogo } from './Navbar';

export const Footer = () => {
  return (
    <footer className="mt-20 border-t border-[#DFB76C]/15 bg-[#0e0e14] pt-14 pb-24 sm:pb-12 text-[#9E9EAA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <FoodyxLogo size="lg" />
            <p className="text-xs text-[#9E9EAA] leading-relaxed">
              Experience the pinnacle of culinary delivery. Crafted with precision, luxury aesthetics, and lightning fast delivery to your door.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#DFB76C] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Good Food. Great Mood.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF8F5]">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-[#DFB76C] transition-colors">Home Discovery</Link></li>
              <li><Link to="/restaurants" className="hover:text-[#DFB76C] transition-colors">Top Restaurants</Link></li>
              <li><Link to="/track" className="hover:text-[#DFB76C] transition-colors">Live Order Tracking</Link></li>
              <li><Link to="/orders" className="hover:text-[#DFB76C] transition-colors">Order History</Link></li>
              <li><Link to="/dashboards" className="hover:text-[#DFB76C] transition-colors">Partner Dashboards</Link></li>
            </ul>
          </div>

          {/* Cuisines */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF8F5]">Popular Cuisines</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/restaurants?cuisine=Pizza" className="hover:text-[#DFB76C] transition-colors">Artisanal Pizzas</Link></li>
              <li><Link to="/restaurants?cuisine=Burger" className="hover:text-[#DFB76C] transition-colors">Gourmet Smash Burgers</Link></li>
              <li><Link to="/restaurants?cuisine=Italian" className="hover:text-[#DFB76C] transition-colors">Italian Handcrafted Pastas</Link></li>
              <li><Link to="/restaurants?cuisine=Chinese" className="hover:text-[#DFB76C] transition-colors">Sichuan Asian Bowls</Link></li>
              <li><Link to="/restaurants?cuisine=Desserts" className="hover:text-[#DFB76C] transition-colors">Luxury Desserts & Shakes</Link></li>
            </ul>
          </div>

          {/* Security & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF8F5]">Contact & Security</h4>
            <div className="space-y-2 text-xs">
              <p className="flex items-center gap-2 text-[#FAF8F5]">
                <MapPin className="w-3.5 h-3.5 text-[#DFB76C]" />
                <span>Nungambakkam, Chennai, Tamil Nadu</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#DFB76C]" />
                <span>+91 98401 23456</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#DFB76C]" />
                <span>concierge@foodyx.com</span>
              </p>
            </div>

            <div className="pt-2 flex items-center gap-2 text-[11px] text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>PCI-DSS Compliant 256-bit Encryption</span>
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 Foodyx Inc. Designed & Developed per SRS v1.0 by Elakiya R (25BCA019).</p>
          <p className="flex items-center gap-1 text-[#DFB76C]">
            <span>Crafted with luxury</span>
            <Heart className="w-3 h-3 fill-current text-rose-500" />
            <span>in React & Django</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
