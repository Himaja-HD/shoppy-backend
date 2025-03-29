import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import protectRoute from "./middleware/authMiddleware.js";
import { registerUser, loginUser } from "./controllers/authController.js";
import { getProducts, getProductById } from "./controllers/productController.js";
import { addToCart, updateCart, removeFromCart } from "./controllers/cartController.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Authentication Routes
app.post("/register", registerUser);
app.post("/login", loginUser);

// Product Routes
app.get("/products", getProducts);
app.get("/products/:id", getProductById);

// Cart Routes (Protected)
app.post("/cart", protectRoute, addToCart);
app.put("/cart/:id", protectRoute, updateCart);
app.delete("/cart/:id", protectRoute, removeFromCart);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
