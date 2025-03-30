import mongoose from "mongoose"; // Import mongoose for MongoDB connection  
import dotenv from "dotenv"; // Import dotenv to load environment variables  

dotenv.config(); // Load environment variables  

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, // Use new URL parser  
        });
        console.log("MongoDB Connected..."); // Success message  
    } catch (error) {
        console.error("MongoDB Connection Error:", error); // Log error  
        process.exit(1); // Exit process on failure  
    }
};

export default connectDB; // Export database connection function  
