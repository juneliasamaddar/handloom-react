import { useState } from "react";
import { loginUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");

  const nav = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const res = loginUser(email, pass);
    if (!res.success) {
      setMsg(res.message);
      return;
    }

    const user = res.user;

    // Redirect based on role
    if (user.role === "artisan") nav("/artisan");
    else if (user.role === "admin") nav("/admin");
    else nav("/");

    setMsg("Login successful!");
  };

  return (
    <div className="auth-box">
      <h2>Login</h2>

      {msg && <p className="auth-msg">{msg}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
