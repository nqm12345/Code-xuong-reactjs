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
            <Link to="/">Logo</Link>
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
              <a href="#" className="desktop-item">
                Danh mục
              </a>
              <input type="checkbox" id="showMega" />
              <label htmlFor="showMega" className="mobile-item">
                Danh mục
              </label>
              {/* <div className="mega-box">
                <div className="content">
                  <div className="row">
                    <img
                      src="https://i.etsystatic.com/39484203/r/il/ee9357/5347357974/il_fullxfull.5347357974_f3d0.jpg"
                      alt=""
                    />
                  </div>
                  <div className="row">
                    <header>Design Services</header>
                    <ul className="mega-links">
                      <li>
                        <a href="#">Graphics</a>
                      </li>
                      <li>
                        <a href="#">Vectors</a>
                      </li>
                      <li>
                        <a href="#">Business cards</a>
                      </li>
                      <li>
                        <a href="#">Custom logo</a>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    <header>Email Services</header>
                    <ul className="mega-links">
                      <li>
                        <a href="#">Personal Email</a>
                      </li>
                      <li>
                        <a href="#">Business Email</a>
                      </li>
                      <li>
                        <a href="#">Mobile Email</a>
                      </li>
                      <li>
                        <a href="#">Web Marketing</a>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    <header>Security services</header>
                    <ul className="mega-links">
                      <li>
                        <a href="#">Site Seal</a>
                      </li>
                      <li>
                        <a href="#">VPS Hosting</a>
                      </li>
                      <li>
                        <a href="#">Privacy Seal</a>
                      </li>
                      <li>
                        <a href="#">Website design</a>
                      </ul>
                    </div>
                  </div>
                </div> */}
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
