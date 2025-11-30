import { useEffect, useState } from "react";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const pend = await fetch("http://localhost:5000/pendingProducts").then(r => r.json());
    const appr = await fetch("http://localhost:5000/products").then(r => r.json());

    setPending(pend);
    setApproved(appr);
  }

  async function approveProduct(item) {
    // Add to /products
    await fetch("http://localhost:5000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });

    // Remove from pending
    await fetch(`http://localhost:5000/pendingProducts/${item.id}`, {
      method: "DELETE",
    });

    alert("Product Approved!");
    loadData();
  }

  async function rejectProduct(id) {
    await fetch(`http://localhost:5000/pendingProducts/${id}`, {
      method: "DELETE",
    });

    alert("Product Rejected!");
    loadData();
  }

  return (
    <div className="admin-page">
      <h1 className="admin-title">Admin Dashboard</h1>
      <p className="admin-sub">Manage artisan product submissions</p>

      {/* Pending */}
      <h2 style={{ marginTop: "30px" }}>Pending Products</h2>

      {pending.length === 0 ? (
        <p className="empty">No pending items</p>
      ) : (
        <div className="admin-grid">
          {pending.map((p) => (
            <div className="admin-card" key={p.id}>
              <img src={p.img} alt="" className="admin-img" />

              <h3>{p.name}</h3>
              <div className="price">₹{p.price}</div>
              <p className="desc">{p.desc}</p>

              <div className="admin-btns">
                <button className="approve-btn" onClick={() => approveProduct(p)}>
                  Approve
                </button>
                <button className="reject-btn" onClick={() => rejectProduct(p.id)}>
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Approved */}
      <h2 style={{ marginTop: "40px" }}>Approved Products</h2>

      {approved.length === 0 ? (
        <p className="empty">No approved products yet</p>
      ) : (
        <div className="admin-grid">
          {approved.map((p) => (
            <div className="admin-card" key={p.id}>
              <img src={p.img} alt="" className="admin-img" />

              <h3>{p.name || p.title}</h3>
              <div className="price">{p.price}</div>
              <p className="desc">{p.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
