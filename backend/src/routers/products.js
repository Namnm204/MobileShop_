import express from "express";
import {
  CreateProduct,
  RemoveProduct,
  getAllProducts,
  getById,
  updateProduct,
} from "../controllers/products.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getById);
router.post("/", CreateProduct);
router.put("/:id", updateProduct);
router.delete("/:id", RemoveProduct);

export default router;
