import Joi from "joi";
import User from "../models/users.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = Joi.object({
  username: Joi.string().required().min(3).max(30).messages({
    string: "Tên phải từ 3 đến 30 ký tự",
    min: "Tên phải từ 3 đến 30 ký tự",
    max: "Tên phải từ 3 đến 30 ký tự",
    required: "Tên không được bỏ trống!",
  }),
  email: Joi.string().email().required().messages({
    string: "Email phải đúng đúng dạng",
    email: "Email phải đúng đúng dạng",
    required: "Email không được đúng trống!",
  }),
  password: Joi.string().required().min(6).messages({
    string: "Mật khẩu phải từ 6 đến 30 ký tự",
    min: "Mật khẩu phải từ 6 đến 30 ký tự",
    max: "Mật khẩu phải từ 6 đến 30 ký tự",
    required: "Mật khẩu không được bỏ trống!",
  }),
});
export const ListUser = (req, res) => {
  const nameString = req.query.username;
  User.find(nameString)
    .then((data) => {
      res.json({ message: "DANH SÁCH TÀI KHOẢN", data });
    })
    .catch((err) => {
      res.json({ message: "lỗi khi tả danh sách tài khoản", err });
    });
};
export const Signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const { error } = userSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.json({
        message: "Thiếu dữ liệu đầu vào",
        error: error.details,
      });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.json({ message: "Email đã tồn tại", email });
    }
    const hashedPassword = await bcryptjs.hash(password, 12);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    newUser.password = undefined;
    res.json({ message: "Đăng ký thành công", newUser });
  } catch (error) {
    res.json({ message: "Có lỗi xảy ra trong quá trình đăng ký", error });
  }
};

export const Login = async (req, res) => {
  const data = req.body;
  const user = await User.findOne({ email: data.email });
  if (!user) return res.json({ message: "Email tài khoản không tồn tại" });

  const checkPassword = await bcryptjs.compare(data.password, user.password);
  if (!checkPassword) return res.json({ message: "Mật khẩu không đúng" });

  const token = jwt.sign(
    {
      userID: user.id,
    },
    "123456",
    { expiresIn: "7d" }
  );
  return res.json({ message: "Đăng nhập thành công", user, token });
};

export const Logout = (req, res) => {
  try {
    // Xóa JWT token khỏi cookie hoặc header
    res.clearCookie("jwt-token"); // Xóa cookie JWT token nếu có
    res.setHeader("Authorization", ""); // Xóa token trong header nếu có

    res.json({ message: "Đăng xuất thành công" });
  } catch (error) {
    res.json({ message: "Có lỗi xảy ra khi đăng xuất", error });
  }
};

export const lockUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isLocked: true },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại." });
    }
    res.json({ message: "Tài khoản đã bị khóa.", user });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server.", error });
  }
};

export const unlockUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isLocked: false },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại." });
    }
    res.json({ message: "Tài khoản đã được mở khóa.", user });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server.", error });
  }
};

// Cập nhật thông tin người dùng
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, role, isLocked } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { username, email, role, isLocked },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại." });
    }

    res.json({ message: "Thông tin người dùng đã được cập nhật.", user });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server.", error });
  }
};
export const getByIdUser = async (req, res) => {
  try {
    const users = await User.findById(req.params.id);
    if (!users) {
      return res.status(404).json({ message: "Người dùng không tồn tại." });
    }
    return res.json({ message: "Thông tin người dùng", users });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server.", error });
  }
};
