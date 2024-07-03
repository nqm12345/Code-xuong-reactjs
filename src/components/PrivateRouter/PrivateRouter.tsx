import { AuthContext } from "@/contexts/AuthContext";
import AccessDenied from "@/pages/AccessDenied/AccessDenied";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  // console.log("PrivateRouter is rendering");

  const { isAuthenticated, user, loading } = useContext(AuthContext);

  // console.log("loading:", loading);
  // console.log("isAuthenticated:", isAuthenticated);
  // console.log("User data:", user);

  if (loading) {
    // Hiển thị thông báo hoặc spinner khi đang kiểm tra xác thực
    return <div>Loading...</div>;
  }

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" />;
  // }

  // Kiểm tra xem user có tồn tại và có thuộc tính role hay không
  if (!user || !user.role) {
    // console.error("Dữ liệu người dùng không hợp lệ");
    return <AccessDenied />;
  }

  // console.log("User role:", user.role);

  // Nếu user không phải là admin, từ chối truy cập
  if (user.role !== "admin") {
    // console.error("Người dùng không có quyền truy cập");
    return <AccessDenied />;
  }

  return <Outlet />;
};

export default PrivateRouter;
