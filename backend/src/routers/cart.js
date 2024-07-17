import express from "express";
import {
  addToCart,
  decreaseCartQuantity,
  getbyIdCart,
  increaseCartQuantity,
  removeCart,
  updateCartQuantity,
} from "../controllers/cart";

const router = express.Router();

router.get("/:userId", getbyIdCart);
router.post("/addtocart", addToCart);
router.put("/update", updateCartQuantity);
router.delete("/delete", removeCart);
router.post("/increase", increaseCartQuantity);
router.post("/decrease", decreaseCartQuantity);

export default router;
