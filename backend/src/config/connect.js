import mongoose from "mongoose";

export const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("kết nối thành công");
  } catch (error) {
    console.log("kết nối không thành công", error);
  }
};
