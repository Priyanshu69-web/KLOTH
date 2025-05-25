import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="text-center">
      <div className="list-group dashboard-menu">
        <h2>Admin Panel</h2>
        <NavLink to="/dashboard/admin/createcategory" className="list-group-item list-group-item-action">
          <i className="fas fa-list me-2" style={{ color: "blue" }}></i> Create Category
        </NavLink>
        <NavLink to="/dashboard/admin/createproduct" className="list-group-item list-group-item-action">
          <i className="fas fa-box-open me-2" style={{ color: "green" }}></i> Create Product
        </NavLink>
        <NavLink to="/dashboard/admin/product" className="list-group-item list-group-item-action">
          <i className="fas fa-shopping-bag me-2" style={{ color: "purple" }}></i> Products
        </NavLink>
        <NavLink to="/dashboard/admin/orders" className="list-group-item list-group-item-action">
          <i className="fas fa-shopping-cart me-2" style={{ color: "orange" }}></i> Orders
        </NavLink>
        <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">
          <i className="fas fa-users me-2" style={{ color: "red" }}></i> Users
        </NavLink>
        <NavLink to="/dashboard/admin/craousel" className="list-group-item list-group-item-action">
          <i className="fas fa-users me-2" style={{ color: "red" }}></i> Create Craousel
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;
