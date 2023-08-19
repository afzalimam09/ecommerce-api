import { Router } from "express";
import {
    createProduct,
    deleteProduct,
    getAllProduct,
    getOneProduct,
    updateProduct,
} from "./productController.js";
import { protect, restrictToAdmin } from "../auth/authController.js";

const router = Router();
// Product route: /api/v1/product

router
    .route("/")
    .get(getAllProduct)
    .post(protect, restrictToAdmin, createProduct);
router.route("/:id").get(getOneProduct);

router.use(protect, restrictToAdmin);
router.route("/:id").patch(updateProduct).delete(deleteProduct);

export default router;
