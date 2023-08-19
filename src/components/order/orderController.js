import { deleteOne, getAll, getOne, updateOne } from "../handleFactory.js";
import Order from "../../models/orderModel.js";
import Cart from "../../models/cartModel.js";
import catchAsync from "../../utils/catchAsync.js";
import AppError from "../../utils/appError.js";

const calculateTotalCartPrice = (cart) => {
    let totalPrice = 0;
    for (const item of cart.items) {
        totalPrice += item.productId.price * item.quantity;
    }
    return totalPrice;
};

export const placeOrder = catchAsync(async (req, res, next) => {
    const { name, street, town, state, pincode, phone } = req.body;
    const address = { name, street, town, state, pincode, phone };
    const cart = await Cart.findOne({ userId: req.user._id }).populate(
        "items.productId"
    );
    if (!cart) {
        return next(new AppError("No cart found belong to this user", 404));
    }
    const totalPrice = calculateTotalCartPrice(cart);
    const order = new Order({
        userId: req.user._id,
        items: cart.items,
        amount: totalPrice,
        address,
    });
    await order.save();

    // Clear the user's cart after placing the order
    await Cart.findOneAndDelete({ userId: req.user._id });

    // Send Response
    res.status(201).json({
        status: "success",
        data: order,
    });
});

export const getOrderHistory = getAll(Order);
export const getOneOrder = getOne(Order);
export const updateOrder = updateOne(Order);
export const deleteOrder = deleteOne(Order);
