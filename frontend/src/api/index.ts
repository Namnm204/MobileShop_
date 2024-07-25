import axios from "axios";

export const instace = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
  timeout: 3000,
});
