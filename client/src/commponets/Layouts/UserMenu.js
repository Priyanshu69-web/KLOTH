import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
    return (
        <div className="text-center">
            <div className="list-group dashboard-menu">
                <h1>User Panel</h1>
                <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">
                    <i className="fas fa-list me-2 fa-user" style={{color:""}}></i> User Profile
                </NavLink>
                <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">
                <i className="fas fa-list me-2 fa-shopping-cart" style={{color:""}}></i> User Orders
                </NavLink>
                {/* <NavLink to="/user/wishlist" className="list-group-item list-group-item-action">
                <i className="fas fa-list me-2" style={{color:""}}></i> User Wishlist
                </NavLink>
                <NavLink to="/user/settings" className="list-group-item list-group-item-action">
                <i className="fas fa-list me-2" style={{color:""}}></i>
                User Settings
                </NavLink> */}
            </div>
        </div>
    );
};

export default UserMenu;
