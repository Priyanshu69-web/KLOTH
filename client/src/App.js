import { Routes, Route } from "react-router-dom";
import ProductDetailPage from "./pages/ProductDetailPage"; // Import the new ProductDetailPage
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/Aboutus";
import Contact from "./pages/Contactus";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Forgotpassword from "./pages/Auth/ForgotPassword";
import PrivateRoute from "./commponets/Routes/Private";
import AdminRoutes from "./commponets/Routes/AdminRoute";
import UserDashboard from "./pages/user/Dashboard";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import CartPage from "./pages/CartPage";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import CreateCarousel from "./pages/Admin/CreateCarousel";
import Users from "./pages/Admin/Users";
import AdminOrders from "./pages/Admin/AdminOrders";
import Product from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/product/:slug" element={<ProductDetailPage />} /> 

      {/* Auth Routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot" element={<Forgotpassword />} />

      {/* Protected Routes for Users */}
      <Route path="/dashboard" element={<PrivateRoute />}>
        <Route path="user" element={<UserDashboard />} />
        <Route path="user/orders" element={<Orders />} />
        <Route path="user/profile" element={<Profile />} />
      </Route>

      {/* Admin Dashboard Routes */}
      <Route path="/dashboard" element={<AdminRoutes />}>
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/orders" element={<AdminOrders />} />
        <Route path="admin/createcategory" element={<CreateCategory />} />
        <Route path="admin/craousel" element={<CreateCarousel />} />
        <Route path="admin/createproduct" element={<CreateProduct />} />
        <Route path="admin/product" element={<Product />} />
        <Route path="admin/product/:slug" element={<UpdateProduct />} />
        <Route path="admin/users" element={<Users />} />
      </Route>
    </Routes>
  );
}

export default App;
