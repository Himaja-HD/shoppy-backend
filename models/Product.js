import mongoose from "mongoose";

// Schema  
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  stock: Number,
});
// Model 
const Product = mongoose.model("Product", productSchema);

export default Product;
