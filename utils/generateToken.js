import jwt from "jsonwebtoken";

// Function to generate JWT token and set it as a cookie
const generateJWTTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15d", // Token expires in 15 days
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // Cookie expires in 15 days
        httpOnly: true, // Prevents client-side access for security
        sameSite: "strict", // Protects against CSRF attacks
        secure: process.env.NODE_ENV === "production", // Ensures secure cookies in production
    });

    return token; // Return the generated token
};

export default generateJWTTokenAndSetCookie;
