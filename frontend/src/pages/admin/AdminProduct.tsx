import React from "react";
import AdminLayout from "./layouts/AdminLayout";
import { useEffect, useState } from "react";
import { instace } from "../../api";
import { Products } from "../../interface/product";
import Product from "./Product";

const AdminProduct = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const fetchProducts = async () => {
    const { data } = await instace.get(`/products`);
    setProducts(data.products || data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const handleRemove = async (id: number | string) => {
    if (confirm("Bạn chắc chắn muốn xóa không")) {
      await instace.delete(`/products/${id}`);
      setProducts(products.filter((item) => item._id !== id));
    }
  };
  return (
    <AdminLayout>
      <Product products={products} onRemove={handleRemove}></Product>
    </AdminLayout>
  );
};

export default AdminProduct;
