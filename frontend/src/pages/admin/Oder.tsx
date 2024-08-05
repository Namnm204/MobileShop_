import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { Order } from "../../interface/oder";

// Fetch orders from the API
const fetchOrders = async () => {
  const { data } = await axios.get("http://localhost:8080/oders"); // Đảm bảo đường dẫn API đúng
  return data.data; // Trả về trường 'data' từ phản hồi API
};

// Update order status
const updateOrderStatus = async ({ orderId, status }) => {
  await axios.put(`http://localhost:8080/oders/${orderId}`, { status });
};

const OrderList = () => {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ["oders"],
    queryFn: fetchOrders,
  });

  // Handle delete order
  const deleteMutation = useMutation({
    mutationFn: async (orderId) => {
      await axios.delete(`http://localhost:8080/oders/${orderId}`); // Đảm bảo đường dẫn API đúng
      queryClient.invalidateQueries(["oders"]);
    },
    onSuccess: () => {
      alert("Order deleted successfully");
    },
    onError: (error) => {
      alert("Failed to delete order: " + error.message);
    },
  });

  // Handle status update
  const statusMutation = useMutation({
    mutationFn: async ({ orderId, status }) => {
      await updateOrderStatus({ orderId, status });
      queryClient.invalidateQueries(["oders"]);
    },
    onSuccess: () => {
      alert("Order status updated successfully");
    },
    onError: (error) => {
      alert("Failed to update order status: " + error.message);
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleStatusChange = (orderId, newStatus) => {
    statusMutation.mutate({ orderId, status: newStatus });
  };

  return (
    <div>
      <div className="d-flex mt-4">
        <h1 className="mt-5">Management</h1>
        <div className="table-responsive">
          {" "}
          <h1 className="mt-5">Quản Lý Đơn Hàng</h1>
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã đơn hàng</th>
                <th>Đơn giá</th>

                <th>Tên người dùng</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Trạng thái</th>
                <th>Thanh Toán</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((order: Order, index: number) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{order.oderNumber}</td>
                  <td>{order.totalPrice} Đ</td>

                  <td>{order.customerInfo.username}</td>
                  <td>{order.customerInfo.email}</td>
                  <td>
                    {order.customerInfo.phone || "người dùng chưa cập nhật"}
                  </td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className={`form-select ${
                        order.status === "Pending"
                          ? "bg-warning"
                          : order.status === "Processing"
                          ? "bg-info"
                          : order.status === "Shipped"
                          ? "bg-primary"
                          : order.status === "Delivered"
                          ? "bg-yellow"
                          : "bg-red"
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Canceled">Canceled</option>
                    </select>
                  </td>
                  <td>{order.customerInfo.payment || "N/A"}</td>
                  <td>
                    <Link
                      to={`/admin/oders/${order._id}`}
                      className="btn btn-info btn-sm me-2"
                    >
                      View
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteMutation.mutate(order._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
