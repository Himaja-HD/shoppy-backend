import mongoose from "mongoose";

// Schema  
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
// Model 
export default mongoose.model("User", userSchema);
