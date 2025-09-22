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

// Khi load module, nếu có token thì gắn sẵn header Authorization
(function bootstrapAuthHeader() {
  const raw = localStorage.getItem(STORAGE_AUTH) || sessionStorage.getItem(STORAGE_AUTH);
  if (raw) {
    try {
      const { token } = JSON.parse(raw);
      if (token) axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } catch { }
  }
})();
// ========== Login ==========
export async function login({ email, password, remember }) {
  const res = await axios.post(`${API_URL}/login`, { email, password });

  const payload = {
    token: res.data.token,
    user: {
      email: res.data.email,
      username: res.data.username,
     isAdmin: res.data.isAdmin ?? (res.data.email === "admin@example.com") // fallback

    },
  };

  if (remember) {
    localStorage.setItem(STORAGE_AUTH, JSON.stringify(payload));
  } else {
    sessionStorage.setItem(STORAGE_AUTH, JSON.stringify(payload));
  }
  axios.defaults.headers.common.Authorization = `Bearer ${payload.token}`;

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
