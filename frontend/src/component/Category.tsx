import React, { useEffect, useState } from "react";
import { Category } from "../interface/category";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategorySchema } from "../validators/validatorsFrom";
import { instace } from "../api";

type Props = {
  onSubmit: (data: Category) => void;
};

const CategoryFrom = ({ onSubmit }: Props) => {
  const { _id } = useParams();
  const navigate = useNavigate(); // Đặt useNavigate ở đây

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<Category>({
    resolver: zodResolver(CategorySchema),
  });

  const handleFormSubmit = async (data: Category) => {
    try {
      if (_id) {
        await instace.put(`/category/${_id}`, data);
        alert('Sửa sản phẩm thành công');
      } else {
        await instace.post(`/category`, data);
        alert('Thêm sản phẩm thành công');
      }
      navigate("/admin/category");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (_id) {
        const { data } = await instace.get(`/category/${_id}`);
        reset(data.category || data);
      }
    };
    fetchData();
  }, [_id, reset]);

  
  // const [category, setCategory] = useState<Category[]>([]);
  // const fetchCategory = async () => {
  //   try {
  //     const { data } = await instace.get(`/category`);
  //     setCategory(data.category || data);
  //   } catch (error) {
  //     console.error("Error fetching categories:", error);
  //   }
  // };

  return (
    <div className="edit-addProduct">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <h1>{_id ? "Edit Category" : "Add Category"}</h1>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            {...register("name")}
          ></input>
          {errors.name && (
            <span className="text-danger">{errors.name.message}</span>
          )}
        </div>
        <div className="mb-3">
          <button className="btn btn-primary w-100">
            {_id ? "Edit Category" : "Add Category"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryFrom;
