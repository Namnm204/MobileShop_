import express from "express";
import {
  getByIdUser,
  ListUser,
  lockUser,
  Login,
  Logout,
  Signup,
  unlockUser,
  updateUser,
} from "../controllers/auth.js";

const router = express.Router();

router.get("/user", ListUser);
router.get("/user/:id", getByIdUser);
router.post("/register", Signup);
router.post("/login", Login);
router.post("/logout", Logout);
router.put("/user/:id", updateUser);
router.post("/user/lock/:id", lockUser);
router.post("/user/unlock/:id", unlockUser);

export default router;
