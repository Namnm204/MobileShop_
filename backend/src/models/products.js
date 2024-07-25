import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },  
  // brand: {
  //   type: String,
  //   required: true,
  // },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
    match: /(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w.-]*)*\/?([^#]*)?/,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category", // Referring to the Category model
  },
});

export default mongoose.model("Product", productSchema);
