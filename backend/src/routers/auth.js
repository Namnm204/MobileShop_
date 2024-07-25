import express from "express";
import { ListUser, Login, Logout, Signup } from "../controllers/auth.js";

const router = express.Router();

router.get("/user", ListUser);
router.post("/register", Signup);
router.post("/login", Login);
router.post("/logout", Logout);

export default router;
