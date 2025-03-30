import mongoose from "mongoose";

// Schema  
const cartSchema = new mongoose.Schema({ 
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, default: 1 }
});

//model
const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
