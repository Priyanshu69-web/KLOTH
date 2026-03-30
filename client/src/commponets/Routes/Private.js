import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
import PageLoader from "../Feedback/PageLoader";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [checking, setChecking] = useState(true);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      setChecking(true);
      try {
        const res = await axios.get("/api/v1/auth/user-auth");
        setOk(Boolean(res.data.ok));
      } catch (error) {
        setOk(false);
      } finally {
        setChecking(false);
      }
    };

    if (auth?.token) {
      authCheck();
      return;
    }

    setOk(false);
    setChecking(false);
  }, [auth?.token]);

  if (checking) {
    return <PageLoader message="Checking your account..." />;
  }

  return ok ? <Outlet /> : <Spinner />;
}
