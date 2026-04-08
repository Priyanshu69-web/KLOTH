import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBoxesStacked,
  FaChartLine,
  FaImages,
  FaList,
  FaReceipt,
  FaUsers,
} from "react-icons/fa6";

const AdminMenu = () => {
  const links = [
    { to: "/dashboard/admin", label: "Overview", icon: <FaChartLine /> },
    { to: "/dashboard/admin/createcategory", label: "Categories", icon: <FaList /> },
    { to: "/dashboard/admin/createproduct", label: "Create Product", icon: <FaBoxesStacked /> },
    { to: "/dashboard/admin/product", label: "Products", icon: <FaBoxesStacked /> },
    { to: "/dashboard/admin/orders", label: "Orders", icon: <FaReceipt /> },
    { to: "/dashboard/admin/users", label: "Users", icon: <FaUsers /> },
    { to: "/dashboard/admin/craousel", label: "Carousel", icon: <FaImages /> },
  ];

  return (
    <div className="dashboard-nav">
      <div className="dashboard-nav__eyebrow">Control Center</div>
      <h2 className="dashboard-nav__title">Admin Panel</h2>
      <p className="dashboard-nav__text">Manage inventory, customers, orders, and homepage visibility.</p>
      <div className="dashboard-nav__links">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/dashboard/admin"}
            className={({ isActive }) => `dashboard-nav__link${isActive ? " dashboard-nav__link--active" : ""}`}
          >
            <span className="dashboard-nav__icon">{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AdminMenu;
