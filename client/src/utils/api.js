const isLocalHost =
  typeof window !== "undefined" &&
  ["localhost", "127.0.0.1"].includes(window.location.hostname);

export const API_BASE_URL =
  isLocalHost
    ? "http://localhost:4000"
    : process.env.REACT_APP_BACKEND_URL ||
      process.env.REACT_APP_API ||
      "https://kloth.onrender.com";

export const buildApiUrl = (path = "") => `${API_BASE_URL}${path}`;
