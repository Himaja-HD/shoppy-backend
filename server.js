import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { registerUser, loginUser } from "./controllers/authController.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cookieParser()); // Enable cookie parsing

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log("MongoDB Connected")) // Log successful connection
.catch(err => console.log("MongoDB Connection Error:", err)); // Log errors if any

// Authentication Routes
app.post("/register", registerUser); // Register a new user
app.post("/login", loginUser); // User login

// Register Routes
app.use("/api/products", productRoutes); // Product management routes
app.use("/cart", cartRoutes); // Cart management routes

// Start Server
const PORT = process.env.PORT || 5000; // Define server port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Start server
