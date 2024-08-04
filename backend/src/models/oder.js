import mongoose from "mongoose";

// Schema cho các mặt hàng trong đơn hàng
const OderItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

// Schema cho đơn hàng
const OderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [OderItemSchema],
    oderNumber: {
      type: String,
      unique: true,
      default: function () {
        return "ORD" + Math.floor(Math.random() * 1000000);
      },
    },
    customerInfo: {
      username: {
        type: String, // Thêm trường username
        required: true, // Bắt buộc nếu bạn muốn
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
      },
      payment: {
        type: String,
      },
      city: {
        type: String,
      },
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Canceled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Oder", OderSchema);
