import "./Customer.scss";

const Customer = () => {
  return (
    <div className="img-background">
      <div className="main-customer">
      <div className="container_left">
        <h1>Cảm nhận của khách hàng</h1>
        <p>Có hơn 4.8K lượt phản hồi tích cực từ khách hàng cho chúng tôi</p>
        <p>
          Sản phẩm và dịch vụ được đánh giá cao trên bảng xếp hạng Website bán
          hàng
        </p>
        <button>Read our success stories</button>
      </div>
      <div className="container_right">
        <div className="card-feedback">
          <img src="../../../public/item1..png" alt="user" />
          <div className="card_content">
            <span>
              <i className="ri-double-quotes-l"></i>
            </span>
            <div className="card-details">
              <p>
                Tôi rất hài lòng với sản phẩm. Tại đây nhân viên phục vụ và hỗ
                trợ rất nhiệt tình, tôi sẽ quay lại để mua nhiều sản phẩm hơn.
              </p>
              <h4>Cristiano Ronaldo</h4>
            </div>
          </div>
        </div>
        <div className="card-feedback">
          <img src="../../../public/item2.png" alt="user" />
          <div className="card_content">
            <span>
              <i className="ri-double-quotes-l"></i>
            </span>
            <div className="card-details">
              <p>
                Sản phẩm ở đây rất đáng bỏ tiền ra để mua, chất lượng sản phẩm
                tốt, tôi sẽ giới thiệu cho gia đình và bạn bè của mình.
              </p>
              <h4>Luka Modrić</h4>
            </div>
          </div>
        </div>
        <div className="card-feedback">
          <img src="../../../public/item5.png" alt="user" />
          <div className="card_content">
            <span>
              <i className="ri-double-quotes-l"></i>
            </span>
            <div className="card-details">
              <p>
                Thật không thể tin nổi tôi đã sở hữu cho mình một chiếc điện
                thoại thông minh, có hệ điều hành cũng như là công nghệ hiện đại
                đến vậy.
              </p>
              <h4>Kylian Mbappé</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Customer;
