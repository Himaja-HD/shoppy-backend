import Product from "../models/Product.js"; // Product model  
import Cart from "../models/Cart.js"; // Cart model  

// Add product to cart  
export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body; // Input  

        if (!productId || !quantity) {
            return res.status(400).json({ message: "Product ID and quantity are required" }); // Validation  
        }

        const product = await Product.findById(productId); // Find product  
        if (!product) {
            return res.status(404).json({ message: "Product not found" }); // Not found  
        }

        let cartItem = await Cart.findOne({ productId }); // Find cart item  

        if (cartItem) {
            cartItem.quantity += quantity; // Update quantity  
        } else {
            cartItem = new Cart({ productId, quantity }); // New cart item  
        }

        await cartItem.save(); // Save  
        res.status(201).json({ message: "Product added to cart", cartItem }); // Response  
    } catch (error) {
        res.status(500).json({ message: "Failed to add to cart", error: error.message }); // Error  
    }
};

// Update cart item quantity  
export const updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body; // Input  
        const cartItem = await Cart.findById(req.params.id); // Find cart item  

        if (!cartItem) return res.status(404).json({ message: "Cart item not found" }); // Not found  

        cartItem.quantity = quantity; // Update  
        await cartItem.save(); // Save  
        res.status(200).json({ message: "Cart item updated", cartItem }); // Response  
    } catch (error) {
        res.status(500).json({ message: "Failed to update cart", error: error.message }); // Error  
    }
};

// Delete item from cart  
export const removeCartItem = async (req, res) => {
    try {
        const cartItem = await Cart.findByIdAndDelete(req.params.id); // Delete  
        if (!cartItem) return res.status(404).json({ message: "Cart item not found" }); // Not found  

        res.status(200).json({ message: "Item removed from cart" }); // Response  
    } catch (error) {
        res.status(500).json({ message: "Failed to remove from cart", error: error.message }); // Error  
    }
};

// Get all cart items  
export const getCartItems = async (req, res) => {
    try {
        const cartItems = await Cart.find().populate("productId"); // Fetch all  
        res.status(200).json(cartItems); // Response  
    } catch (error) {
        res.status(500).json({ message: "Failed to get cart items", error: error.message }); // Error  
    }
};
