import React, { useState, useEffect } from "react";
import UserMenu from "../../commponets/Layouts/UserMenu";
import Layout from "../../commponets/Layouts/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title="Your Orders">
      <div className="container-fluid p-4 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h2 className="text-center mb-4 text-primary">Your Orders</h2>
            {orders.length === 0 ? (
              <div className="alert alert-info text-center">No orders found.</div>
            ) : (
              orders.map((order, index) => (
                <div className="card shadow-sm mb-4" key={order._id}>
                  <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">Order #{index + 1}</h5>
                  </div>
                  <div className="card-body">
                    <table className="table table-bordered">
                      <thead className="table-light">
                        <tr>
                          <th>Status</th>
                          <th>Buyer</th>
                          <th>Date</th>
                          <th>Payment</th>
                          <th>Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><span className={`badge bg-${order.status === 'Delivered' ? 'success' : 'warning'}`}>{order.status || "N/A"}</span></td>
                          <td>{order?.buyer?.username?.toUpperCase() || "UNKNOWN"}</td>
                          <td>{moment(order?.createdAt).format("MMMM Do YYYY, h:mm a")}</td>
                          <td>{order?.payment?.success ? <span className="text-success">Success</span> : <span className="text-danger">Failed</span>}</td>
                          <td>{order?.products?.length || 0}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="row">
                      {order.products?.map((product) => (
                        <div className="col-md-6 d-flex align-items-stretch" key={product._id}>
                          <div className="card border-0 shadow-sm mb-3 w-100">
                            <div className="row g-0 h-100">
                              <div className="col-md-4 d-flex align-items-center">
                                <img
                                  src={`/api/v1/product/product-image/${product._id}`}
                                  className="img-fluid rounded-start"
                                  alt={product.name}
                                />
                              </div>
                              <div className="col-md-8 d-flex align-items-center">
                                <div className="card-body">
                                  <h6 className="card-title">{product.name}</h6>
                                  <p className="card-text text-muted">{product.description?.substring(0, 50)}...</p>
                                  <p className="card-text fw-bold">Price: ₹{product.price}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
