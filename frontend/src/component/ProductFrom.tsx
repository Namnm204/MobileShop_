import React, { useEffect, useState } from "react";
import { Products } from "../interface/product";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../validators/validatorsFrom";
import { Category } from "../interface/category";
import { instace } from "../api";

const ProductFrom = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
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
      if (_id) {
        const { data } = await instace.get(`/products/${_id}`);
        reset(data.product || data);
      }
    };

    fetchData();
    fetchCategory();
  }, [_id, reset]);

  const handleFormSubmit = async (data: Products) => {
    try {
      if (_id) {
        await instace.put(`/products/${_id}`, data);
        alert("Sửa sản phẩm thành công");
      } else {
        await instace.post(`/products`, data);
        alert("Thêm sản phẩm thành công");
      }
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
    }
  };

  const [category, setCategory] = useState<Category[]>([]);
  const fetchCategory = async () => {
    try {
      const { data } = await instace.get(`/category`);
      setCategory(data.category || data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <div className="edit-addProduct">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <h1>{_id ? "Edit product" : "Add Product"}</h1>
        <div className="mb-3">
          <label htmlFor="categoryId" className="form-label">
            Category
          </label>
          <select
            id="categoryId"
            className="form-control"
            {...register("categoryId")}
          >
            {category.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-danger">{errors.name.message}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            type="text"
            className="form-control"
            {...register("image", { required: true })}
          />
          {errors.image && (
            <span className="text-danger">{errors.image.message}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">
            Quantity
          </label>
          <input
            type="number"
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
            type="number"
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
            {_id ? "Edit product" : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductFrom;
