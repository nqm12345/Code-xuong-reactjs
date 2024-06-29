import { useForm, SubmitHandler } from "react-hook-form";
import { Product } from "@/interfaces/product";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import instance from "@/axios/services";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductContext } from "@/contexts/ProductContext";

const validEdit = z.object({
  title: z.string().min(6, "Tên sản phẩm tối thiểu 6 kí tự"),
  newprice: z.preprocess(
    (val) => parseFloat(val as string),
    z.number().min(0, "Giá sản phẩm phải là số và lớn hơn 0")
  ),
  image: z.string().nonempty("Vui lòng nhập đường link ảnh sản phẩm"),
  desc: z.string().nonempty("Vui lòng nhập mô tả sản phẩm"),
});

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const { state, dispatch } = useContext(ProductContext);
  const [product, setProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

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
        reset(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    })();
  }, [id, reset]);

  const onSubmit: SubmitHandler<Product> = async (data) => {
    try {
      await instance.put(`/products/${id}`, data);
      dispatch({ type: "UPDATE_PRODUCT", payload: { ...data, id: Number(id) } });
      navigate("/admin/product");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Product Edit</h2>
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
        <div className="form-group">
          <label htmlFor="image">Đường link ảnh sản phẩm</label>
          <input
            type="text"
            className="form-control"
            id="image"
            placeholder="Vui lòng nhập đường link ảnh sản phẩm"
            {...register("image")}
          />
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
          {errors.desc && (
            <p className="text-danger">{errors.desc.message}</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary">Cập nhật</button>
      </form>
    </div>
  );
};

export default EditProduct;
