import { Product } from "@/interfaces/product";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ProductDetail.scss";
const ProductDetail = () => {
  const location = useLocation();

  const product: Product = location.state;
  const [slideIndex, setSlideIndex] = useState(0);

  const plusSlides = (n: number) => {
    let newIndex = slideIndex + n;
    if (newIndex > 4) {
      newIndex = 0;
    } else if (newIndex < 0) {
      newIndex = 4;
    }
    setSlideIndex(newIndex);
  };

  const currentSlide = (n: number) => {
    if (n > 4) {
      n = 0;
    } else if (n < 0) {
      n = 4;
    }
    setSlideIndex(n);
  };

  const showSlides = () => {
    let slides = document.getElementsByClassName(
      "mySlides"
    ) as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < slides.length; i++) {
      if (i !== slideIndex) {
        slides[i].style.display = "none";
      } else {
        slides[i].style.display = "block";
      }
    }
  };

  useEffect(() => {
    showSlides();
  }, [slideIndex]);
  return (
    <div>
      <div className="ctsp-product-name">
        <h5 className="product-name">{product.title}</h5>
        <div className="ctsp-start">⭐ ⭐ ⭐ ⭐ ⭐</div>
      </div>
      <div className="boxs-ctsp">
        <div className="box-ctsps">
          <div className="slideshow-container">
            <div className="mySlides fade">
              <div className="numbertext">1 / 3</div>
              {product.thumbnail && product.thumbnail.length >= 3 && (
                <img
                  src={product.thumbnail[0]}
                  style={{ width: "100%", height: "100%" }}
                  alt="Slide 3"
                />
              )}
            </div>

            <div className="mySlides fade">
              <div className="numbertext">2 / 3</div>
              <img src={product.image} style={{ width: "50%" }} alt="Slide 1" />
            </div>

            <div className="mySlides fade">
              <div className="numbertext">3 / 5</div>
              {product.thumbnail && product.thumbnail.length >= 3 && (
                <img
                  src={product.thumbnail[1]}
                  style={{ width: "50%", height: "100%" }}
                  alt="Slide 3"
                />
              )}
            </div>

            <div className="mySlides fade">
              <div className="numbertext">4 / 5</div>
              {product.thumbnail && product.thumbnail.length >= 3 && (
                <img
                  src={product.thumbnail[2]}
                  style={{ width: "100%", height: "100%" }}
                  alt="Slide 3"
                />
              )}
            </div>

            <div className="mySlides fade">
              <div className="numbertext">5 / 5</div>
              {product.thumbnail && product.thumbnail.length >= 3 && (
                <img
                  src={product.thumbnail[3]}
                  style={{ width: "50%" }}
                  alt="Slide 3"
                />
              )}
            </div>

            <a className="prev" onClick={() => plusSlides(-1)}>
              &#10094;
            </a>
            <a className="next" onClick={() => plusSlides(1)}>
              &#10095;
            </a>

            <div style={{ textAlign: "center" }}>
              <span className="dot" onClick={() => currentSlide(5)}></span>
              <span className="dot" onClick={() => currentSlide(1)}></span>
              <span className="dot" onClick={() => currentSlide(2)}></span>
              <span className="dot" onClick={() => currentSlide(3)}></span>
              <span className="dot" onClick={() => currentSlide(4)}></span>
            </div>
          </div>
        </div>
        <div className="box-ctsp2">
          <div className="capacity-version">
            <div className="capacity-versions">
              <h6 className="ctsp-capacity">128GB</h6>
              <h6 className="capacity-price">28.990.000đ</h6>
            </div>
            <div className="capacity-versions">
              <h6 className="ctsp-capacity">256GB</h6>
              <h6 className="capacity-price">32.990.000đ</h6>
            </div>
            <div className="capacity-versions">
              <h6 className="ctsp-capacity">512GB</h6>
              <h6 className="capacity-price">36.990.000đ</h6>
            </div>
          </div>
          <div className="ctsp-text-color">
            <h6 className="text-color">Chọn màu sắc</h6>
            <div className="box-color-sps">
              <div className="box-color-sp" onClick={() => currentSlide(1)}>
                <div className="mySlides fade "></div>
                <div className="color-sp2">
                  <h6 className="text-color-price">Xám</h6>
                  <h6 className="price-color">39.180.000đ</h6>
                </div>
                <div className="img-small">
                  <img
                    src={product.image}
                    alt=""
                    width={"40px"}
                    height={"40px"}
                  />
                </div>
              </div>
              <div className="box-color-sp" onClick={() => currentSlide(2)}>
                <div className="mySlides fade "></div>
                <div className="color-sp2">
                  <h6 className="text-color-price">Xám</h6>
                  <h6 className="price-color">39.180.000đ</h6>
                </div>
                <div className="img-small">
                  {product.thumbnail && product.thumbnail.length >= 3 && (
                    <img
                      src={product.thumbnail[1]}
                      style={{ width: "40px", height: "40px" }}
                    />
                  )}
                </div>
              </div>
              <div className="box-color-sp" onClick={() => currentSlide(4)}>
                <div className="mySlides fade "></div>
                <div className="color-sp2">
                  <h6 className="text-color-price">Xám</h6>
                  <h6 className="price-color">39.180.000đ</h6>
                </div>
                <div className="img-small">
                  {product.thumbnail && product.thumbnail.length >= 3 && (
                    <img
                      src={product.thumbnail[3]}
                      style={{ width: "40px", height: "40px" }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="old-new-price">
            <div className="border-old-new-price1">
              <div className="border-old-new-prices1">
                <div className="ti-github"></div>
              </div>
              <div className="border-old-new-prices2">
                <h6 className="text-prices2">26.000.000đ</h6>
                <h6 className="text-prices3">Khi thu cũ lên đời</h6>
              </div>
            </div>
            <div className="border-old-new-price2">
              <div className="new-price">{product.newprice}</div>
              <s className="old-price">{product.oldprice}</s>
            </div>
          </div>
          <div className="button-add-card">
            <div className="ti-credit-card"></div>
            <div className="button-add-card-text">ADD CARD</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
