import { useEffect, useState } from "react";
import "./ArtisanDashboard.css";

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("currentUser"));
  } catch {
    return null;
  }
}

export default function ArtisanDashboard() {
  const user = getCurrentUser();
  const [loading, setLoading] = useState(true);

  // Form fields
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("saree");
  const [img, setImg] = useState("");
  const [desc, setDesc] = useState("");
  const [history, setHistory] = useState("");
  const [region, setRegion] = useState("");

  const [preview, setPreview] = useState("");
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);

  // ---------------------------
  // Load Data From API
  // ---------------------------
  useEffect(() => {
    if (!user) return;

    async function load() {
      setLoading(true);

      const pendingRes = await fetch(
        `http://localhost:5000/pendingProducts?artisanId=${user.id}`
      );
      const approvedRes = await fetch(
        `http://localhost:5000/products?artisanId=${user.id}`
      );

      setPending(await pendingRes.json());
      setApproved(await approvedRes.json());

      setLoading(false);
    }

    load();
  }, []);

  // Preview image live
  useEffect(() => setPreview(img), [img]);

  // ---------------------------
  // Submit New Product
  // ---------------------------
  async function submitProduct(e) {
    e.preventDefault();

    if (!user || user.role !== "artisan") {
      alert("Only artisans can upload products.");
      return;
    }

    if (!name.trim() || !price.trim() || !desc.trim()) {
      alert("Name, price, and description are required.");
      return;
    }

    const newProduct = {
      name: name.trim(),
      price: price.trim(),
      category,
      img: img.trim() || "/assets/images/placeholder.jpg",
      desc: desc.trim(),
      history: history.trim(),
      region: region.trim(),
      artisanId: user.id,
    };

    // Send to API → PENDING LIST
    await fetch("http://localhost:5000/pendingProducts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });

    alert("Product submitted for admin approval!");

    // Refresh pending list
    const res = await fetch(
      `http://localhost:5000/pendingProducts?artisanId=${user.id}`
    );
    setPending(await res.json());

    resetForm();
  }

  function resetForm() {
    setName("");
    setPrice("");
    setCategory("saree");
    setImg("");
    setDesc("");
    setHistory("");
    setRegion("");
    setPreview("");
  }

  if (!user) return <h2>Please log in as an artisan</h2>;
  if (user.role !== "artisan")
    return <h2>You are not allowed to access this page</h2>;

  return (
    <div className="artisan-page">
      <h1>Artisan Dashboard</h1>

      {/* UPLOAD SECTION */}
      <section className="upload-section">
        <h2>Upload a Product</h2>

        <form className="upload-form" onSubmit={submitProduct}>
          <div className="form-row">
            <label>Product Name *</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="form-row">
            <label>Price *</label>
            <input value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>

          <div className="form-row">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="saree">Saree</option>
              <option value="dupatta">Dupatta</option>
              <option value="fabric">Fabric</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-row">
            <label>Image URL</label>
            <input
              value={img}
              onChange={(e) => setImg(e.target.value)}
              placeholder="/assets/images/..."
            />
          </div>

          {preview && (
            <div className="preview">
              <img
                src={preview}
                onError={(e) =>
                  (e.currentTarget.src = "/assets/images/placeholder.jpg")
                }
              />
            </div>
          )}

          <div className="form-row">
            <label>Description *</label>
            <textarea
              rows="4"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>

          <div className="form-row">
            <label>History / Craft Story</label>
            <textarea
              rows="3"
              value={history}
              onChange={(e) => setHistory(e.target.value)}
            />
          </div>

          <div className="form-row">
            <label>Region / Origin</label>
            <input
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            />
          </div>

          <button className="btn-primary">Submit for Approval</button>
        </form>
      </section>

      {/* PENDING + APPROVED LISTS */}
      <section className="lists-section">
        <div className="list-col">
          <h3>Pending Approval</h3>
          {pending.length === 0 ? (
            <p className="empty">No pending products</p>
          ) : (
            <div className="card-grid">
              {pending.map((p) => (
                <div className="mini-card" key={p.id}>
                  <img src={p.img} alt="" />
                  <div className="mini-info">
                    <strong>{p.name}</strong>
                    <p className="mini-price">{p.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="list-col">
          <h3>Approved Products</h3>
          {approved.length === 0 ? (
            <p className="empty">No approved products yet</p>
          ) : (
            <div className="card-grid">
              {approved.map((p) => (
                <div className="mini-card" key={p.id}>
                  <img src={p.img} alt="" />
                  <div className="mini-info">
                    <strong>{p.title || p.name}</strong>
                    <p className="mini-price">{p.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
