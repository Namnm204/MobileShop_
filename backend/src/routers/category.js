import express from "express";
import {
  CreateCategory,
  RemoveCategory,
  getAllCategory,
  getById,
  updateCategory,
} from "../controllers/category..js";

const router = express.Router();

router.get("/", getAllCategory);
router.get("/:id", getById);
router.post("/", CreateCategory);
router.put("/:id", updateCategory);
router.delete("/:id", RemoveCategory);

export default router;
