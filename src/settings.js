export const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://chronofitapi.pellin.eu";

export const AUTH_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5050"
    : "https://auth.pellin.eu";
