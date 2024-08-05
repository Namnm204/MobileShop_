import { Types } from "mongoose";

// Interface cho thông tin khách hàng
interface CustomerInfo {
  username: string;
  email: string;
  phone?: string;
  payment?: string;
  city?: string;
}

// Interface cho các mặt hàng trong đơn hàng
interface OderItem {
  name: string;
  price: number;
  quantity: number;
}

// Interface cho đơn hàng
export interface Order {
  _id: Types.ObjectId; // ID của đơn hàng
  userId: Types.ObjectId; // ID của người dùng
  items: OderItem[]; // Danh sách các mặt hàng trong đơn hàng
  oderNumber: string; // Mã đơn hàng
  customerInfo: CustomerInfo; // Thông tin khách hàng
  totalPrice: number; // Tổng giá trị đơn hàng
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Canceled"; // Trạng thái của đơn hàng
  createdAt?: Date; // Ngày tạo đơn hàng (tuỳ chọn, nếu cần)
  updatedAt?: Date; // Ngày cập nhật đơn hàng (tuỳ chọn, nếu cần)
}
