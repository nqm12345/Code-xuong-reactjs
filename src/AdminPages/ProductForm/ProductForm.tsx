import "./EditProduct.scss";
import { useForm } from "react-hook-form";
import { Product } from "@/interfaces/product";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import instance from "@/axios/services";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const validEdit = z.object({
  title: z.string().min(6, "Tên sản phẩm tối thiểu 6 kí tự"),
  newprice: z.number().min(0, "Giá sản phẩm phải là số và lớn hơn 0"),
  image: z.string().nonempty("Vui lòng nhập đường link ảnh sản phẩm"),
  desc: z.string().nonempty("Vui lòng nhập mô tả sản phẩm"),
});

type Props = {
  handleProduct: (product: Product) => void;
};

const ProductForm = ({ handleProduct }: Props) => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>({
    resolver: zodResolver(validEdit),
  });
  if (id) {
    useEffect(() => {
      (async () => {
        const { data } = await instance.get(`/products/${id}`);
        setProduct(data);
      })();
    }, []);
  }

  return (
    <div className="container6">
      <form
        onSubmit={handleSubmit((product) => handleProduct({ ...product, id }))}
      >
        <h2>{id ? "Edit" :  "Add"} product</h2>
        <div className="form-group">
          <label htmlFor="title">Tên sản phẩm</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Vui lòng nhập tên sản phẩm"
            {...register("title", {
              required: true,
              minLength: 3,
              maxLength: 225,
            })}
            defaultValue={product?.title}
          />
          {errors.title && (
            <p className="text-danger">{errors.title.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="newprice">Giá sản phẩm</label>
          <input
            type="text"
            className="form-control"
            id="newprice"
            placeholder="Vui lòng nhập giá sản phẩm"
            {...register("newprice", { required: true })}
            defaultValue={product?.newprice}
          />
          {errors.newprice && (
            <p className="text-danger">{errors.newprice.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="image">Vui lòng nhập hình ảnh</label>
          <input
            type="text"
            className="form-control"
            id="image"
            placeholder="Vui lòng nhập đường link hình ảnh"
            {...register("image", { required: true })}
            defaultValue={product?.image}
          />
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
            placeholder="Vui lòng nhập tên mô tả"
            {...register("desc", { required: true })}
            defaultValue={product?.desc}
          />
          {errors.desc && <p className="text-danger">{errors.desc.message}</p>}
        </div>
        <button type="submit" className="btn btn-success w-100">
          {id ? "Edit" :  "Add"} product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
