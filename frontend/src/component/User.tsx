import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Users } from "../interface/users";
import { instace } from "../api";
import AdminLayout from "../pages/admin/layouts/AdminLayout";
import { useMutation, useQuery } from "@tanstack/react-query";

const UserEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<Users>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const { data } = await instace.get(`/user/${id}`);
      reset(data.users || data);
      return data;
    },
  });
  const { mutate } = useMutation({
    mutationFn: async (data: Users) => {
      await instace.put(`/user/${id}`, data);
    },
    onSuccess: () => {
      alert("Sửa tài khoản thành công");
      navigate("/admin/users");
    },
  });

  const onSubmit = async (data: Users) => {
    mutate(data);
  };

  if (isLoading) return <div>Đang tải...</div>;
  if (isError) return <div>Loi tải dữ liệu!</div>;

  return (
    <AdminLayout>
      <div className="container d-flex flex-column align-items-center mt-4">
        <h2 className="text-2xl font-bold mb-4">Chỉnh sửa tài khoản</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-75">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Tên tài khoản:
            </label>
            <input
              type="text"
              id="username"
              {...register("username", { required: true })}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Mật Khẩu:
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: true })}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="gender" className="form-label">
              Giới Tính:
            </label>
            <input
              type="text"
              id="gender"
              {...register("gender")}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              địa chỉ:
            </label>
            <input
              type="text"
              id="address"
              {...register("address")}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">
              Số Điện Thoại:
            </label>
            <input
              type="number"
              id="phoneNumber"
              {...register("phoneNumber")}
              className="form-control"
            />
          </div>

          {/* phan quyeenf */}
          <div className="mb-3">
            <label htmlFor="role" className="form-label">
              Vai trò:
            </label>
            <select
              id="role"
              {...register("role", { required: true })}
              className="form-control"
            >
              <option value="admin">Admin</option>
              <option value="user">Người dùng</option>
              {/* Thêm các vai trò khác nếu cần */}
            </select>
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              id="isLocked"
              {...register("isLocked")}
              className="form-check-input"
            />
            <label htmlFor="isLocked" className="form-check-label">
              Tài khoản bị khóa
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Lưu
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default UserEdit;
