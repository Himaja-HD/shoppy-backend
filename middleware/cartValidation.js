import mongoose from "mongoose";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const validateCart = (req, res, next) => {
  const { productId, quantity } = req.body;

  if (!productId || !isValidObjectId(productId)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  if (!quantity || typeof quantity !== "number" || quantity <= 0) {
    return res.status(400).json({ message: "Quantity must be greater than 0" });
  }

  next();
};
