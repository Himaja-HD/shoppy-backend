import express from "express";
import protectRoute from "../middleware/authMiddleware.js";
import {validateCart}  from "../middleware/cartValidation.js";
import { addToCart, updateCartItem, removeCartItem, getCartItems } from "../controllers/cartController.js";

const router = express.Router();

// Cart Routes
router.post("/",protectRoute, validateCart, addToCart);
router.put("/:id",protectRoute, updateCartItem);
router.delete("/:id",protectRoute, removeCartItem);
router.get("/",protectRoute, getCartItems);

export default router;
