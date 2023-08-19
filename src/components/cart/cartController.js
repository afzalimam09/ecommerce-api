import Cart from "../../models/cartModel.js";
import AppError from "../../utils/appError.js";
import catchAsync from "../../utils/catchAsync.js";

// Call factory function and Pass the Model
export const addItemToCart = catchAsync(async (req, res, next) => {
    const quantity = req.body.quantity;
    const userId = req.user._id;
    const productId = req.params.productId;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
        cart = new Cart({ userId, items: [] });
    }
    const existingItemIndex = cart.items.findIndex((item) =>
        item.productId.equals(productId)
    );
    if (existingItemIndex !== -1) {
        cart.items[existingItemIndex].quantity += quantity;
    } else {
        cart.items.push({ productId, quantity });
    }
    await cart.save();

    // Send Response
    res.status(200).json({
        status: "success",
        data: cart,
    });
});
export const removeItemFromCart = catchAsync(async (req, res, next) => {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
        return next(new AppError("No cart found!", 404));
    }
    const updatedItems = cart.items.filter(
        (item) => !item.productId.equals(req.params.productId)
    );
    cart.items = updatedItems;
    await cart.save();

    // Send Response
    res.status(200).json({
        status: "success",
        data: cart,
    });
});
export const updateItemQuantity = catchAsync(async (req, res, next) => {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
        return next(new AppError("No cart belong to the user", 404));
    }
    const existingItem = cart.items.find((item) =>
        item.productId.equals(req.params.productId)
    );

    if (!existingItem) {
        return next(new AppError("Item not found in the cart", 404));
    }

    existingItem.quantity = req.body.newQty;
    await cart.save();

    // Send Response
    res.status(200).json({
        status: "success",
        data: cart,
    });
});

export const getCartContains = catchAsync(async (req, res, next) => {
    const cart = await Cart.findOne({ userId: req.user._id }).populate(
        "items.productId"
    );
    // Send Response
    res.status(200).json({
        status: "success",
        data: cart || { items: [] },
    });
});
