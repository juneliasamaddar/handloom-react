import { getCart, saveCart } from "../utils/cart";
import "./Cart.css";
import { useState, useEffect } from "react";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  // Update quantity
  const updateQuantity = (id, change) => {
    const updated = cart.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + change) };
      }
      return item;
    });
    setCart(updated);
    saveCart(updated);
  };

  // Remove product
  const removeItem = (id) => {
    const updated = cart.filter(item => item.id !== id);
    setCart(updated);
    saveCart(updated);
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price.replace(/₹|,/g, "")) * item.quantity,
    0
  );

  if (cart.length === 0) return <h2 className="empty-cart">Your cart is empty</h2>;

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cart.map(item => (
        <div className="cart-item" key={item.id}>
          <img src={item.img} className="cart-img" />

          <div className="cart-info">
            <h3>{item.title}</h3>
            <p className="price">{item.price}</p>

            <div className="quantity-box">
              <button onClick={() => updateQuantity(item.id, -1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, 1)}>+</button>
            </div>

            <button className="remove-btn" onClick={() => removeItem(item.id)}>
              Remove
            </button>
          </div>
        </div>
      ))}

      <h2 className="cart-total">Total: ₹{total}</h2>
    </div>
  );
}
