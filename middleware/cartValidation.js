import mongoose from "mongoose"; // Import  

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id); // Validate  

export const validateCart = (req, res, next) => {
  const { productId, quantity } = req.body; // Data  

  if (!productId || !isValidObjectId(productId)) {
    return res.status(400).json({ message: "Invalid product ID" }); // Product  
  }

  if (!quantity || typeof quantity !== "number" || quantity <= 0) {
    return res.status(400).json({ message: "Quantity must be greater than 0" }); // Quantity  
  }

  next(); // Next  
};
