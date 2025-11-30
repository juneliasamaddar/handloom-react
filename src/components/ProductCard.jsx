import "./ProductCard.css";

export default function ProductCard({product, onAdd}){
  return (
    <div className="product-card">
      <div className="img-wrap"><img src={product.img} alt={product.title} /></div>
      <div className="meta">
        <h4>{product.title}</h4>
        <div className="price">{product.price}</div>
        <button onClick={() => onAdd(product)}>Add to Cart</button>
      </div>
    </div>
  );
}
