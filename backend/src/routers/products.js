import express from "express";
import {
  CreateProduct,
  RemoveProduct,
  getAllProducts,
  getById,
  searchProducts,
  updateProduct,
} from "../controllers/products.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getById);
router.post("/", CreateProduct);
router.put("/:id", updateProduct);
router.delete("/:id", RemoveProduct);
router.get("/products/search", searchProducts);

export default router;
