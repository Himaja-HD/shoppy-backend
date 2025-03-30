import jwt from "jsonwebtoken";

// Middleware  
const protectRoute = (req, res, next) => {
    const token = req.cookies?.jwt || req.headers.authorization?.split(" ")[1]; // Token  

    if (!token) {
        return res.status(401).json({ message: "Unauthorized, no token" }); // Unauthorized  
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify  
        req.user = decoded; // User  
        next(); // Next  
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired token" }); // Forbidden  
    }
};

export default protectRoute;
