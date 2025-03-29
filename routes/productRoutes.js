import express from 'express';
import { getProducts, getProductById} from '../controllers/productController.js';

const router = express.Router();

// Define the routes
router.get('/products', getProducts);              // GET all products
router.get('/products/:id', getProductById);       // GET a single product by ID


export default router;
