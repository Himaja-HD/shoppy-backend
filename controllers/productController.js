// Static data for testing
const products = [
    {
        id: "1",
        name: "Product 1",
        price: 100,
        description: "This is Product 1",
        stockQuantity: 50
    },
    {
        id: "2",
        name: "Product 2",
        price: 150,
        description: "This is Product 2",
        stockQuantity: 30
    },
    {
        id: "3",
        name: "Product 3",
        price: 200,
        description: "This is Product 3",
        stockQuantity: 20
    }
];

// Get all products (static data)
export const getProducts = async (req, res) => {
    try {
        res.json(products);  // Return the static products as a response
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Get product by ID (static data)
export const getProductById = async (req, res) => {
    try {
        const product = products.find(p => p.id === req.params.id);  // Find product by ID
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);  // Return the product
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
