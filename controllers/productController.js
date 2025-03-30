import Product from "../models/Product.js"; // Product model  

// Create Product  
export const createProduct = async (req, res) => {
    try {
        const { name, price, description, stock } = req.body; // Extract input  
        const newProduct = new Product({ name, price, description, stock }); // Create product  
        await newProduct.save(); // Save to DB  
        res.status(201).json({ message: "Product added successfully", product: newProduct }); // Success response  
    } catch (error) {
        res.status(500).json({ message: "Failed to add product", error: error.message }); // Error response  
    }
};

// Get All Products  
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find(); // Fetch all products  
        res.status(200).json(products); // Success response  
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch products", error: error.message }); // Error response  
    }
};

// Get Product by ID  
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id); // Find product  
        if (!product) return res.status(404).json({ message: "Product not found" }); // Not found  
        res.status(200).json(product); // Success response  
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch product", error: error.message }); // Error response  
    }
};

// Update Product  
export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update  
        if (!updatedProduct) return res.status(404).json({ message: "Product not found" }); // Not found  
        res.status(200).json({ message: "Product updated successfully", product: updatedProduct }); // Success response  
    } catch (error) {
        res.status(500).json({ message: "Failed to update product", error: error.message }); // Error response  
    }
};

// Delete Product  
export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id); // Delete product  
        if (!deletedProduct) return res.status(404).json({ message: "Product not found" }); // Not found  
        res.status(200).json({ message: "Product deleted successfully" }); // Success response  
    } catch (error) {
        res.status(500).json({ message: "Failed to delete product", error: error.message }); // Error response  
    }
};
