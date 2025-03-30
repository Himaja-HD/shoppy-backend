import Product from "../models/Product.js";
import Cart from "../models/Cart.js"; 

// Add product to cart
export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({ message: "Product ID and quantity are required" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        let cartItem = await Cart.findOne({ productId });

        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cartItem = new Cart({ productId, quantity });
        }

        await cartItem.save();
        res.status(201).json({ message: "Product added to cart", cartItem });
    } catch (error) {
        res.status(500).json({ message: "Failed to add to cart", error: error.message });
    }
};

// Update cart item quantity
export const updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body;
        const cartItem = await Cart.findById(req.params.id);

        if (!cartItem) return res.status(404).json({ message: "Cart item not found" });

        cartItem.quantity = quantity;
        await cartItem.save();
        res.status(200).json({ message: "Cart item updated", cartItem });
    } catch (error) {
        res.status(500).json({ message: "Failed to update cart", error: error.message });
    }
};

// Delete item from cart
export const removeCartItem = async (req, res) => {
    try {
        const cartItem = await Cart.findByIdAndDelete(req.params.id);
        if (!cartItem) return res.status(404).json({ message: "Cart item not found" });

        res.status(200).json({ message: "Item removed from cart" });
    } catch (error) {
        res.status(500).json({ message: "Failed to remove from cart", error: error.message });
    }
};

// Get all cart items
export const getCartItems = async (req, res) => {
    try {
        const cartItems = await Cart.find().populate("productId");
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ message: "Failed to get cart items", error: error.message });
    }
};
