import "./Websiteproduct.scss";

interface CustomCSSProperties extends React.CSSProperties {
  "--position"?: string;
}

const Websiteproduct = () => {
  return (
    <div className="banner">
      <div
        className="slider-products"
        style={{ "--quantity": "10" } as CustomCSSProperties}
      >
        <img
          className="item"
          style={{ "--position": "1", width:'70%' } as CustomCSSProperties}
          src="../../../public/item1..png"
          alt=""
        />
        <img
          className="item"
          style={{ "--position": "2" , width: '70%' } as CustomCSSProperties}
          src="../../../public/item2.png"
          alt=""
        />
        <img
          className="item"
          style={{ "--position": "3", width: '70%' } as CustomCSSProperties}
          src="../../../public/item3.png"
          alt=""
        />
        <img
          className="item"
          style={{ "--position": "4", width: '60%' } as CustomCSSProperties}
          src="../../../public/item4.png"
          alt=""
        />
        <img
          className="item"
          style={{ "--position": "5", width: '70%' } as CustomCSSProperties}
          src="../../../public/item5.png"
          alt=""
        />
        <img
          className="item"
          style={{ "--position": "6" } as CustomCSSProperties}
          src="../../../public/item6.png"
        />
        <img
          className="item"
          style={{ "--position": "7", width: '70%' } as CustomCSSProperties}
          src="../../../public/item7.png"
          alt=""
        />
        <img
          className="item"
          style={{ "--position": "8", width: '70%' } as CustomCSSProperties}
          src="../../../public/item8.png"
          alt=""
        />
        <img
          className="item"
          style={{ "--position": "9", width: '40%'} as CustomCSSProperties}
          src="../../../public/item9.png"
          alt=""
        />
        <img
          className="item"
          style={{ "--position": "10", width: '60%' } as CustomCSSProperties}
          src="../../../public/item10.png"
          alt=""
        />
      </div>
      <div className="content">
        <div className="author">
          <h2>Cực hót</h2>
          <p>
            <b>Mua điện thoại ngay</b>
          </p>
          <p>Để có cơ hội săn vé euro cùng các cầu thủ</p>
        </div>
        {/* <div className="model"></div> */}
      </div>
    </div>
  );
};

export default Websiteproduct;
