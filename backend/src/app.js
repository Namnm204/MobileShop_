import express from "express";
import { connectDB } from "./config/connect.js";
import getAllProductsRouter from "./routers/products.js";
import getAllgetAllCategoryRouter from "./routers/category.js";
import CartRouter from "./routers/cart.js";
import authRouter from "./routers/auth.js";
import  cors  from "cors";

const app = express();

app.use(express.json());
app.use(cors());

connectDB("mongodb://127.0.0.1:27017/mobileshop");

app.use("/products", getAllProductsRouter);
app.use("/category", getAllgetAllCategoryRouter);
app.use("/carts", CartRouter);
app.use("/", authRouter);

export const viteNodeApp = app;
