# 🛒 E-Commerce Frontend

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=react-router)](https://reactrouter.com/)

A modern, responsive e-commerce frontend built with React 19 and Vite. Features a complete shopping experience with product browsing, cart management, checkout flow, and order tracking.

---

## 🚀 Features

- **Product Catalog** – Browse products with images, prices, ratings, and search functionality
- **Product Details** – View comprehensive product information with add-to-cart capability
- **Shopping Cart** – Add/remove items, update quantities, select delivery options
- **Checkout Flow** – Review cart, delivery options, and payment summary before placing orders
- **Order Management** – View complete order history with detailed order information
- **Order Tracking** – Real-time order status and estimated delivery tracking
- **Search Functionality** – Search products by name or keywords
- **Responsive Design** – Fully mobile-friendly interface adapting to all screen sizes
- **Toast Notifications** – User-friendly feedback for cart actions and errors

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 19.2.0 |
| **Build Tool** | Vite 7.2.4 |
| **Routing** | React Router DOM 7.11.0 |
| **HTTP Client** | Axios 1.13.2 |
| **Date Handling** | Day.js 1.11.19 |
| **Styling** | CSS3 with custom properties |
| **Linting** | ESLint 9.39.1 |

---

## 📂 Folder Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images and static resources
│   ├── components/        # Reusable UI components
│   │   ├── Header.jsx     # Navigation header
│   │   ├── Header.css     # Header styles
│   │   ├── Footer.jsx     # Page footer
│   │   └── Footer.css     # Footer styles
│   ├── context/           # React Context providers
│   │   ├── ToastContext.jsx   # Toast notification system
│   │   ├── ToastContext.css   # Toast styles
│   │   └── ToastContext.js  # Context exports
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Route-level page components
│   │   ├── CheckoutPage/      # Checkout flow
│   │   │   ├── checkout.jsx
│   │   │   ├── checkout.css
│   │   │   ├── checkout-header.jsx
│   │   │   ├── CartItemDetails.jsx
│   │   │   ├── DeliveryDate.jsx
│   │   │   ├── DeliveryOptions.jsx
│   │   │   ├── OrderSummary.jsx
│   │   │   └── PaymentSummary.jsx
│   │   ├── HomePage/          # Product listing
│   │   │   ├── HomePage.jsx
│   │   │   ├── HomePage.css
│   │   │   ├── Product.jsx
│   │   │   └── ProductsGrid.jsx
│   │   ├── OrdersPage/        # Order history
│   │   │   ├── orders.jsx
│   │   │   ├── orders.css
│   │   │   ├── OrderGrid.jsx
│   │   │   ├── OrderHeader.jsx
│   │   │   └── OrderDetailGrid.jsx
│   │   ├── ProductDetailsPage/# Product detail view
│   │   │   ├── ProductDetailsPage.jsx
│   │   │   └── ProductDetailsPage.css
│   │   ├── TrackingPage/      # Order tracking
│   │   │   ├── TrackingPage.jsx
│   │   │   └── TrackingPage.css
│   │   └── NotFoundPage/      # 404 error page
│   │       ├── NotFoundPage.jsx
│   │       └── NotFoundPage.css
│   ├── utils/             # Utility functions
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles
├── index.html            # HTML entry point
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
└── eslint.config.js      # ESLint configuration
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ecommerce-project/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will start at `http://localhost:5173`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |

---

## 🔗 API Integration

The frontend communicates with the backend REST API running on `http://localhost:3000`.

### API Configuration
- **Base URL**: `http://localhost:3000/api`
- **Image Assets**: `http://localhost:3000/images/`
- **CORS**: Enabled for frontend origin

### Key API Endpoints Used

| Endpoint | Usage |
|----------|-------|
| `GET /api/products` | Fetch product catalog |
| `GET /api/products?search=query` | Search products |
| `GET /api/cart-items?expand=product` | Fetch cart with product details |
| `POST /api/cart-items` | Add item to cart |
| `PUT /api/cart-items/:id` | Update cart item quantity/delivery |
| `DELETE /api/cart-items/:id` | Remove item from cart |
| `POST /api/orders` | Place new order |
| `GET /api/orders?expand=products` | Fetch order history |
| `GET /api/payment-summary` | Get checkout pricing |
| `GET /api/delivery-options` | Fetch shipping options |

---

## 🎨 UI/UX Highlights

### Responsive Design
- Mobile-first approach with breakpoints for tablet and desktop
- Flexible grid layouts that adapt to screen size
- Touch-friendly interface elements

### Reusable Components
- **Header** – Navigation with cart count, responsive menu
- **Footer** – Consistent site footer across all pages
- **Toast Notifications** – Context-based notification system
- **Product Cards** – Standardized product display component

### State Management
- **React Hooks** – `useState`, `useEffect` for local state
- **Props Drilling** – Cart state passed through component tree
- **Context API** – Toast notification system using React Context

### Performance Optimizations
- Vite for fast development and optimized builds
- Component-level code splitting by route
- Efficient re-rendering with proper dependency arrays

---

## 📸 Screenshots

> Add screenshots of key pages here:
> - Home page with product grid
> - Product details page
> - Shopping cart/checkout
> - Orders page
> - Order tracking

---

## 👨‍💻 Author Info

**Muhammad Sajid**
- University: Mehran University of Engineering and Technology
- Role: Full Stack Developer
- Project: E-Commerce Web Application (Final Year Project)

---

## 📄 License

ISC License - See project root for details.

---

## 🔗 Related

- [Backend Documentation](../backend/README.md)
- [Main Project README](../README.md)
