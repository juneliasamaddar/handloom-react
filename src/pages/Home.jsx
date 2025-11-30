import { useEffect } from "react";
import "./Home.css";
import { initialProducts } from "../data/products";

export default function Home(){
  useEffect(()=>{
    // no direct DOM manipulation needed; trending card can be taken from data
  },[]);

  // show first two trending
  const trending = initialProducts.slice(0,2);

  return (
    <section className="home">
      <div className="hero">
        <div className="hero-left">
          <h1>Celebrate Indian Handloom</h1>
          <p>Discover handcrafted sarees, dupattas, and textiles made by skilled artisans across India.</p>
          <a href="/products"><button className="cta">Shop Now</button></a>
        </div>
        <div className="hero-right">
          <img src="/assets/images/hero.jpg" alt="hero" />
        </div>
      </div>

      <h2 className="section-title">Trending Now</h2>
      <div className="trending-grid">
        {trending.map(p=>(
          <div className="trend-card" key={p.id}>
            <img src={p.img} alt={p.title} />
            <h4>{p.title}</h4>
            <div className="price">{p.price}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
