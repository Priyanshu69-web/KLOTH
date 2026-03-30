import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminMenu from "../../commponets/Layouts/AdminMenu";
import Layout from "../../commponets/Layouts/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
import toast from "react-hot-toast";
import TableSkeleton from "../../commponets/Feedback/TableSkeleton";
import StateMessage from "../../commponets/Feedback/StateMessage";
import { buildApiUrl } from "../../utils/api";
import { getErrorMessage } from "../../utils/error";
const { Option } = Select;

const AdminOrders = () => {
  const [status] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusUpdating, setStatusUpdating] = useState("");
  const [pageError, setPageError] = useState("");
  const [auth] = useAuth();
  const getOrders = async () => {
    setLoading(true);
    setPageError("");
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      const message = getErrorMessage(error, "Failed to load orders");
      setPageError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    setStatusUpdating(orderId);
    try {
      await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to update order status"));
    } finally {
      setStatusUpdating("");
    }
  };
  return (
    <Layout title={"All Orders Data"}>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>
          {pageError ? (
            <StateMessage
              title="Unable to load orders"
              message={pageError}
              variant="danger"
              actionLabel="Retry"
              onAction={getOrders}
            />
          ) : null}
          {loading ? <TableSkeleton rows={5} columns={6} /> : null}
          {orders?.map((o, i) => {
            return (
              <div className="border shadow" key={o._id}>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col"> date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                          disabled={statusUpdating === o._id}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>{o?.buyer?.username}</td>
                      <td>{moment(o?.createdAt).fromNow()}</td>
                      <td>{o?.payment.success ? "Success" : "Failed"}</td>
                      <td>{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  {o?.products?.map((p, i) => (
                    <div className="row mb-2 p-3 card flex-row" key={p._id}>
                      <div className="col-md-4">
                        <img
                          src={buildApiUrl(`/api/v1/product/product-image/${p._id}`)}
                          className="card-img-top"
                          alt={p.name}
                          width="100px"
                          height={"100px"}
                        />
                      </div>
                      <div className="col-md-8">
                        <p>{p.name}</p>
                        <p>{p.description.substring(0, 30)}</p>
                        <p>Price : {p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
