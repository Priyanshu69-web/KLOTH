import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/auth";
import { CartProvider } from "./context/cart";
import axios from "axios";

jest.mock("axios", () => ({
  defaults: {
    baseURL: "",
    headers: {
      common: {},
    },
  },
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

jest.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
    error: jest.fn(),
  },
  Toaster: () => null,
}));

beforeEach(() => {
  axios.get.mockImplementation((url) => {
    if (url.includes("/category/get-category")) {
      return Promise.resolve({ data: { success: true, category: [] } });
    }

    if (url.includes("/craousel")) {
      return Promise.resolve({ data: [] });
    }

    if (url.includes("/product-count")) {
      return Promise.resolve({ data: { total: 0 } });
    }

    if (url.includes("/product-list/")) {
      return Promise.resolve({ data: { products: [] } });
    }

    return Promise.resolve({ data: { ok: false } });
  });
  axios.post.mockResolvedValue({ data: { products: [] } });
  axios.put.mockResolvedValue({ data: {} });
  axios.delete.mockResolvedValue({ data: {} });
});

test("renders the primary navigation", () => {
  render(
    <AuthProvider>
      <CartProvider>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </CartProvider>
    </AuthProvider>
  );

  expect(screen.getAllByRole("link", { name: /home/i }).length).toBeGreaterThan(0);
});
