import express from "express";
import { validateRegister, validateLogin } from "../middlewares/authValidation.js";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

// Register a new user
router.post("/register",validateRegister, register);

// Login user and get JWT token
router.post("/login",validateLogin, login);

export default router;
