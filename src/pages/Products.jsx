import { useEffect, useState } from "react";
import "./Products.css";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.error("API Error:", err));
  }, []);

  return (
    <section className="products-page">
      <h1 className="products-title">Our Handloom Collection</h1>

      <div className="product-grid">
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          products.map((p) => (
            <Link to={`/product/${p.id}`} key={p.id} className="product-link">
              <div className="product-card">
                <img src={p.img} alt={p.title} className="product-img" />
                <div className="product-card-title">{p.title}</div>
                <div className="product-card-price">{p.price}</div>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}
