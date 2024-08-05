import Products from "../models/products.js";
import Joi from "joi";
import mongoose from "mongoose";

const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  // categoryId: Joi.string().required(),
  description: Joi.string().required(),
  quantity: Joi.number().required(),
  image: Joi.string().required(),
  categoryId: Joi.string().required(), // Đảm bảo categoryId là bắt buộc
});

export const getAllProducts = async (req, res) => {
  const products = await Products.find().populate("categoryId");
  if (!products) {
    return res.json({ message: "không có sản phẩm nào" });
  }
  return res.json({ message: "DANH SÁCH SẢN PHẨM", products });
};
export const getById = async (req, res) => {
  const id = req.params.id;

  // Kiểm tra định dạng ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID sản phẩm không hợp lệ" });
  }

  try {
    const product = await Products.findById(id).populate("categoryId");

    if (!product) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm với ID này" });
    }

    return res.json({ message: "Tìm thấy sản phẩm", product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const CreateProduct = async (req, res) => {
  const productData = req.body;
  // Xác thực dữ liệu đầu vào
  const { error } = productSchema.validate(productData);
  if (error) {
    return res.status(400).json({ message: "thiếu dữ liệu đầu vào", error });
  }
  try {
    Products.create(productData).then((data) => {
      return res.json({ message: "Sản phẩm được tạo thành công", data });
    });
  } catch (error) {
    return res.status(500).json({ message: "Không tạo được sản phẩm", error });
  }
};

export const updateProduct = async (req, res) => {
  const id = req.params.id;
  if (id) {
    const data = req.body;
    if (data != {}) {
      Products.findByIdAndUpdate(id, data, { new: true }).then((data) => {
        res.json({ message: "sửa thành công", data });
      });
    }
  }
};

export const RemoveProduct = async (req, res) => {
  const id = req.params.id;
  Products.findByIdAndDelete(id).then((data) => {
    res.json({ message: "xóa thành công", data });
  });
};

export const searchProducts = async (req, res) => {
  try {
    // Lấy query từ tham số truy vấn
    const query = req.query.query || "";

    // Tìm kiếm sản phẩm theo tên, không phải _id
    const products = await Products.find({
      name: { $regex: query, $options: "i" },
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
