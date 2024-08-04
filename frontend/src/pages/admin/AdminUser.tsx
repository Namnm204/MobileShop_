import { useEffect, useState } from "react";
import { Users } from "../../interface/users";
import { instace } from "../../api";
import AdminLayout from "./layouts/AdminLayout";
import UserManagement from "./User";

const AdminUsers = () => {
  const [users, setUsers] = useState<Users[]>([]);

  const fetchUsers = async () => {
    try {
      const { data } = await instace.get(`/user`);
      setUsers(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error("Lỗi khi lấy người dùng:", error);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLockUser = async (userId: string) => {
    try {
      await instace.post(`/user/lock/${userId}`);
      // Cập nhật trạng thái của người dùng trong danh sách
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isLocked: true } : user
        )
      );
    } catch (error) {
      console.error("Lỗi khi khóa tài khoản:", error);
      throw error;
    }
  };

  return (
    <AdminLayout>
      <UserManagement users={users} onLockUser={handleLockUser} />
    </AdminLayout>
  );
};

export default AdminUsers;
