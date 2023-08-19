import mongoose from "mongoose";
import db from "../connections/dbConnection.js";

const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: { type: Number, required: true, min: 1 },
});

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        items: [orderItemSchema],
        amount: { type: Number, required: true },
        address: { type: Object, required: true },
        status: {
            type: String,
            default: "pending",
            enum: ["pending", "confirmed", "shipped", "delivered"],
        },
    },
    { timestamps: true }
);

const Order = db.model("Order", orderSchema);

export default Order;
