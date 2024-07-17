import React, { useEffect } from "react";
import { Products } from "../interface/product";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../validators/validatorsFrom";
import { Category } from "../interface/category";
import { instace } from "../api";

type Props = {
  onSubmit: (data: Products | Category) => void;
  categorys: Category[];
};

const ProductFrom = ({ onSubmit, categorys }: Props) => {
  const { id } = useParams();
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<Products>({
    resolver: zodResolver(productSchema),
  });
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const { data } = await instace.get(`/products/${id}`);
        reset(data);
      }
    };

    fetchData();
  }, [id, reset]);
  return (
    <div className="edit-addProduct">
      <form onSubmit={handleSubmit((data) => onSubmit({ ...data, id }))}>
        <h1>{id ? "Edit product" : "Add Product"}</h1>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Brand
          </label>
          <select
            id="category"
            className="form-control"
            {...register("category")}
          >
            {categorys.map((item) => (
              <option key={id}>{item.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className="text-danger">{errors.title.message}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="images" className="form-label">
            Image
          </label>
          <input
            type="text"
            className="form-control"
            {...register("images", { required: true })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">
            Quantity
          </label>
          <input
            type="text"
            className="form-control"
            {...register("quantity", { required: true, valueAsNumber: true })}
          />
          {errors.quantity && (
            <span className="text-danger">{errors.quantity.message}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="text"
            className="form-control"
            {...register("price", { required: true, valueAsNumber: true })}
          />
          {errors.price && (
            <span className="text-danger">{errors.price.message}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            rows={4}
            {...register("description")}
          />
        </div>
        <div className="mb-3">
          <button className="btn btn-primary w-100">
            {id ? "Edit product" : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductFrom;
