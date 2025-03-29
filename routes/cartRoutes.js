import express from "express";
import { getCart, addToCart, updateCartItem, removeFromCart } from "../controllers/cartController.js";
import protectRoute from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/cart", protectRoute, getCart);
router.post("/cart", protectRoute, addToCart);
router.put("/cart/:id", protectRoute, updateCartItem);
router.delete("/cart/:id", protectRoute, removeFromCart);

export default router;
