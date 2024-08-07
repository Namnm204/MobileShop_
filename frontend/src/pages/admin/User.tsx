import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Users } from "../../interface/users";

interface UserManagementProps {
  users: Users[];
  onLockUser: (userId: string, lock: boolean) => void;
}

const UserManagement = ({ users, onLockUser }: UserManagementProps) => {
  const [userList, setUserList] = useState<Users[]>(users);

  useEffect(() => {
    setUserList(users);
  }, [users]);

  return (
    <div className="d-flex flex-column align-items-center mt-4">
      <h2 className="text-2xl font-bold mb-4">Quản lý tài khoản</h2>
      <div className="w-80">
        <table
          className="table table-bordered table-striped text-center"
          border={2}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên tài khoản</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user, index: number) => (
              <tr key={index}>
                <td className="p-4">{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.isLocked ? "Bị khóa" : "Hoạt động"}</td>
                <td>
                  <Link
                    to={`/admin/user-edit/${user._id}`}
                    className="btn btn-warning mx-2"
                  >
                    Sửa
                  </Link>
                  <button
                    className={`btn ${
                      user.isLocked ? "btn-success" : "btn-danger"
                    } mx-2`}
                    onClick={() => onLockUser(user._id!, !user.isLocked)}
                  >
                    {user.isLocked ? "Mở khóa" : "Khóa"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
