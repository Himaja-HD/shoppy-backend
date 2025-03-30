import mongoose from "mongoose";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const validateProduct = (req, res, next) => {
  const { name, price, description, stock } = req.body;

  if (!name || typeof name !== "string" || name.trim().length < 3) {
    return res.status(400).json({ message: "Invalid product name (min 3 chars)" });
  }

  if (!price || typeof price !== "number" || price <= 0) {
    return res.status(400).json({ message: "Invalid product price" });
  }

  if (!description || typeof description !== "string" || description.length < 10) {
    return res.status(400).json({ message: "Invalid product description (min 10 chars)" });
  }

  if (!stock || typeof stock !== "number" || stock < 0) {
    return res.status(400).json({ message: "Stock must be a non-negative number" });
  }

  next();
};
