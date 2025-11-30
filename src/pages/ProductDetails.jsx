import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://handlooms-api.onrender.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  function addToCart() {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if product already exists
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  }

  if (!product) return <h2>Loading...</h2>;

  return (
    <div className="details-page">
      <img src={product.img} className="details-img" alt={product.title} />

      <div className="details-info">
        <h1>{product.title}</h1>
        <h2 className="details-price">{product.price}</h2>

        <p className="details-desc">{product.description}</p>

        <h3>History Behind This Craft</h3>
        <p className="details-history">{product.history}</p>

        <h3>Region / Origin</h3>
        <p className="details-region">{product.region}</p>

        <button className="buy-btn" onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
