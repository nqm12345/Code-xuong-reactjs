import instance from "@/axios/services";
import { createContext, useState, useEffect, ReactNode } from "react";
import { Users } from "@/interfaces/user"; // Import interface Users

interface AuthContextType {
  isAuthenticated: boolean;
  user: Users | null;
  loading: boolean;
  register: (email: string, password: string, fullname: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  loading: true,
  register: async () => {},
  login: async () => {},
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
          const { data } = await instance.get("/users", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          console.log("API response data:", data); // Kiểm tra dữ liệu trả về từ API

          const currentUser = data.find((user: Users) => user.role);
          if (currentUser) {
            setUser(currentUser);
            setIsAuthenticated(true);
          } else {
            console.error("Dữ liệu người dùng không có thuộc tính role hoặc không tìm thấy người dùng");
            setIsAuthenticated(false);
            setUser(null);
          }
        } catch (error) {
          console.error(error);
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

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data } = await instance.post("/login", { email, password });
      console.log("Login response data:", data); // Kiểm tra dữ liệu trả về khi đăng nhập

      if (data.accessToken) {
        localStorage.setItem("token", data.accessToken);
        setUser(data.user);
        setIsAuthenticated(true);
      } else {
        console.error("Không nhận được token hợp lệ từ server");
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Đăng nhập không thành công:", error);
      setIsAuthenticated(false);
      setUser(null);
    }
    setLoading(false);
  };

  const register = async (email: string, password: string, fullname: string) => {
    setLoading(true);
    try {
      const { data } = await instance.post("/register", { email, password, fullname });
      console.log("Register response data:", data); // Kiểm tra dữ liệu trả về khi đăng ký

      localStorage.setItem("token", data.accessToken);
      setUser(data.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
      setUser(null);
    }
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
