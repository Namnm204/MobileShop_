// src/pages/AdminOderDetail.tsx
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import OrderDetail from "../../component/Oder";

const fetchOrderDetail = async (id: string) => {
  const { data } = await axios.get(`http://localhost:8080/oders/${id}`);
  return data.data; // Trả về trường 'data' từ phản hồi API
};

const AdminOderDetail = () => {
  const { id } = useParams<{ id?: string }>(); // Get the order ID from URL
  const {
    data: order,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["orderDetail", id],
    queryFn: () => {
      if (!id) {
        throw new Error("Order ID is required");
      }
      return fetchOrderDetail(id);
    },
    enabled: !!id, 
  });

  if (isLoading) return <p className="text-center">Đang tải...</p>;
  if (error)
    return <p className="text-center text-danger">Lỗi: {error.message}</p>;
  if (!order) return <p className="text-center">Không tìm thấy dữ liệu</p>;

  return (
    <AdminLayout>
      <OrderDetail order={order} />
    </AdminLayout>
  );
};

export default AdminOderDetail;
