import express from "express";

import productRoute from "./product/productRoute.js";
import categoryRoute from "./category/categoryRoute.js";
import authRoute from "./auth/authRoute.js";
import cartRoute from "./cart/cartRoute.js";
import orderRoute from "./order/orderRoute.js";

const router = express.Router();

// Use category route and product route
router.use("/category", categoryRoute);
router.use("/product", productRoute);
router.use("/cart", cartRoute);
router.use("/order", orderRoute);
router.use("/auth", authRoute);

export default router;
