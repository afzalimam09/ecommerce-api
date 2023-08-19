import {
    createOne,
    deleteOne,
    getAll,
    getOne,
    updateOne,
} from "../handleFactory.js";
import Product from "../../models/productModel.js";

// Call factory function and Pass the Model
export const getAllProduct = getAll(Product);
export const createProduct = createOne(Product);
export const getOneProduct = getOne(Product);
export const updateProduct = updateOne(Product);
export const deleteProduct = deleteOne(Product);
