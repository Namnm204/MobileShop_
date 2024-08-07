import { useEffect, useState } from "react";
import { Users } from "../../interface/users";
import { instace } from "../../api";
import AdminLayout from "./layouts/AdminLayout";
import UserManagement from "./User";
import axios from "axios";

const AdminUsers = () => {
  const [users, setUsers] = useState<Users[]>([]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/user`);
      setUsers(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error("Lỗi khi lấy người dùng:", error);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLockUser = async (userId: string, lock: boolean) => {
    try {
      const endpoint = lock ? `/user/lock/${userId}` : `/user/unlock/${userId}`;
      await instace.post(endpoint);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isLocked: lock } : user
        )
      );
    } catch (error) {
      console.error("Lỗi khi khóa/mở khóa tài khoản:", error);
    }
  };

  return (
    <AdminLayout>
      <UserManagement users={users} onLockUser={handleLockUser} />
    </AdminLayout>
  );
};

export default AdminUsers;
