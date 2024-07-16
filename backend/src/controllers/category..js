import Category from "../models/category.js";

export const getAllCategory = async (req, res) => {
  const category = await Category.find();
  if (category.length === 0) {
    return res.json({ message: "không có danh mục nào" });
  }
  return res.json({ message: "DANH MỤC", category });
};

export const getById = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.json({ message: "không có danh mục nào có id như vậy" });
  }
  return res.json({ message: "tìm thấy danh mục", category });
};

export const CreateCategory = async (req, res) => {
  const category = req.body;
  Category.create(category)
    .then((data) => {
      res.json({ message: "thêm danh mục thành công", data });
    })
    .catch((err) => {
      res.json({ message: "thêm danh mục thất bại", error: err });
    });
};

export const updateCategory = async (req, res) => {
  const id = req.params.id;
  if (id) {
    const data = req.body;
    if (data != {}) {
      Category.findByIdAndUpdate(id, data, { new: true }).then((data) => {
        res.json({ message: "sửa danh mục thành công", data });
      });
    }
  }
};

export const RemoveCategory = async (req, res) => {
  const id = req.params.id;
  Category.findByIdAndDelete(id).then((data) => {
    res.json({ message: "xóa thành công", data });
  });
};
