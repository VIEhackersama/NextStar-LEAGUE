// src/services/auth.js
const STORAGE_USERS = "ns_users";
const STORAGE_AUTH = "ns_auth";

// Helpers
function loadUsers() {
  return JSON.parse(localStorage.getItem(STORAGE_USERS) || "[]");
}
function saveUsers(users) {
  localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
}

// Đăng ký (demo, không mã hoá mật khẩu trong ví dụ này)
export async function register({ fullName, email, password }) {
  const users = loadUsers();
  const exists = users.some(
    (u) => u.email.toLowerCase() === String(email).toLowerCase()
  );
  if (exists) throw new Error("Email đã tồn tại. Vui lòng dùng email khác.");

  const user = {
    id: Date.now(),
    fullName,
    email,
    password, // ⚠️ Demo: không dùng cho sản xuất
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  saveUsers(users);
  return { user };
}

// Đăng nhập
export async function login({ email, password, remember }) {
  const users = loadUsers();
  const user = users.find(
    (u) =>
      u.email.toLowerCase() === String(email).toLowerCase() &&
      u.password === password
  );
  if (!user) throw new Error("Email hoặc mật khẩu không đúng.");

  const token = `demo.${user.id}.${Math.random().toString(36).slice(2)}`;
  const payload = { token, user };
  if (remember) {
    localStorage.setItem(STORAGE_AUTH, JSON.stringify(payload));
  } else {
    sessionStorage.setItem(STORAGE_AUTH, JSON.stringify(payload));
  }
  return payload;
}

export function logout() {
  localStorage.removeItem(STORAGE_AUTH);
  sessionStorage.removeItem(STORAGE_AUTH);
}

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
// ===== Forgot password (demo) =====
const STORAGE_RESET = "ns_reset";

function loadResets() {
  return JSON.parse(localStorage.getItem(STORAGE_RESET) || "{}");
}
function saveResets(data) {
  localStorage.setItem(STORAGE_RESET, JSON.stringify(data));
}

/**
 * Start password reset: create a 6-digit code and store for 10 minutes.
 * Returns { ok: true, code } — code is shown ONLY for demo.
 */
export async function startPasswordReset(emailRaw) {
  const email = String(emailRaw || "").trim().toLowerCase();
  if (!email) throw new Error("Please enter your email.");

  const users = JSON.parse(localStorage.getItem("ns_users") || "[]");
  const exists = users.some((u) => u.email.toLowerCase() === email);

  // Always respond OK to avoid leaking user existence (real-world behavior)
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

  if (exists) {
    const all = loadResets();
    all[email] = { code, expiresAt };
    saveResets(all);
  }
  // DEMO: return the code so you can test without email service
  return { ok: true, code: exists ? code : null };
}

/**
 * Complete reset: verify code & expiry, then update password.
 */
export async function completePasswordReset({ email: emailRaw, code, newPassword }) {
  const email = String(emailRaw || "").trim().toLowerCase();
  const all = loadResets();
  const record = all[email];

  if (!record) throw new Error("Reset code is invalid or expired.");
  if (Date.now() > record.expiresAt) {
    delete all[email];
    saveResets(all);
    throw new Error("Reset code has expired.");
  }
  if (String(code) !== String(record.code)) {
    throw new Error("Incorrect reset code.");
  }
  if (!newPassword || newPassword.length < 8) {
    throw new Error("Password must be at least 8 characters.");
  }

  // Update password in users store
  const users = JSON.parse(localStorage.getItem("ns_users") || "[]");
  const idx = users.findIndex((u) => u.email.toLowerCase() === email);
  if (idx === -1) throw new Error("Account not found.");

  users[idx].password = newPassword; // ⚠️ demo only (no hashing)
  localStorage.setItem("ns_users", JSON.stringify(users));

  // Clear used code
  delete all[email];
  saveResets(all);

  return { ok: true };
}
