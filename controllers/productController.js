import axios from "axios";

// Get all products (dynamic data)
export const getProducts = async (req, res) => {
    try {
        const response = await axios.get("https://dummyjson.com/products");
        res.status(200).json(response.data);  
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch products", error: error.message });
    }
};

// Get product by ID (dynamic data)
export const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const response = await axios.get(`https://dummyjson.com/products/${productId}`);

        if (!response.data) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(response.data);  
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(500).json({ message: "Failed to fetch product", error: error.message });
    }
};
