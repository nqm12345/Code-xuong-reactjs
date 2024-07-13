import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "@/contexts/AuthContext";
import { Users } from "@/interfaces/user";
import { toast, ToastContainer } from "react-toastify"; // Import toast và ToastContainer từ react-toastify
import "react-toastify/dist/ReactToastify.css"; // CSS cho react-toastify

import "./Login.scss";

const validLogin = z.object({
  email: z.string().email("Yêu cầu phải đúng định dạng email"),
  password: z.string().min(6, "Password tối thiểu 6 kí tự"),
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Users>({ resolver: zodResolver(validLogin) });

  const onSubmit = async (data: Users) => {
    try {
      const { email, password } = data;
      const role = await login(email, password);

      if (role === "admin") {
        setTimeout(() => {
          navigate("/admin");
        }, 2000);
        toast.success("Đăng nhập thành công. Bạn là admin.");
      } else if (role === "client") {
        setTimeout(() => {
          navigate("/");
        }, 2000);
        toast.success("Đăng nhập thành công. Bạn là client.");
      }
      // Không cần xử lý role === null vì đã được xử lý trong AuthContextProvider
    } catch (error: any) {
      console.error("Đăng nhập không thành công:", error.message);
      // Nếu không thành công, AuthContextProvider sẽ hiển thị toast.error, ở đây chỉ cần log lỗi
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container-login">
      <div className="left">
        <div className="header">
          <h2 className="animation a1">Welcome to the website</h2>
          <h4 className="animation a2">
            Sign up for an account to immediately have an account to shop for
            gas stationery
          </h4>
        </div>
        <div className="form">
          <input
            type="email"
            id="email"
            className={`form-field animation a4 ${errors.email ? "is-invalid" : ""}`}
            placeholder="Vui lòng nhập email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
          <input
            type="password"
            id="password"
            className={`form-field animation a4 ${errors.password ? "is-invalid" : ""}`}
            placeholder="Vui lòng nhập mật khẩu"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
          <p className="animation a5">
            <a href="#">Forgot Password</a>
          </p>
          <button type="submit" className="animation a6">
            Đăng nhập
          </button>
        </div>
      </div>
      <div className="right"></div>

      {/* ToastContainer để hiển thị Toast */}
      <ToastContainer />
    </form>
  );
};

export default Login;
