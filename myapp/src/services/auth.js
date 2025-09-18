// src/services/auth.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/auth"; // backend Spring Boot
const STORAGE_AUTH = "ns_auth";

// ========== Register ==========
export async function register({ username, email, password }) {
  const res = await axios.post(`${API_URL}/register`, {
    username,
    email,
    password,
  });
  return res.data; // "User registered successfully with role USER"
}

// ========== Login ==========
export async function login({ email, password, remember }) {
  const res = await axios.post(`${API_URL}/login`, { email, password });

  const payload = {
    token: res.data.token,
    user: {
      email: res.data.email,
      username: res.data.username,
    },
  };

  if (remember) {
    localStorage.setItem(STORAGE_AUTH, JSON.stringify(payload));
  } else {
    sessionStorage.setItem(STORAGE_AUTH, JSON.stringify(payload));
  }

  return payload;
}

// ========== Logout ==========
export function logout() {
  localStorage.removeItem(STORAGE_AUTH);
  sessionStorage.removeItem(STORAGE_AUTH);
}

// ========== Lấy auth hiện tại ==========
export function getAuth() {
  return JSON.parse(
    localStorage.getItem(STORAGE_AUTH) ||
    sessionStorage.getItem(STORAGE_AUTH) ||
    "null"
  );
}

export function isAuthed() {
  return Boolean(getAuth());
}
