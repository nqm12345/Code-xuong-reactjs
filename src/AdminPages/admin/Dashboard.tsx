import React, { useContext } from "react";
import "./Dashboard.scss";
import { Link } from "react-router-dom";
import { ProductContext } from "@/contexts/ProductContext";
import instance from "@/axios/services";

const Dashboard = () => {
  const { state, dispatch } = useContext(ProductContext);

  const handleDelete = async (id: number) => {
    const isConfirm = window.confirm(
      `Bạn có chắc muốn xóa sản phẩm ${id} này không?`
    );
    if (isConfirm) {
      try {
        await instance.delete(`/products/${id}`);
        dispatch({ type: "DELETE_PRODUCT", payload: id });
        console.log(`Sản phẩm với id ${id} đã được xóa thành công`);
      } catch (error) {
        console.error("Có lỗi khi xóa sản phẩm!", error);
      }
    }
  };

  return (
    <div>
      <div className="container3">
        <h2>
          Danh sách sản phẩm<small>Triggers on 767px</small>
        </h2>
        <Link to="/admin/add" className="btn btn-success">
          Thêm sản phẩm
        </Link>
        <ul className="responsive-table">
          <li className="table-header">
            <div className="col col-1">Hình ảnh</div>
            <div className="col col-2">ID</div>
            <div className="col col-3">Tên sản phẩm</div>
            <div className="col col-4">Giá</div>
            <div className="col col-5">Mô tả</div>
            <div className="col col-6">Hành động</div>
          </li>
          {state.products.map((product: any) => (
            <li className="table-row" key={product.id}>
              <div className="col col-1" data-label="Hình ảnh">
                <img
                  src={product.image}
                  alt=""
                  width={"100px"}
                  height={"100px"}
                />
              </div>
              <div className="col col-2" data-label="ID">
                {product.id}
              </div>
              <div className="col col-3" data-label="Tên sản phẩm">
                {product.title}
              </div>
              <div className="col col-4" data-label="Giá">
                {product.newprice}
              </div>
              <div className="col col-5" data-label="Mô tả">
                {product.desc}
              </div>
              <div className="col col-6" data-label="Hành động">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(product.id)}
                >
                  Xóa
                </button>{" "}
                <Link
                  to={`/admin/edit/${product.id}`}
                  className="btn btn-warning"
                >
                  Sửa
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
