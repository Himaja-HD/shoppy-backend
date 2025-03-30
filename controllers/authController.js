import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateJWTTokenAndSetCookie from "../utils/generateToken.js";


export const registerUser = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        if (!name || !username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExists = await User.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
            return res.status(400).json({ message: "Email or Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, username, email, password: hashedPassword });

        await user.save();
        const token = generateJWTTokenAndSetCookie(user._id, res); 

        res.status(201).json({ 
            message: "User registered successfully", 
            userId: user._id, 
            token 
        });
    } catch (error) {
        console.error("Error in registerUser:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Login User
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = generateJWTTokenAndSetCookie(user._id, res); 
        res.json({ 
            message: "Login successful", 
            userId: user._id, 
            token 
        });
    } catch (error) {
        console.error("Error in loginUser:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
