import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, products: [{ productId, quantity }] });
        } else {
            const existingItem = cart.products.find(item => item.productId.toString() === productId);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.products.push({ productId, quantity });
            }
        }

        await cart.save();
        res.json({ message: "Product added to cart", cart });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Update quantity in cart
export const updateCart = async (req, res) => {
    try {
        const { quantity } = req.body;
        const userId = req.user.id;
        const productId = req.params.id;

        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const item = cart.products.find(p => p.productId.toString() === productId);
        if (!item) return res.status(404).json({ message: "Product not in cart" });

        item.quantity = quantity;
        await cart.save();

        res.json({ message: "Cart updated", cart });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Remove product from cart
export const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.params.id;

        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.products = cart.products.filter(p => p.productId.toString() !== productId);
        await cart.save();

        res.json({ message: "Product removed from cart", cart });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
