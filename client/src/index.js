import React from "react";
import ReactDOM from "react-dom/client"; 
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import { CartProvider } from "./context/cart";
import "antd/dist/reset.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement); 

  root.render(
    <React.StrictMode>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found!");
}
