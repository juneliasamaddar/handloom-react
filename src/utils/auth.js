import { read, write } from "./storage";

// REGISTER USER
export function registerUser(name, email, password, role) {
  let users = read("users");

  if (!Array.isArray(users)) users = [];

  // Check if email already exists
  const exists = users.find((u) => u.email === email);
  if (exists) {
    return { success: false, message: "Email already registered" };
  }

  const newUser = { name, email, password, role };
  users.push(newUser);

  write("users", users);
  return { success: true };
}

// LOGIN USER
export function loginUser(email, password) {
  const users = read("users");

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return { success: false, message: "User not found" };
  }

  write("currentUser", user); // save session
  return { success: true, user };
}
export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser") || "null");
}
