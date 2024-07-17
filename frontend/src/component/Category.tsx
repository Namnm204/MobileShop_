import React, { useEffect } from "react";
import { Category } from "../interface/category";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategorySchema } from "../validators/validatorsFrom";
import { instace } from "../api";

type Props = {
  onSubmit: (data: Category) => void;
};

const CategoryFrom = ({ onSubmit }: Props) => {
  const { id } = useParams();
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<Category>({
    resolver: zodResolver(CategorySchema),
  });
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const { data } = await instace.get(`/category/${id}`);
        reset(data);
      }
    };
    fetchData();
  }, [id, reset]);
  return (
    <div className="edit-addProduct">
      <form onSubmit={handleSubmit((data) => onSubmit({ ...data, id }))}>
        <h1>{id ? "Edit Category" : "Add Category"}</h1>
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
            {id ? "Edit Category" : "Add Category"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryFrom;
