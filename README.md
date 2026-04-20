# 🛒 Full-Stack E-Commerce Application

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-4.21.2-000000?logo=express)](https://expressjs.com/)
[![Sequelize](https://img.shields.io/badge/Sequelize-6.6.5-52B0E7?logo=sequelize)](https://sequelize.org/)
[![SQLite](https://img.shields.io/badge/SQLite-3-003B57?logo=sqlite)](https://sqlite.org/)

A production-ready, full-stack e-commerce solution built with modern web technologies. Features a responsive React frontend and a robust Express.js backend with SQLite database.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Documentation](#-documentation)
- [Author](#-author)

---

## 🎯 Overview

This e-commerce platform provides a complete online shopping experience with:

- **Product Discovery** – Browse and search a catalog of products
- **Shopping Cart** – Manage items with quantity controls and delivery options
- **Checkout Flow** – Seamless order placement with cost breakdown
- **Order Management** – View history and track order status
- **Responsive UI** – Mobile-first design for all devices

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│  ┌─────────────────┐  React 19 + React Router 7 + Vite 7    │
│  │   Browser       │  → Responsive UI                         │
│  └─────────────────┘  → Axios for API calls                   │
└────────────────────────────────┬──────────────────────────────┘
                                 │ HTTP/REST
                                 ↓
┌─────────────────────────────────────────────────────────────┐
│                        API LAYER                           │
│  ┌─────────────────┐  Express.js 4.21.2                     │
│  │   Server        │  → REST API endpoints                   │
│  │   Port: 3000    │  → CORS enabled                         │
│  └─────────────────┘  → Static file serving                  │
└────────────────────────────────┬──────────────────────────────┘
                                 │ Sequelize ORM
                                 ↓
┌─────────────────────────────────────────────────────────────┐
│                      DATA LAYER                            │
│  ┌─────────────────┐  SQLite (via sql.js)                   │
│  │   Database      │  → Products, Cart, Orders, Delivery     │
│  │   database.sqlite│  → Auto-seeded with default data       │
│  └─────────────────┘                                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.0 | UI library |
| React Router DOM | 7.11.0 | Client-side routing |
| Vite | 7.2.4 | Build tool & dev server |
| Axios | 1.13.2 | HTTP client |
| Day.js | 1.11.19 | Date formatting |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18+ | Runtime environment |
| Express.js | 4.21.2 | Web framework |
| Sequelize | 6.6.5 | ORM |
| SQLite | 3 | Database |
| CORS | 2.8.5 | Cross-origin requests |

---

## ✨ Features

### Frontend Features
- 🏠 **Home Page** – Product grid with search functionality
- 🔍 **Product Search** – Filter by name or keywords
- 📦 **Product Details** – Full product view with add-to-cart
- 🛒 **Shopping Cart** – Add, update, remove items
- 💳 **Checkout** – Delivery options and payment summary
- 📜 **Order History** – View past orders with details
- 🚚 **Order Tracking** – Real-time delivery status
- 📱 **Responsive Design** – Mobile, tablet, desktop support

### Backend Features
- 🌐 **REST API** – Complete CRUD operations
- 🔎 **Product Search** – Full-text search endpoint
- 🛒 **Cart Management** – Persistent cart storage
- 📦 **Order Processing** – Automated checkout flow
- 💰 **Payment Calculation** – Tax and shipping costs
- 🗄️ **Database Seeding** – Auto-populate default data
- 🖼️ **Static Assets** – Image serving for products
- 🔒 **Error Handling** – Centralized error middleware

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or pnpm package manager

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd ecommerce-project

# 2. Install & start backend
cd backend
npm install
npm run dev

# 3. In a new terminal, install & start frontend
cd ../frontend
npm install
npm run dev
```

### Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **API Documentation**: See [Backend README](./backend/README.md)

---

## 📂 Project Structure

```
ecommerce-project/
├── 📁 frontend/              # React Frontend
│   ├── 📁 src/
│   │   ├── 📁 components/    # Reusable UI (Header, Footer)
│   │   ├── 📁 pages/         # Route pages (Home, Checkout, Orders, Tracking)
│   │   ├── 📁 context/       # React Context (Toast notifications)
│   │   ├── 📁 hooks/         # Custom React hooks
│   │   ├── 📁 utils/         # Utility functions
│   │   ├── App.jsx           # Main app component
│   │   └── main.jsx          # Entry point
│   ├── package.json          # Frontend dependencies
│   └── README.md             # Frontend documentation
│
├── 📁 backend/               # Express Backend
│   ├── 📁 models/            # Sequelize models
│   │   ├── Product.js        # Product schema
│   │   ├── CartItem.js       # Cart item schema
│   │   ├── Order.js          # Order schema
│   │   └── DeliveryOption.js # Shipping options schema
│   ├── 📁 routes/            # API route handlers
│   │   ├── products.js       # Product endpoints
│   │   ├── cartItems.js      # Cart endpoints
│   │   ├── orders.js         # Order endpoints
│   │   ├── deliveryOptions.js
│   │   ├── paymentSummary.js
│   │   └── reset.js
│   ├── 📁 defaultData/       # Database seed data
│   ├── 📁 images/            # Product images
│   ├── server.js             # Server entry point
│   ├── database.sqlite       # SQLite database
│   └── README.md             # Backend documentation
│
└── README.md                 # This file
```

---

## 📚 Documentation

| Component | Documentation | Description |
|-----------|--------------|-------------|
| **Frontend** | [frontend/README.md](./frontend/README.md) | React app setup, components, routing |
| **Backend** | [backend/README.md](./backend/README.md) | API reference, models, deployment |

---

## 📡 API Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | List all products |
| `GET` | `/api/products?search=query` | Search products |
| `GET` | `/api/cart-items` | Get cart items |
| `POST` | `/api/cart-items` | Add to cart |
| `PUT` | `/api/cart-items/:id` | Update cart item |
| `DELETE` | `/api/cart-items/:id` | Remove from cart |
| `GET` | `/api/orders` | List orders |
| `POST` | `/api/orders` | Create order |
| `GET` | `/api/payment-summary` | Get checkout costs |
| `POST` | `/api/reset` | Reset database |

**Full API documentation**: [backend/README.md](./backend/README.md#-api-endpoints)

---

## 🛣️ Roadmap

Potential enhancements for future development:

- [ ] User authentication (JWT)
- [ ] Admin dashboard
- [ ] Payment gateway integration
- [ ] Product reviews & ratings
- [ ] Wishlist functionality
- [ ] Email notifications
- [ ] Inventory management

---

## 👨‍💻 Author

**Muhammad Sajid**
- 🎓 **University**: Mehran University of Engineering and Technology
- 💼 **Role**: Full Stack Developer
- 📋 **Project**: Final Year Project – E-Commerce Web Application

---

## 📄 License

ISC License © 2025 Muhammad Sajid

---

<div align="center">
  <sub>Built with ❤️ using React & Express.js</sub>
</div>
