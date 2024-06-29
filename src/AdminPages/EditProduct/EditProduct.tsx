import { useForm, SubmitHandler } from "react-hook-form";
import { Product } from "@/interfaces/product";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import instance from "@/axios/services";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductContext } from "@/contexts/ProductContext";

const { VITE_CLOUD_NAME, VITE_UPLOAD_PRESET } = import.meta.env;

const validEdit = z.object({
  title: z.string().min(6, "Tên sản phẩm tối thiểu 6 kí tự"),
  newprice: z.preprocess(
    (val) => parseFloat(val as string),
    z.number().min(0, "Giá sản phẩm phải là số và lớn hơn 0")
  ),
  image: z.string().optional(),
  desc: z.string().nonempty("Vui lòng nhập mô tả sản phẩm"),
});

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const { dispatch } = useContext(ProductContext);
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Product>({
    resolver: zodResolver(validEdit),
  });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get(`/products/${id}`);
        setProduct(data);
        setCurrentImage(data.image);
        reset(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    })();
  }, [id, reset]);

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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to upload image to Cloudinary: ${errorData.message}`
        );
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error uploading image to Cloudinary:", error.message);
        throw error;
      } else {
        console.error("Unexpected error:", error);
        throw new Error("Unexpected error occurred");
      }
    }
  };

  // EditProduct.tsx
  const onSubmit: SubmitHandler<Product> = async (data) => {
    try {
      const imageFile = (document.getElementById("image") as HTMLInputElement)
        ?.files?.[0];
      if (imageFile) {
        const imageUrl = await uploadImage(imageFile);
        data.image = imageUrl;
      } else {
        data.image = currentImage || "";
      }

      await instance.put(`/products/${id}`, data);
      dispatch({
        type: "UPDATE_PRODUCT",
        payload: { ...data, id: Number(id) },
      });
      navigate("/admin/product");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error updating product:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Chỉnh sửa sản phẩm</h2>
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
            type="number"
            className="form-control"
            id="newprice"
            placeholder="Vui lòng nhập giá sản phẩm"
            {...register("newprice")}
          />
          {errors.newprice && (
            <p className="text-danger">{errors.newprice.message}</p>
          )}
        </div>
        {currentImage && (
          <div className="form-group">
            <label>Hình ảnh hiện tại</label>
            <img
              src={currentImage}
              alt="Current Product"
              className="img-fluid"
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="image">Tải lên hình ảnh mới</label>
          <input type="file" className="form-control" id="image" />
          {errors.image && (
            <p className="text-danger">{errors.image.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="desc">Mô tả sản phẩm</label>
          <input
            type="text"
            className="form-control"
            id="desc"
            placeholder="Vui lòng nhập mô tả sản phẩm"
            {...register("desc")}
          />
          {errors.desc && <p className="text-danger">{errors.desc.message}</p>}
        </div>
        <button type="submit" className="btn btn-primary">
          Cập nhật
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
