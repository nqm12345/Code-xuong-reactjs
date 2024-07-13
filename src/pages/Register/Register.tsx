import "./Register.scss";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Users } from "@/interfaces/user";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify"; // Import toast từ react-toastify

const validRegister = z.object({
  fullname: z.string().nonempty("Không được để trống fullname"),
  email: z.string().email("Yêu cầu phải đúng định dạng email"),
  password: z.string().min(6, "Password tối thiểu 6 kí tự"),
});

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Users>({
    resolver: zodResolver(validRegister),
  });
  const { register: registerUser } = useContext(AuthContext);

  const onSubmit = async (data: Users) => {
    try {
      await registerUser(data.email!, data.password!, data.fullname!);
      toast.success("Đăng ký tài khoản thành công");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      console.error("Đăng ký tài khoản không thành công:", error.message);
      // Kiểm tra nếu lỗi là "Email đã tồn tại"
      if (error.message.includes("Email đã tồn tại")) {
        toast.error("Email đã được sử dụng. Vui lòng chọn email khác.");
      } else {
        toast.error(`Đăng ký tài khoản không thành công. ${error.message}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container-register">
      <div className="left">
        <div className="header">
          <h2 className="animation a1">Welcome to the website</h2>
          <h4 className="animation a2">
            Sign up for an account to immediately have an account to shop for gas stationery
          </h4>
        </div>
        <div className="form">
          <input
            type="text"
            id="fullname"
            className={`form-field animation a3 ${errors.fullname ? "is-invalid" : ""}`}
            placeholder="Vui lòng nhập tên"
            {...register("fullname")}
          />
          {errors.fullname && (
            <p className="text-danger">{errors.fullname.message}</p>
          )}
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
            Đăng ký
          </button>
        </div>
      </div>
      <div className="right"></div>
      <ToastContainer />
    </form>
  );
};

export default Register;
