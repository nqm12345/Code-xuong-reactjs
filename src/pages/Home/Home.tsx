import React, { useContext, useState } from "react";
import "./Home.scss";
import { useNavigate } from "react-router-dom";
import { Product } from "@/interfaces/product";
import { ProductContext } from "@/contexts/ProductContext";

const HomePage = () => {
  const { state } = useContext(ProductContext);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const itemsPerPage = 6;

  const handleRender = (product: Product) => {
    navigate(`/product-detail/${product.id}`, { state: product });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset current page when searching
  };

  const handlePriceRange = (event: React.ChangeEvent<HTMLInputElement>, type: "min" | "max") => {
    const value = event.target.value === "" ? Infinity : parseFloat(event.target.value);
    setPriceRange((prevRange) => ({
      ...prevRange,
      [type]: isNaN(value) ? prevRange[type] : value,
    }));
    setCurrentPage(1); // Reset current page when adjusting price range
  };

  // Lọc sản phẩm theo tên và giá
  const filteredProducts = state.products.filter(
    (product: Product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      product.newprice >= priceRange.min &&
      product.newprice <= priceRange.max
  );

  // Tính toán chỉ số bắt đầu và kết thúc của sản phẩm trên trang hiện tại
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Tính tổng số trang
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      {/* <div className="filter-bar">
        <label>
          Giá từ:
          <input
            type="number"
            placeholder="Min"
            onChange={(e) => handlePriceRange(e, "min")}
          />
        </label>
        <label>
          Đến:
          <input
            type="number"
            placeholder="Max"
            onChange={(e) => handlePriceRange(e, "max")}
          />
        </label>
      </div> */}
      <div className="container1">
        {currentProducts.map((product: Product, index: number) => (
          <div key={index} className="card-container">
            <div onClick={() => handleRender(product)} className="card">
              <div className="card__img">
                <img src={product.image} alt="" />
              </div>
              <div className="card__name">
                <p>{product.title}</p>
              </div>
              <div className="card__precis">
                <a href="#" className="card__icon">
                  <i className="bx bx-heart"></i>
                </a>
                <div>
                  <div className="card__preci card__preci-before">{product.oldprice}</div>
                  <div className="card__preci card__preci-now">{product.newprice}</div>
                </div>
                <a href="#" className="card__icon">
                  <i className="bx bx-cart-alt" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => changePage(index + 1)}
            className={index + 1 === currentPage ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
