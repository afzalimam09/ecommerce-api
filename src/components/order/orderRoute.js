import { Router } from "express";
import {
    deleteOrder,
    getOrderHistory,
    getOneOrder,
    updateOrder,
    placeOrder,
} from "./orderController.js";
import { protect, restrictToAdmin } from "../auth/authController.js";

const router = Router();

router.use(protect);
router.route("/").post(placeOrder);
router.get("/history", getOrderHistory);
router.get("/:id", getOneOrder);

// Update and delete order is only for admin
router.use(restrictToAdmin);
router.route("/:id").patch(updateOrder).delete(deleteOrder);

export default router;
