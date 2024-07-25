import React, { useEffect, useState } from "react";
import { Category } from "../../interface/category";
import { instace } from "../../api";
import AdminLayout from "./layouts/AdminLayout";
import Categoryy from "./Category";

const AdminCategory = () => {
  const [category, setCategory] = useState<Category[]>([]);
  const fetchCategory = async () => {
    const { data } = await instace.get(`/category`);
    setCategory(data.category);
  };
  useEffect(() => {
    fetchCategory();
  }, []);
  const handleRemove = async (id: any) => {
    if (confirm("Bạn chắc chắn muốn xóa không?")) {
      await instace.delete(`/category/${id}`);
      setCategory(category.filter((item) => item._id !== id));
    }
  };
  return (
    <div>
      <AdminLayout>
        <Categoryy categorys={category} onRemove={handleRemove}></Categoryy>
      </AdminLayout>
    </div>
  );
};

export default AdminCategory;
