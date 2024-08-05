import HomeLayout from "./HomeLayout/HomeLayout";
import { Users } from "../../interface/users";
import { instace } from "../../api";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Login from "../admin/auth/Login";

const LoginHome = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const nav = useNavigate();

  const fetchUsers = async () => {
    try {
      const { data } = await instace.get(`/login`);
      setUsers(data.users);
    } catch (error) {
      console.log("Loi:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onSubmit = async (data: Users) => {
    try {
      const res = await instace.post(`/login`, data);
      console.log(res);

      if (res.data.user.isLocked) {
        alert("Tài khoản của bạn đã bị khóa.");
        return;
      } else {
        localStorage.setItem("user", JSON.stringify(res.data));
        setUsers([...users, res.data]);
        if (confirm("Đăng nhập thành công! Quay lại trang chủ")) {
          nav("/");
        }
      }
    } catch (error) {
      console.log("Lỗi:", error);
      alert("Đăng nhập thất bại! Email hoặc mật khẩu không chính xác.");
    }
  };

  return (
    <div>
      <HomeLayout>
        <Login onSubmit={onSubmit} />
      </HomeLayout>
    </div>
  );
};

export default LoginHome;
