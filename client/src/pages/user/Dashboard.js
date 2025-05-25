import React from "react";
import Layout from "../../commponets/Layouts/Layout";

import { useAuth } from "../../context/auth";
import UserMenu from "../../commponets/Layouts/UserMenu";

const AdminDashboard = () => {
    const [auth] = useAuth();
    return (
        <Layout title="User Dashboard">
            <div className="container mt-5 bg-light shadow-lg p-4 rounded-2xl">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="card shadow-sm p-4 rounded-2xl">
                            <h2 className="text-primary text-uppercase mb-4 text-center">User Profile</h2>
                            <div className="card-body">
                                <div className="mb-3">
                                    <h4>
                                        <i className="fas fa-user me-2"></i> Name:
                                        <span className="text-muted">
                                            {auth?.user?.username
                                                ? auth.user.username.charAt(0).toUpperCase() + auth.user.username.slice(1)
                                                : "Unknown"}
                                        </span>
                                    </h4>

                                </div>
                                <div className="mb-3">
                                    <h4><i className="fas fa-envelope me-2"></i> Email: <span className="text-muted">{auth?.user?.email}</span></h4>
                                </div>
                                <div className="mb-3">
                                    <h4><i className="fas fa-phone me-2"></i> Contact: <span className="text-muted">{auth?.user?.phone}</span></h4>
                                </div>
                                <div className="mb-3">
                                    <h4><i className="fas fa-phone me-2"></i> Address: <span className="text-muted">{auth?.user?.address}</span></h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>

    );
};
export default AdminDashboard;
