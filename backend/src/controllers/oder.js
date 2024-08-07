import Oder from "../models/oder.js";

export const createOder = async (req, res) => {
  try {
    const { userId, items, totalPrice, customerInfo } = req.body;
    const oder = await Oder.create({ userId, items, totalPrice, customerInfo });
    return res.json({ message: "Tạo đơn hàng thành công", oder });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Tạo đơn hàng thất bại", error });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    Oder.find().then((data) => {
      res.json({ message: "Danh sách đơn hàng", data });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  const id = req.params.id;
  if (id) {
    Oder.findById(id).then((data) => {
      if (!data) return res.status(404).json({ message: "Order not found" });
      res.json({ message: "Chi tiết đơn hàng", data });
    });
  }
};

export const updateOrder = async (req, res) => {
  const id = req.params.id;
  if (id) {
    const data = req.body;
    try {
      const updatedOrder = await Oder.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (updatedOrder) {
        res.json({ message: "Sửa đơn hàng thành công", data: updatedOrder });
      } else {
        res.status(404).json({ message: "Đơn hàng không tìm thấy" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Có lỗi xảy ra khi cập nhật đơn hàng",
        error: error.message,
      });
    }
  } else {
    return res.status(400).json({ message: "Thiếu thông tin cập nhật" });
  }
};

export const deleteOrder = async (req, res) => {
  const id = req.params.id;
  if (id) {
    try {
      const data = await Oder.findByIdAndDelete(id);
      res.status(200).json({ message: "Xóa đơn hàng thành công", data });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  } else {
    res.status(400).json({ message: "Thiếu thông tin xóa" });
  }
};
