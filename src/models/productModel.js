import mongoose from "mongoose";
import db from "../connections/dbConnection.js";

const Schema = mongoose.Schema;

// Product Schema
const productSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Product must have a name"],
        },
        desc: {
            type: String,
            required: true,
        },
        img: {
            type: String,
        },
        categories: [
            {
                type: Schema.Types.ObjectId,
                ref: "Category",
            },
        ],
        price: {
            type: Number,
            required: [true, "Price is required!"],
        },
        inStock: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

// Creating Model out of the schema
export default db.model("Product", productSchema);
