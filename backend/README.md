# ⚙️ E-Commerce Backend API

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.21.2-000000?logo=express)](https://expressjs.com/)
[![Sequelize](https://img.shields.io/badge/Sequelize-6.6.5-52B0E7?logo=sequelize)](https://sequelize.org/)
[![SQLite](https://img.shields.io/badge/SQLite-3-003B57?logo=sqlite)](https://sqlite.org/)

A robust REST API powering the e-commerce frontend. Built with Express.js and Sequelize ORM, featuring SQLite database with automatic seeding and comprehensive CRUD operations.

---

## 🚀 Features

- **Product Management** – Full CRUD operations with search and filtering
- **Shopping Cart API** – Add, update, remove items with quantity validation
- **Order Processing** – Complete checkout flow with automatic cart clearing
- **Delivery Options** – Multiple shipping choices with cost calculation
- **Payment Summary** – Automatic tax calculation and cost breakdown
- **Database Seeding** – Automatic default data population on first run
- **Static File Serving** – Product images and frontend build files
- **CORS Support** – Cross-origin requests enabled for frontend integration
- **Error Handling** – Centralized error handling middleware

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| **Runtime** | Node.js 18+ | JavaScript runtime |
| **Framework** | Express.js 4.21.2 | Web framework |
| **ORM** | Sequelize 6.6.5 | Database abstraction |
| **Database** | SQLite (via sql.js) | Data persistence |
| **CORS** | cors 2.8.5 | Cross-origin handling |
| **File Upload** | Native fs | File system operations |

### Database Support
- **Primary**: SQLite (sql.js) – File-based, zero configuration
- **Alternative**: PostgreSQL – Supported via `pg` driver
- **Alternative**: MySQL – Supported via `mysql2` driver

---

## 📂 Folder Structure

```
backend/
├── backend/               # JSON data backups
│   ├── cart.json
│   ├── deliveryOptions.json
│   └── orders.json
├── defaultData/          # Seed data for database
│   ├── defaultCart.js
│   ├── defaultDeliveryOptions.js
│   ├── defaultOrders.js
│   └── defaultProducts.js
├── images/               # Static image assets
│   ├── products/         # Product images
│   └── ratings/          # Rating star images
├── models/               # Sequelize models
│   ├── index.js          # Database connection & model exports
│   ├── Product.js        # Product model
│   ├── CartItem.js       # Cart item model
│   ├── Order.js          # Order model
│   └── DeliveryOption.js # Shipping option model
├── routes/               # API route handlers
│   ├── products.js       # Product endpoints
│   ├── cartItems.js      # Shopping cart endpoints
│   ├── orders.js         # Order endpoints
│   ├── deliveryOptions.js # Shipping options endpoints
│   ├── paymentSummary.js # Checkout calculation endpoints
│   └── reset.js          # Database reset endpoints
├── patches/              # Package patches
├── server.js             # Application entry point
├── database.sqlite       # SQLite database file
├── package.json          # Dependencies
└── .eslintrc.json        # ESLint configuration
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
cd ecommerce-project/backend

# Install dependencies
npm install

# Start development server
npm run dev
```

The API server will start at `http://localhost:3000`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start development server with nodemon |
| `npm run zip` | Create project archive |

---

## 🔐 Environment Variables

Create a `.env` file in the backend directory (optional):

```env
# Server Configuration
PORT=3000

# Database (optional - defaults to SQLite)
# For PostgreSQL:
# DATABASE_URL=postgresql://user:password@localhost:5432/ecommerce

# For MySQL:
# DATABASE_URL=mysql://user:password@localhost:3306/ecommerce
```

**Note**: If no environment variables are set, the server defaults to:
- Port: `3000`
- Database: SQLite (`database.sqlite`)

---

## 📡 API Endpoints

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | Get all products |
| `GET` | `/api/products?search=keyword` | Search products by name/keywords |

### Shopping Cart

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/cart-items` | Get all cart items |
| `GET` | `/api/cart-items?expand=product` | Get cart with product details |
| `POST` | `/api/cart-items` | Add item to cart |
| `PUT` | `/api/cart-items/:productId` | Update cart item (quantity/delivery) |
| `DELETE` | `/api/cart-items/:productId` | Remove item from cart |

### Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/orders` | Get all orders (sorted by newest) |
| `GET` | `/api/orders?expand=products` | Get orders with product details |
| `GET` | `/api/orders/:orderId` | Get specific order |
| `GET` | `/api/orders/:orderId?expand=products` | Get order with product details |
| `POST` | `/api/orders` | Create new order from cart |

### Delivery Options

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/delivery-options` | Get all delivery options |
| `GET` | `/api/delivery-options?expand=estimatedDeliveryTime` | Get with delivery estimates |

### Payment Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/payment-summary` | Get checkout cost breakdown |

### System

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/reset` | Reset database to default state |

---

## 🧠 Architecture Explanation

### MVC Pattern
The backend follows a simplified MVC (Model-View-Controller) architecture:

```
Request → Routes → (Model ↔ Database) → JSON Response
                ↓
            Controller Logic
```

### Request Flow
1. **Request** – Client sends HTTP request
2. **Routing** – Express routes direct to appropriate handler
3. **Model** – Sequelize models interact with SQLite
4. **Response** – JSON data returned to client
5. **Error Handling** – Centralized middleware catches errors

### Database Models

| Model | Description | Relationships |
|-------|-------------|-------------|
| `Product` | Product catalog data | Referenced by CartItem, Order |
| `CartItem` | Shopping cart items | Belongs to Product, DeliveryOption |
| `Order` | Completed orders | Contains array of products |
| `DeliveryOption` | Shipping methods | Referenced by CartItem |

### Data Flow
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend  │ ←→  │    API      │ ←→  │   SQLite    │
│  (React)    │     │  (Express)  │     │  (Sequelize) │
└─────────────┘     └─────────────┘     └─────────────┘
       ↑                                       ↑
       └────────── Static Images ──────────────┘
```

---

## 🧪 Testing

Currently, the project uses manual testing via API clients. To test endpoints:

1. Start the server: `npm run dev`
2. Use curl, Postman, or any HTTP client
3. Test endpoints at `http://localhost:3000/api/`

### Sample Test Commands

```bash
# Get all products
curl http://localhost:3000/api/products

# Search products
curl "http://localhost:3000/api/products?search=shirt"

# Get cart with product details
curl "http://localhost:3000/api/cart-items?expand=product"

# Add item to cart
curl -X POST http://localhost:3000/api/cart-items \
  -H "Content-Type: application/json" \
  -d '{"productId":"uuid-here","quantity":2}'
```

---

## 🚀 Deployment Notes

### Production Deployment

1. **Set Environment Variables**
   ```bash
   export PORT=3000
   export NODE_ENV=production
   ```

2. **Install Dependencies**
   ```bash
   npm install --production
   ```

3. **Start Server**
   ```bash
   npm start
   ```

### Static File Serving
The backend serves the frontend build from the `dist/` folder:
```javascript
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
```

### Platform-Specific Notes

| Platform | Notes |
|----------|-------|
| **Heroku** | Set `PORT` env var; add `heroku-postbuild` script |
| **Railway** | SQLite persists to volume; consider PostgreSQL for production |
| **VPS** | Use PM2: `pm2 start server.js --name ecommerce-api` |
| **Docker** | Mount volume for SQLite persistence |

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

- [Frontend Documentation](../frontend/README.md)
- [Main Project README](../README.md)
