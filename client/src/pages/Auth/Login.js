import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";


import Layout from "../../commponets/Layouts/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // Form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", { email, password });

      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //Google Login 
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const decodedToken = jwtDecode(credentialResponse.credential);

      const res = await axios.post("/api/v1/auth/google-login", {
        token: credentialResponse.credential,
      });

      if (res && res.data.success) {
        toast.success(res.data.message);

        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);

      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Layout title="Login - Ecommer App">
        <div className="form-container" style={{ minHeight: "90vh" }}>
          <form onSubmit={handleSubmit}>
            <h4 className="title">LOGIN FORM</h4>

            <div className="mb-3">
              <input
                type="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Enter Your Email"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Enter Your Password"
                required
              />
            </div>
            <div className="mb-3">
              <button
                type="button"
                className="btn forgot-btn"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password
              </button>
            </div>
            <button type="submit" className="btn mb-3 btn-primary">
              LOGIN
            </button>
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => toast.error("Google login failed")}
            />
          </form>
        </div>
      </Layout>
    </GoogleOAuthProvider>
  );
};

export default Login;
