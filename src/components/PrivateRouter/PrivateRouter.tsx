// PrivateRouter.tsx

import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";
import AccessDenied from "@/pages/AccessDenied/AccessDenied";

export const AdminPrivateRouter = () => {
  const { isAuthenticated, user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!user || user.role !== "admin") {
    return <AccessDenied />;
  }

  return <Outlet />;
};

export const ClientPrivateRouter = () => {
  const { isAuthenticated, user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!user || user.role !== "client") {
    return <AccessDenied />;
  }

  return <Outlet />;
};
