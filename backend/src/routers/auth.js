import express from "express";
import {
  ListUser,
  lockUser,
  Login,
  Logout,
  Signup,
  unlockUser,
} from "../controllers/auth.js";

const router = express.Router();

router.get("/user", ListUser);
router.post("/register", Signup);
router.post("/login", Login);
router.post("/logout", Logout);
router.post("/user/lock/:id", lockUser);
// Route để mở khóa tài khoản
router.post("/user/unlock/:id", unlockUser);

export default router;
