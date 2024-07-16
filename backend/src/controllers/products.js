import Products from "../models/products.js";
import Joi from "joi";

const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().min(0).required(),
  brand: Joi.string().required(),
  description: Joi.string().required(),
  quantity: Joi.number().min(0).default(0).required(),
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
  const products = await Products.findById(req.params.id).populate(
    "categoryId"
  );
  if (!products) {
    return res.json({ message: "không có sản phẩm nào có id như vậy" });
  }
  return res.json({ message: "tìm thấy sản phẩm", products });
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
