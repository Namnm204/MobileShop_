import { useState } from "react";
import { Link } from "react-router-dom";
import { Users } from "../../interface/users";

const UserManagement = ({
  users,
  onLockUser,
}: {
  users: Users[];
  onLockUser: (userId: string) => void;
}) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  if (!Array.isArray(users)) {
    return <div>Không có dữ liệu người dùng.</div>;
  }

  const handleLockUser = async (userId: string) => {
    try {
      await onLockUser(userId);
      setMessage("Khóa tài khoản thành công");
      setError("");
    } catch (err) {
      setMessage("");
      setError("Có lỗi xảy ra khi khóa tài khoản");
    }
  };

  return (
    <div className="relative d-flex flex-column align-items-center mt-4">
      <h2 className="text-2xl font-bold mb-4">Quản lý tài khoản</h2>
      <div className="absolute right-0 w-3/4 mr-4">
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
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.length ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <Link
                      to={`/admin/user-edit/${user._id}`}
                      className="btn btn-warning mx-2"
                    >
                      Sửa
                    </Link>
                    <button
                      onClick={() => handleLockUser(user._id!)}
                      className="btn btn-danger mx-2"
                      disabled={user.isLocked}
                    >
                      {user.isLocked ? "Đã khóa" : "Khóa"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>Không có dữ liệu người dùng.</td>
              </tr>
            )}
          </tbody>
        </table>
        {message && <div className="alert alert-success mt-3">{message}</div>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>
    </div>
  );
};

export default UserManagement;
