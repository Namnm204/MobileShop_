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
