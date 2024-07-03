import "./About.scss";

const AboutPage = () => {
  return (
    <section className="about-us">
      <div className="main-img">
        <img
          src="https://d1nxzqpcg2bym0.cloudfront.net/google_play/com.iphone.wallpapers.wallpapers.for.iphone/193c7c48-4015-11ee-bc71-69572dc887f1/640"
          alt=""
        />
      </div>

      <div className="text">
        <h4>About</h4>
        <h1>
          Rất vui được chào mừng quý khách <br />
          Cảm ơn quý khách đã đến Saitama Shop
        </h1>
        <hr />
        <p>
          Chào mừng bạn đến với Saitama Shop, điểm đến hàng đầu của bạn cho
          những chiếc iPhone chất lượng và dịch vụ khách hàng tuyệt vời. Chúng
          tôi tự hào cung cấp những sản phẩm iPhone mới nhất với giá cả cạnh
          tranh, cùng với cam kết mang đến trải nghiệm mua sắm trực tuyến an
          toàn và tiện lợi. Tại Saitama Shop, chúng tôi hiểu rằng việc chọn lựa
          một chiếc điện thoại không chỉ là việc mua sắm, mà còn là việc tìm
          kiếm một người bạn đồng hành hoàn hảo trong cuộc sống hàng ngày. Với
          đội ngũ nhân viên chuyên nghiệp và nhiệt tình, chúng tôi luôn sẵn sàng
          hỗ trợ bạn trong mọi bước của hành trình mua sắm. Hãy đến với chúng
          tôi và khám phá thế giới công nghệ tiên tiến cùng iPhone!
        </p>
        <div className="last-text">
          <div className="text1">
            <h3>5000+</h3>
            <h5>Client</h5>
          </div>
          <div className="text2">
            <h3>23</h3>
            <h5>Website staff</h5>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
