import { Router } from "express";
import {
    addItemToCart,
    getCartContains,
    removeItemFromCart,
    updateItemQuantity,
} from "./cartController.js";
import { protect } from "../auth/authController.js";

const router = Router();

// Cart route: /api/v1/cart
router.use(protect);
router.route("/").get(getCartContains);
router
    .route("/:productId")
    .post(addItemToCart)
    .delete(removeItemFromCart)
    .patch(updateItemQuantity);

export default router;
