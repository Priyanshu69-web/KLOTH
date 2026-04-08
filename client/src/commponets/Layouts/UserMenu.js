import React from "react";
import { NavLink } from "react-router-dom";
import { FaBagShopping, FaRegAddressCard, FaUser } from "react-icons/fa6";

const UserMenu = () => {
  const links = [
    { to: "/dashboard/user", label: "Overview", icon: <FaUser /> },
    { to: "/dashboard/user/profile", label: "Profile", icon: <FaRegAddressCard /> },
    { to: "/dashboard/user/orders", label: "Orders", icon: <FaBagShopping /> },
  ];

  return (
    <div className="dashboard-nav">
      <div className="dashboard-nav__eyebrow">Your Space</div>
      <h2 className="dashboard-nav__title">User Panel</h2>
      <p className="dashboard-nav__text">Review your profile details, account activity, and recent purchases.</p>
      <div className="dashboard-nav__links">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/dashboard/user"}
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

export default UserMenu;
