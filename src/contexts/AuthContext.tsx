import { createContext, useState, useEffect, ReactNode } from "react";
import { Users } from "@/interfaces/user";
import instance from "@/axios/services";
import bcrypt from "bcryptjs";
import { toast } from "react-toastify"; // Import toast từ react-toastify

interface AuthContextType {
  isAuthenticated: boolean;
  user: Users | null;
  loading: boolean;
  register: (
    email: string,
    password: string,
    fullname: string
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<string | null>; // Update return type
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  loading: true,
  register: async () => {},
  login: async () => null, // Updated return type
  logout: () => {},
});

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<Users | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const user = JSON.parse(token);

          // Kiểm tra và lấy lại thông tin người dùng từ API nếu cần thiết
          const { data } = await instance.get(`/users?email=${user.email}`);
          const currentUser = data.length > 0 ? data[0] : null;

          if (currentUser) {
            // Lưu thông tin người dùng vào state và context
            setUser(currentUser);
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
            setUser(null);
          }
        } catch (error) {
          console.error("Lỗi xác thực người dùng:", error);
          setIsAuthenticated(false);
          setUser(null);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
      const { data } = await instance.get(`/users?email=${email}`);
      return data.length > 0;
    } catch (error) {
      console.error("Lỗi kiểm tra email:", error);
      return false;
    }
  };
  const login = async (email: string, password: string): Promise<string | null> => {
    setLoading(true);
    try {
      const emailExists = await checkEmailExists(email);
      if (!emailExists) {
        throw new Error("Email không tồn tại");
      }
  
      const { data } = await instance.get(`/users?email=${email}`);
  
      if (data.length > 0) {
        const user = data[0];
        const isPasswordCorrect = await comparePassword(password, user.password);
  
        if (isPasswordCorrect) {
          localStorage.setItem("token", JSON.stringify(user));
          setUser(user);
          setIsAuthenticated(true);
          return user.role;
        } else {
          throw new Error("Sai mật khẩu");
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
        throw new Error("Sai email hoặc mật khẩu");
      }
    } catch (error: any) { // Định kiểu 'error' là 'any'
      console.error("Đăng nhập không thành công:", error.message);
      toast.error(`Đăng nhập không thành công. ${error.message}`);
      setIsAuthenticated(false);
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  };
  


  const register = async (
    email: string,
    password: string,
    fullname: string
  ): Promise<void> => {
    setLoading(true);
    try {
      const emailExists = await checkEmailExists(email);
      if (emailExists) {
        throw new Error("Email đã tồn tại");
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const { data } = await instance.post("/users", {
        email,
        password: hashedPassword,
        fullname,
      });
  
      let newUser = { ...data };
      if (!newUser.role) {
        newUser = { ...newUser, role: "client" };
      }
  
      localStorage.setItem("token", JSON.stringify(newUser));
      setUser(newUser);
      setIsAuthenticated(true);
    } catch (error: any) {
      console.error("Đăng ký không thành công:", error.message);
      toast.error(`Đăng ký không thành công. ${error.message}`);
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, loading, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

// Hàm so sánh password sử dụng bcrypt
const comparePassword = async (
  inputPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(inputPassword, hashedPassword);
};
