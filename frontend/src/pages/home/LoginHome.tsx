import HomeLayout from "./HomeLayout/HomeLayout";
import { Users } from "../../interface/users";
import { instace } from "../../api";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Login from "../admin/auth/Login";

const LoginHome = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const fetchUsers = async () => {
    const { data } = await instace.get(`/login`);
    setUsers(data.users);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const nav = useNavigate();
  const onSubmit = async (data: Users) => {
    console.log(data);
    try {
      const res = await instace.post(`/login`, data);
      localStorage.setItem("user", JSON.stringify(res.data));
      setUsers([...users, res.data]);
      if (confirm("Đăng nhập thành công! Quay lại trang chủ")) {
        nav("/");
      }
    } catch (error) {
      console.log(error);
      alert("Đăng kí thất bại! Email đã tồn tại ");
    }
  };
  return (
    <div>
      <HomeLayout>
        <Login onSubmit={onSubmit}></Login>
      </HomeLayout>
    </div>
  );
};

export default LoginHome;
