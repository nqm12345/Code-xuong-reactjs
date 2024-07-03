import React, { useContext } from "react";
import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <nav>
        <div className="wrapper">
          <div className="logo">
            <Link to="/">Saitama Shop</Link>
          </div>
          <input type="radio" name="slider" id="menu-btn" />
          <input type="radio" name="slider" id="close-btn" />
          <ul className="nav-links">
            <label htmlFor="close-btn" className="btn close-btn">
              <i className="fas fa-times" />
            </label>
            <li>
              <Link to="/">Home</Link>
            </li>
         <li>
          <Link to="/dashboard"> Danh sách sản phẩm</Link>
         </li>
            <li>
              <Link to="/about">About</Link>
            </li>

            {user ? (
              <li className="welcome">
                <img src={user.image} alt={user.fullname} className="user-image" />
                Xin chào: {user.fullname}
                <button onClick={handleLogout} className="log-out">Log out</button>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
          <label htmlFor="menu-btn" className="btn menu-btn">
            <i className="fas fa-bars" />
          </label>
        </div>
      </nav>
    </div>
  );
};

export default Header;
