import { useState } from "react";
import { registerUser } from "../utils/auth";
import "./Auth.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState("user"); // default user
  const [msg, setMsg] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (!name || !email || !pass || !confirm) {
      setMsg("Please fill all fields");
      return;
    }
    if (pass !== confirm) {
      setMsg("Passwords do not match");
      return;
    }

    const response = registerUser(name, email, pass, role);

    if (!response.success) {
      setMsg(response.message);
      return;
    }

    setMsg("Signup Successful! Go to Login");

    // Clear fields
    setName("");
    setEmail("");
    setPass("");
    setConfirm("");
  };

  return (
    <div className="auth-box">
      <h2>Create Account</h2>

      {msg && <p className="auth-msg">{msg}</p>}

      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Create Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        {/* ROLE SELECTION */}
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">Customer</option>
          <option value="artisan">Artisan</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
