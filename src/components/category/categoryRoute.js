import { Router } from "express";
import {
    createCategory,
    deleteCategory,
    getAllCategory,
    getOneCategory,
    updateCategory,
} from "./categoryController.js";
import { protect, restrictToAdmin } from "../auth/authController.js";

const router = Router();
// Category route: /api/v1/category

router
    .route("/")
    .get(getAllCategory)
    .post(protect, restrictToAdmin, createCategory);
router.route("/:id").get(getOneCategory);

router.use(protect, restrictToAdmin);
router.route("/:id").patch(updateCategory).delete(deleteCategory);

export default router;
