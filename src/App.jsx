import './App.css'
import { HomePage } from './pages/HomePage.jsx'
import { CheckoutPage } from './pages/CheckoutPage/checkout.jsx'
import { OrdersPage } from './pages/orders.jsx'
import { TrackingPage } from './pages/tracking.jsx'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/tracking" element={<TrackingPage />} />
    </Routes>
  )
}

export default App
