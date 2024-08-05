import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

const fetchOrderDetail = async (id: string) => {
  const { data } = await axios.get(`http://localhost:8080/oders/${id}`);
  return data.data; // Trả về trường 'data' từ phản hồi API
};

const OrderDetail = () => {
  const { id } = useParams(); // Lấy ID đơn hàng từ URL
  const {
    data: order,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["orderDetail", id],
    queryFn: () => fetchOrderDetail(id),
  });

  if (isLoading) return <p className="text-center">Đang tải...</p>;
  if (error)
    return <p className="text-center text-danger">Lỗi: {error.message}</p>;
  if (!order) return <p className="text-center">Không tìm thấy dữ liệu</p>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Chi Tiết Đơn Hàng</h1>
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Mã Đơn Hàng: {order.oderNumber}</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h5>Thông Tin Khách Hàng</h5>
              <div className="mb-3">
                <p>
                  <strong>Tên:</strong> {order.customerInfo.username}
                </p>
                <p>
                  <strong>Email:</strong> {order.customerInfo.email}
                </p>
                <p>
                  <strong>Số điện thoại:</strong>{" "}
                  {order.customerInfo.phone || "Chưa cung cấp"}
                </p>
                <p>
                  <strong>Thành phố:</strong>{" "}
                  {order.customerInfo.city || "Chưa cung cấp"}
                </p>
                <p>
                  <strong>Phương thức thanh toán:</strong>{" "}
                  {order.customerInfo.payment || "N/A"}
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <h5>Tổng Giá</h5>
              <p className="display-4">{order.totalPrice} Đ</p>
              <h5>Trạng Thái</h5>
              <span
                className={`badge ${
                  order.status === "Pending"
                    ? "bg-warning"
                    : order.status === "Processing"
                    ? "bg-info"
                    : order.status === "Shipped"
                    ? "bg-primary"
                    : order.status === "Delivered"
                    ? "bg-success"
                    : "bg-danger"
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>
          <div className="mt-4">
            <h5>Danh Sách Sản Phẩm</h5>
            <ul className="list-group">
              {order.items.map((item, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{item.name}</strong>
                    <br />
                    Giá: {item.price} Đ
                    <br />
                    Số lượng: {item.quantity}
                  </div>
                  <span className="badge bg-secondary rounded-pill">
                    Tổng: {item.price * item.quantity} Đ
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
