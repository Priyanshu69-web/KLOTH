import React, { useEffect, useState } from "react";
import Layout from "../../commponets/Layouts/Layout";
import AdminMenu from "../../commponets/Layouts/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";

//  Users Component
const Users = () => {
  const [users, setUsers] = useState([]);

  // Get Users
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-users");
      if (data?.success) {
        setUsers(data?.users);
      }
    } catch (error) {
      console.log(error);
      toast.error("User Loading Failed");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Layout title="Users">
      <div className="container mt-5 bg-light shadow-lg p-4 rounded-2xl">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-primary text-uppercase mb-4">User List</h1>
            <div className="card shadow-sm p-3">
              <table className="table table-hover table-bordered">
                <thead className="table-primary">
                  <tr>
                    <th scope="col">User Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Address</th>
                    <th scope="col">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((user) => (
                    <tr key={user._id}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.address}</td>
                      <td>{user.role === 1 ? "Admin" : "User"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
