import React, { useEffect, useState } from "react";
import HomeLayout from "./HomeLayout/HomeLayout";
import RegisterFrom from "../admin/auth/Register";
import { Users } from "../../interface/users";
import { instace } from "../../api";
import { useNavigate } from "react-router-dom";

const RegisterHome = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const fetchUsers = async () => {
    const { data } = await instace.get(`/register`);
    setUsers(data);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const nav = useNavigate();
  const onSubmit = async (data: Users) => {
    console.log(data);
    try {
      const res = await instace.post(`/register`, data);
      setUsers([...users, res.data]);
      if (confirm("Đăng kí tài khoản thành công!")) {
        nav("/login");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data || "Đăng kí thất bại! Email đã tồn tại");
    }
  };
  return (
    <div>
      <HomeLayout>
        <RegisterFrom onSubmit={onSubmit}></RegisterFrom>
      </HomeLayout>
    </div>
  );
};

export default RegisterHome;
