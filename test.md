

            <div className="col col-1" data-label="ID">
                {product.id}
              </div>
              <div className="col col-2" data-label="Tên sản phẩm">
                {product.title}
              </div>
              <div className="col col-3" data-label="Hình ảnh">
                <img src="{product.image}" alt="" />
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

