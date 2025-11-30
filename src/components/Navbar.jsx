import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser") || "null");

  function logout() {
    localStorage.removeItem("currentUser");
    navigate("/login");
  }

  return (
    <nav className="nav">
      <div className="brand">
        <Link to="/">Global Threads</Link>
      </div>

      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>

        {/* IF NO USER → SHOW LOGIN & SIGNUP */}
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup" className="signup-btn">Signup</Link>
          </>
        )}

        {/* IF USER IS ARTISAN */}
        {user?.role === "artisan" && <Link to="/artisan">Artisan</Link>}

        {/* IF USER IS ADMIN */}
        {user?.role === "admin" && <Link to="/admin">Admin</Link>}

        {/* IF USER LOGGED IN → SHOW LOGOUT */}
        {user && (
          <button className="lnk-btn" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
