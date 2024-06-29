import "./Footer.scss";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="row">
          <div className="col">
            <img src="../../../public/apple1_800x450.png" className="logo" />
            <p>
              {" "}
              Với đường nét đơn giản nhưng tinh tế, logo Apple tạo nên một ấn
              tượng mạnh mẽ ngay từ cái nhìn đầu tiên. Đó là sự kết hợp hoàn hảo
              giữa nghệ thuật và công nghệ.
            </p>
          </div>
          <div className="col">
            <h3>Office <div className="underline"><span></span></div></h3>
            <p>Số 1 Trịnh Văn Bô - Nam Từ Liêm - Thành phố Hà Nội</p>
            <p className="email-id">minhnqph40837@fpt.edu.vn</p>
            <h4>+84 0123456789</h4>
          </div>
          <div className="col">
            <h3>Links <div className="underline"><span></span></div></h3>
            <ul>
              <li>
                <a href="">Home</a>
              </li>
              <li>
                <a href="">Services</a>
              </li>
              <li>
                <a href="">About Us</a>
              </li>
              <li>
                <a href="">Features</a>
              </li>
              <li>
                <a href="">Contacts</a>
              </li>
            </ul>
          </div>
          <div className="col">
            <h3>Newsletter <div className="underline"><span></span></div></h3>
            <div className="form-email">
              <input type="email" placeholder="Enter your email id" required />
              <button type="submit">
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
            <div className="social-icons">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-whatsapp"></i>
              <i className="fab fa-pinterest"></i>
            </div>
          </div>
        </div>
        <hr />
        <p className="copyright">© 2024 Saitama Shop. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Footer;
