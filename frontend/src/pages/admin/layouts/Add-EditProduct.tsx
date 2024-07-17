import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { useNavigate } from "react-router-dom";
import { instace } from "../../../api";
import { Products } from "../../../interface/product";
import ProductFrom from "../../../component/ProductFrom";
import { Category } from "../../../interface/category";

const AddEditProduct = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const nav = useNavigate();
  const fetchProducts = async () => {
    const { data } = await instace.get(`/products`);
    setProducts(data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchCategory = async () => {
    const { data } = await instace.get(`/category`);
    setCategory(data);
  };
  useEffect(() => {
    fetchCategory();
  }, []);
  const onSubmitProduct = async (data: Products | Category) => {
    if (data.id) {
      await instace.put(`/products/${data.id}`, data);
      const newData = await instace.get("/products");
      setProducts(newData.data);
    } else {
      const res = await instace.post(`/products`, data);
      setProducts([...products, res.data]);
    }
    if (confirm("Succesfull, redirect to admin page?")) {
      nav("/admin/product");
    }
  };
  return (
    <AdminLayout>
      <ProductFrom
        onSubmit={onSubmitProduct}
        categorys={category}
      ></ProductFrom>
    </AdminLayout>
  );
};

export default AddEditProduct;
