import "./AddProduct.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { Product } from "@/interfaces/product";
import { ProductContext } from "@/contexts/ProductContext";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import instance from "@/axios/services";

const { VITE_CLOUD_NAME, VITE_UPLOAD_PRESET } = import.meta.env;

// Define the validation schema using Zod
const validAdd = z.object({
  title: z.string().min(6, "Tên sản phẩm tối thiểu 6 kí tự"),
  newprice: z.number().min(0, "Giá sản phẩm phải là số và lớn hơn 0"),
  desc: z.string().nonempty("Vui lòng nhập mô tả sản phẩm"),
});

const AddProduct = () => {
  const { dispatch } = useContext(ProductContext);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>({
    resolver: zodResolver(validAdd),
  });

  const uploadImage = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", VITE_UPLOAD_PRESET);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${VITE_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const responseData = await response.json();
      console.log("Cloudinary response:", responseData); // In dữ liệu phản hồi từ Cloudinary

      if (!response.ok) {
        throw new Error(`Failed to upload image to Cloudinary: ${responseData.message || responseData.error.message}`);
      }

      return responseData.secure_url;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error uploading image to Cloudinary:", error.message);
      } else {
        console.error("An unknown error occurred during image upload.");
      }
      throw error;
    }
  };

  const onSubmit: SubmitHandler<Product> = async (data) => {
    try {
      const imageFile = (document.getElementById("image") as HTMLInputElement)?.files?.[0];
      if (imageFile) {
        const imageUrl = await uploadImage(imageFile);
        data.image = imageUrl; // Gán URL ảnh vào trường image của dữ liệu sản phẩm
      }

      const response = await instance.post("/products", data);
      dispatch({ type: "ADD_PRODUCT", payload: response.data });
      setSuccessMessage("Thêm sản phẩm thành công!");
      navigate("/admin/product");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error adding product:", error.message);
      } else {
        console.error("An unknown error occurred while adding the product.");
      }
      setSuccessMessage("Có lỗi khi thêm sản phẩm!");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Thêm sản phẩm</h2>
        <div className="form-group">
          <label htmlFor="title">Tên sản phẩm</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Vui lòng nhập tên sản phẩm"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-danger">{errors.title.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="newprice">Giá sản phẩm</label>
          <input
            type="number" // Đổi type từ text thành number
            inputMode="numeric" // Hỗ trợ bàn phím số trên mobile
            className="form-control"
            id="newprice"
            placeholder="Vui lòng nhập giá sản phẩm"
            {...register("newprice", {
              required: true,
              valueAsNumber: true,
            })}
          />
          {errors.newprice && (
            <p className="text-danger">{errors.newprice.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="image">Vui lòng tải lên hình ảnh</label>
          <input type="file" className="form-control" id="image" />
          {errors.image && (
            <p className="text-danger">{errors.image.message}</p>
          )}
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
      {successMessage && <p className="text-success">{successMessage}</p>}
    </div>
  );
};

export default AddProduct;
