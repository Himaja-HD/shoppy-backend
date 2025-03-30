import express from "express";
import {validateProduct}  from "../middleware/productValidation.js";
import { 
    createProduct, 
    getProducts, 
    getProductById, 
    updateProduct, 
    deleteProduct 
} from "../controllers/productController.js";

const router = express.Router();

// Product Routes
router.post("/",validateProduct, createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id",validateProduct, updateProduct);
router.delete("/:id", deleteProduct);

export default router;
