import Joi from "joi";
import User from "../models/users.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = Joi.object({
  name: Joi.string().required().min(3).max(30).messages({
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
  phoneNumber: Joi.string().required().messages({
    string: "Số điện thoại phải đúng đúng dạng",
    required: "Số điện thoại không được bỏ trống!",
  }),
});
export const ListUser = (req, res) => {
  const nameString = req.query.name;
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
    const { name, email, password, phoneNumber } = req.body;
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
      name,
      email,
      password: hashedPassword,
      phoneNumber,
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
