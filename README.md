# Foodyx - Luxury Food Ordering & Real-Time Delivery Web Application

> **Standard followed:** IEEE 830 / ISO/IEC/IEEE 29148  
> **Prepared by:** Elakiya R (25BCA019)  
> **Tech Stack:** ReactJS (Vite, Tailwind CSS, Leaflet, Canvas Confetti) · Django REST Framework (Python 3.14, SimpleJWT, SQLite) · Real-Time Tracking

---

## 🌟 Overview & UI Fidelity

**Foodyx** is a full-stack luxury food ordering and delivery web application built strictly according to the provided UI mockup and SRS specification:
- **Luxury Theme & Aesthetics:** Deep charcoal/obsidian background (`#0b0b0e`), warm ivory surfaces, burnt copper & luminous gold (`#DFB76C`, `#F3CA7E`) accents, glowing cloche logo, and subtle glassmorphic elevation.
- **Hero Showcase:** 3D floating gourmet burger centerpiece with radiant orbital light swirls, feature badges (*Lightning Fast Delivery, 100% Secure Payments, Top Rated Restaurants, 24/7 Support*), and dual CTA actions.
- **Popular Picks:** Cheesy Paradise Pizza (₹299), Royal Burger (₹249), Creamy Alfredo Pasta (₹279), Spicy Dragon Bowl (₹319) with customisation options and add-to-cart animation.
- **Restaurants Page & Sidebar:** Fixed luxury sidebar navigation with *FOOD50* promo card, *"Taste the Extraordinary"* script banner, city switcher (Chennai, Mumbai, Bangalore, Delhi), cuisine pills (*All, Pizza, Burger, Chinese, Italian, Desserts, Healthy*), and restaurant cards.
- **Cart & Pricing Engine:** Single restaurant rule enforcement, item quantity modifiers, coupon code validation (`FOOD50` 50% discount), server-computed bill breakdown (Subtotal, Delivery Fee ₹40, Platform Fee ₹5, Tax 5%, Discount, Grand Total ₹737).
- **Payment Experience:** Dedicated payment method selection (UPI selected by default, Cards, Wallets, Net Banking, COD) + 100% Secure Transaction badge with golden padlock.
- **Celebration Animation:** Party-popper confetti explosion ("cheerful bomb" effect via Canvas-Confetti) on the Payment Status page with glowing golden checkmark ring and *"Bon Appétit!"* calligraphy.
- **Live Order Tracking:** Animated 4-stage progress timeline (*Order Placed 9:20 PM -> Preparing 9:25 PM -> Out for Delivery 9:40 PM -> Delivered 10:00 PM*), interactive Leaflet OpenStreetMap with live moving scooter along Chennai routes, delivery partner Ravi Kumar card with direct Call & Chat simulations.
- **Ratings & Reviews:** 5-star rating selector, compliment tags, customer feedback input, and automatic restaurant rating calculation.
- **Role-Based Portals (SRS 4.9):** Dedicated Kitchen Display System (KDS) for restaurant owners to Accept/Prepare/Ready orders, Taskboard for delivery partners, and GMV Analytics for platform administrators.

---

## 🚀 Quick Start Guide

### 1. One-Click Launcher (Windows)
Double-click `start_servers.bat` in the root folder. It will launch both the Django backend server and Vite frontend.

### 2. Manual Launch

#### Backend (Django REST Framework):
```bash
cd backend
python manage.py runserver 0.0.0.0:8000
```
- API Base: `http://localhost:8000/api/`
- Django Admin: `http://localhost:8000/admin/`

#### Frontend (React + Vite):
```bash
cd frontend
npm run dev
```
- App URL: `http://localhost:5173`

---

## 👥 Demo Accounts (Quick Switch Available in App)

| Role | Email | Password | Privileges |
|------|-------|----------|------------|
| **Customer** | `customer@foodyx.com` | `password123` | Browse, customize dishes, cart, pay, track live, review |
| **Restaurant Owner** | `owner@foodyx.com` | `password123` | Accept/reject orders, update to Preparing/Ready, manage stock |
| **Delivery Partner** | `delivery@foodyx.com` | `password123` | View assigned route, update pickup/delivery, simulate GPS |
| **Administrator** | `admin@foodyx.com` | `password123` | View GMV, order volume, manage coupons (`FOOD50`) |

*Tip: Click the User avatar in the top-right navbar anytime to instantly switch between these demo roles!*

---

## 📋 SRS Functional Requirements Coverage (Section 4)

- **FR-A1 - FR-A5 (Authentication):** JWT auth, registration, login with password & eye toggle, saved delivery addresses, guest browsing with checkout protection.
- **FR-H1 - FR-H6 (Home Page):** Hero section with glowing 3D burger swirl, location selector, cuisine chips, popular picks, floating live order tracker pill across all routes.
- **FR-R1 - FR-R5 (Restaurant Page):** Cover banners, sticky category navigator rail, open/closed status, verified reviews summary.
- **FR-F1 - FR-F5 (Food Items):** Veg/Non-veg indicators, customisation sheet with live price calculation (size variants, extra cheese, cooking instructions), add-to-cart toast feedback.
- **FR-C1 - FR-C8 (Cart & Checkout):** Slide-in drawer on desktop, bottom sheet on mobile, single restaurant rule with replace prompt, `FOOD50` coupon application.
- **FR-P1 - FR-P8 (Payment & Status):** UPI, Cards, Net Banking, COD; celebration confetti explosion, order ID & ETA.
- **FR-T1 - FR-T8 (Order Tracking):** Animated horizontal timeline, Leaflet GPS route map with gliding golden scooter, Ravi Kumar driver card with masked call & chat dialogs, cancellation before preparation.
- **FR-V1 - FR-V6 (Reviews & Ratings):** Post-delivery star rating (1-5), compliments tags, automatic average recalculation.
- **FR-M1 - FR-M5 (Operational Dashboards):** Restaurant owner KDS, delivery partner assignment, admin GMV metrics.
