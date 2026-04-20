# E-Commerce Project

A full-stack e-commerce application built with React (frontend) and Express.js (backend).

## Overview

This project is a complete e-commerce solution featuring product browsing, shopping cart management, checkout flow, order tracking, and order history. The application uses a RESTful API architecture with SQLite database for data persistence.

## Tech Stack

### Frontend
- **React 19** - UI library
- **React Router DOM 7** - Client-side routing
- **Vite 7** - Build tool and dev server
- **Axios** - HTTP client for API requests
- **Day.js** - Date formatting library

### Backend
- **Express.js 4** - Web framework
- **Sequelize 6** - ORM for database operations
- **SQLite** - Database (via sql.js)
- **CORS** - Cross-origin resource sharing
- **PostgreSQL** - Supported via pg driver

## Project Structure

```
ecommerce-project/
├── backend/                 # Express.js backend
│   ├── models/             # Sequelize models (Product, CartItem, Order, DeliveryOption)
│   ├── routes/             # API route handlers
│   ├── defaultData/        # Default seed data
│   ├── images/             # Product images
│   ├── server.js           # Main server entry
│   └── database.sqlite     # SQLite database file
│
└── frontend/               # React frontend
    ├── src/
    │   ├── pages/          # Page components
    │   │   ├── HomePage/       # Product listing
    │   │   ├── ProductDetailsPage/  # Product details
    │   │   ├── CheckoutPage/   # Checkout flow
    │   │   ├── OrdersPage/     # Order history
    │   │   ├── TrackingPage/   # Order tracking
    │   │   └── NotFoundPage/   # 404 page
    │   ├── components/     # Reusable components (Header, Footer)
    │   ├── context/        # React context providers
    │   ├── hooks/          # Custom React hooks
    │   ├── utils/          # Utility functions
    │   └── assets/         # Static assets
    ├── index.html          # HTML entry point
    └── vite.config.js      # Vite configuration
```

## Features

- **Product Catalog** - Browse products with images, prices, and ratings
- **Product Details** - View detailed product information
- **Shopping Cart** - Add/remove items, update quantities
- **Checkout** - Delivery options and payment summary
- **Order Management** - View order history and track orders
- **Order Tracking** - Real-time order status tracking
- **Responsive Design** - Mobile-friendly interface

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/products` | Get all products |
| `GET /api/delivery-options` | Get delivery options |
| `GET /api/cart-items` | Get cart items |
| `POST /api/cart-items` | Add item to cart |
| `PUT /api/cart-items/:id` | Update cart item |
| `DELETE /api/cart-items/:id` | Remove from cart |
| `GET /api/orders` | Get all orders |
| `POST /api/orders` | Create new order |
| `GET /api/payment-summary` | Get payment summary |
| `POST /api/reset` | Reset database |

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-project
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the backend server** (from `backend/` directory)
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:3000`

2. **Start the frontend dev server** (from `frontend/` directory)
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

3. **Open the application**
   Navigate to `http://localhost:5173` in your browser

### Build for Production

1. **Build frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy**
   Copy `frontend/dist` contents to your web server, or serve directly from the backend which includes static file serving.

## Available Scripts

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run zip` - Create project archive

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Database

The application uses SQLite with Sequelize ORM. Default data is automatically seeded on first run including:
- Sample products with images
- Delivery options
- Empty cart
- Sample orders

## Environment Variables

The backend uses the following environment variables (optional):
- `PORT` - Server port (default: 3000)

## License

ISC
