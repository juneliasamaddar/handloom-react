import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";   // <-- ADD THIS
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ArtisanDashboard from "./pages/ArtisanDashboard";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />

          {/* ⭐ NEW ROUTE FOR PRODUCT DETAILS */}
          <Route path="/product/:id" element={<ProductDetails />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/artisan" element={<ArtisanDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
    </div>
  );
}
