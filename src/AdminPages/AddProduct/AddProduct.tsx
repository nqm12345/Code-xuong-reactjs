import "./AddProduct.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { Product } from "@/interfaces/product";
import { ProductContext } from "@/contexts/ProductContext";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import instance from "@/axios/services"; // Import instance

// Define the validation schema using zod
const validAdd = z.object({
  title: z.string().min(6, "Tên sản phẩm tối thiểu 6 kí tự"),
  newprice: z.preprocess((val) => parseFloat(val as string), z.number().min(0, "Giá sản phẩm phải là số và lớn hơn 0")),
  image: z.string().nonempty("Vui lòng nhập đường link ảnh sản phẩm"),
  desc: z.string().nonempty("Vui lòng nhập mô tả sản phẩm"),
});

const AddProduct = () => {
  const { dispatch } = useContext(ProductContext); // Lấy dispatch từ ProductContext
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>({
    resolver: zodResolver(validAdd),
  });

  const onSubmit: SubmitHandler<Product> = async (data) => {
    try {
      const response = await instance.post("/products", data); // Gửi dữ liệu lên server
      dispatch({ type: "ADD_PRODUCT", payload: response.data }); // Gọi dispatch với action ADD_PRODUCT và payload là dữ liệu sản phẩm mới
      setSuccessMessage("Thêm sản phẩm thành công!"); // Thêm thông báo thành công
      navigate('/admin/product');
    } catch (error) {
      console.error(error);
      setSuccessMessage("Có lỗi khi thêm sản phẩm!"); // Thêm thông báo lỗi
    }
  };

  return (
    <div className="container6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Product Add</h2>
        <div className="form-group">
          <label htmlFor="title">Tên sản phẩm</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Vui lòng nhập tên sản phẩm"
            {...register("title")}
          />
          {errors.title && <p className="text-danger">{errors.title.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="newprice">Giá sản phẩm</label>
          <input
            type="text"
            className="form-control"
            id="newprice"
            placeholder="Vui lòng nhập giá sản phẩm"
            {...register("newprice")}
          />
          {errors.newprice && <p className="text-danger">{errors.newprice.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="image">Vui lòng nhập hình ảnh</label>
          <input
            type="text"
            className="form-control"
            id="image"
            placeholder="Vui lòng nhập đường link hình ảnh"
            {...register("image")}
          />
          {errors.image && <p className="text-danger">{errors.image.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="desc">Mô tả</label>
          <input
            type="text"
            className="form-control"
            id="desc"
            placeholder="Vui lòng nhập mô tả sản phẩm"
            {...register("desc")}
          />
          {errors.desc && <p className="text-danger">{errors.desc.message}</p>}
        </div>
        <button type="submit" className="btn btn-success w-100">
          Thêm sản phẩm
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
