// Shared frontend helper + API wiring
const API_BASE = "http://localhost:8080"; // same origin. If backend at different URL set like 'http://localhost:8080'
const TOKEN_KEY = "flight_token";

// Decode JWT to extract payload
function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

// Redirect based on user role
async function redirectByRole(token) {
  const decoded = parseJwt(token);
  if (decoded && decoded.role && decoded.role.toLowerCase() === "admin") {
    location.href = "admin.html";
  } else {
    location.href = "flights.html";
  }
}

async function apiFetch(path, opts = {}) {
  const headers = opts.headers || {};
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) headers["Authorization"] = "Bearer " + token;
  headers["Content-Type"] = headers["Content-Type"] || "application/json";
  const res = await fetch(API_BASE + path, { ...opts, headers });
  if (res.ok) {
    const ct = res.headers.get("content-type") || "";
    if (ct.includes("application/json")) return res.json();
    return res.text();
  } else {
    let errText = await res.text();
    try {
      const j = JSON.parse(errText);
      if (j.error) errText = j.error;
    } catch (e) {}
    const err = new Error(errText || "Request failed: " + res.status);
    err.status = res.status;
    throw err;
  }
}

async function apiGet(path) {
  return apiFetch(path, { method: "GET" });
}
async function apiPost(path, body) {
  return apiFetch(path, { method: "POST", body: JSON.stringify(body) });
}
async function apiPut(path, body) {
  return apiFetch(path, { method: "PUT", body: JSON.stringify(body) });
}
async function apiDelete(path) {
  return apiFetch(path, { method: "DELETE" });
}

// Auth helpers
async function apiLogin(username, password) {
  const r = await apiPost("/auth/login", { username, password });
  if (r && r.token) {
    localStorage.setItem(TOKEN_KEY, r.token);
    return r;
  }
  throw new Error("Login failed");
}

async function apiRegister(username, email, password) {
  const r = await apiPost("/auth/register", { username, email, password });
  if (r && r.token) {
    localStorage.setItem(TOKEN_KEY, r.token);
    return r;
  }
  throw new Error("Register failed");
}

function logout() {
  localStorage.removeItem(TOKEN_KEY);
  location.href = "index.html";
}

function ensureAuth() {
  if (!localStorage.getItem(TOKEN_KEY)) {
    location.href = "index.html";
    throw new Error("Not authenticated");
  }
}

// small helpers
function escapeHtml(s) {
  if (s === null || s === undefined) return "";
  return String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[
        c
      ])
  );
}

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return d.toLocaleString();
}

// convert ISO to local datetime-local input value
function toLocalInput(iso) {
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, "0");
  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const min = pad(d.getMinutes());
  return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
}
