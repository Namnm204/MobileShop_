import express from "express";
import { createOder } from "../controllers/oder.js";

const router = express.Router();

// Add your routes here
router.post("/", createOder);

export default router;
