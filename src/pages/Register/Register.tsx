import "./Register.scss";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Users } from "@/interfaces/user";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

const validRegister = z.object({
  fullname: z.string().nonempty("Không được để trống fullname"),
  email: z.string().email("Yêu cầu phải đúng định dạng email"),
  password: z.string().min(6, "Password tối thiểu 6 kí tự"),
});

const Register = () => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<Users>({
    resolver: zodResolver(validRegister),
  });
  const { register: registerUser } = useContext(AuthContext);

  const onSubmit = async (data: Users) => {
    try {
      await registerUser(data.email!, data.password!);
      setSuccessMessage("Đăng ký tài khoản thành công");
      setErrorMessage(null);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      setErrorMessage(
        error.response?.data || "Đăng ký tài khoản không thành công"
      );
      setSuccessMessage(null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      method="post"
      id="register-form"
      className="register-form"
      autoComplete="off"
      role="main"
    >
      <h1 className="a11y-hidden">Register Form</h1>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div>
        <label className="label-email">
          <input
            type="text"
            className="text"
            id="fullname"
            placeholder="Vui lòng nhập tên"
            {...register("fullname", { required: true })}
          />
          {errors.fullname && (
            <p className="text-danger">{errors.fullname.message}</p>
          )}
          <span className="required">Full name</span>
        </label>
      </div>
      <div>
        <label className="label-email">
          <input
            type="email"
            className="text"
            id="email"
            placeholder="Vui lòng nhập email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
          <span className="required">Email</span>
        </label>
      </div>
      <input
        type="checkbox"
        name="show-password"
        className="show-password a11y-hidden"
        id="show-password"
      />
      <label className="label-show-password" htmlFor="show-password">
        <span>Show Password</span>
      </label>
      <div>
        <label className="label-password">
          <input
            type="password"
            className="text"
            id="password"
            placeholder="Vui lòng nhập mật khẩu"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password && (
            <p className="text-danger">{errors.password?.message}</p>
          )}
          <span className="required">Password</span>
        </label>
      </div>
      <input className="button-submit" type="submit" />
      <div className="email">
        <a href="#">Forgot password?</a>
      </div>
      <figure aria-hidden="true">
        <div className="person-body" />
        <div className="neck skin" />
        <div className="head skin">
          <div className="eyes" />
          <div className="mouth" />
        </div>
        <div className="hair" />
        <div className="ears" />
        <div className="shirt-1" />
        <div className="shirt-2" />
      </figure>
    </form>
  );
};

export default Register;
