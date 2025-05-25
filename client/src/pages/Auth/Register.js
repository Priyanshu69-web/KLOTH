import React, { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";


import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import Layout from "../../commponets/Layouts/Layout";


const Register = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    e.preventDefault();
    try {
      // Ensure all fields are filled out
      if (!username || !email || !password || !phone || !address || !answer) {
        toast.error("All fields are required.");
        return;
      }

      const res = await axios.post("/api/v1/auth/register", {
        username,
        email,
        password,
        phone,
        address,
        answer,
      });
      // console.log(res.data);
      if (res && res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);

      } else {
        toast.success(res.data.message);
      }
    }
    catch (error) {
      // console.log(error.response.data); 
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (


    <Layout title="Register - Ecommer App">
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">REGISTER FORM</h4>
          <div className="mb-3">
            <input
              type="text"
              value={username}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="username"
              placeholder="Enter Your User Name"
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="phone"
              placeholder="Enter Your Phone"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="address"
              placeholder="Enter Your Address"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="answer"
              placeholder="What is Your Favorite Animal"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            REGISTER
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
