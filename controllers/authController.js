import User from "../models/User.js"; // Model  
import bcrypt from "bcryptjs"; // Hashing  
import generateJWTTokenAndSetCookie from "../utils/generateToken.js"; // Token  

// Register User  
export const registerUser = async (req, res) => {
    try {
        const { name, username, email, password } = req.body; // Input  

        if (!name || !username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" }); // Validation  
        }

        const userExists = await User.findOne({ $or: [{ email }, { username }] }); // Check User  
        if (userExists) {
            return res.status(400).json({ message: "Email or Username already exists" }); // Exists  
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hash Password  
        const user = new User({ name, username, email, password: hashedPassword }); // Create  

        await user.save(); // Save  
        const token = generateJWTTokenAndSetCookie(user._id, res); // Token  

        res.status(201).json({ 
            message: "User registered successfully", 
            userId: user._id, 
            token 
        }); // Response  
    } catch (error) {
        console.error("Error in registerUser:", error); // Error Log  
        res.status(500).json({ message: "Server error", error: error.message }); // Server Error  
    }
};

// Login User  
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body; // Input  

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" }); // Validation  
        }

        const user = await User.findOne({ email }); // Find User  
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" }); // Invalid  
        }

        const isMatch = await bcrypt.compare(password, user.password); // Compare  
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" }); // Mismatch  
        }

        const token = generateJWTTokenAndSetCookie(user._id, res); // Token  
        res.json({ 
            message: "Login successful", 
            userId: user._id, 
            token 
        }); // Response  
    } catch (error) {
        console.error("Error in loginUser:", error); // Error Log  
        res.status(500).json({ message: "Server error", error: error.message }); // Server Error  
    }
};
