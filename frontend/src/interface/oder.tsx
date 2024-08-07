import { Types } from "mongoose";

interface CustomerInfo {
  username: string;
  email: string;
  phone?: string;
  payment?: string;
  city?: string;
}

interface OderItem {
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  items: OderItem[];
  oderNumber: string;
  customerInfo: CustomerInfo;
  totalPrice: number; // Tổng giá trị đơn hàng
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Canceled";
  createdAt?: Date;
  updatedAt?: Date;
}
