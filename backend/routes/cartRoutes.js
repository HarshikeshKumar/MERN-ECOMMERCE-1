import express from "express";
import {
  addToCart,
  getCart,
  removeItem,
  updateQuantity,
} from "../controllers/cartController.js";

const router = express.Router();

// Add Item to Cart
router.post("/add", addToCart);

// Remove Item From Cart
router.post("/remove", removeItem);

// Update Item Quantity In Cart
router.post("/update", updateQuantity);

// Get user's Cart
router.get("/:userId", getCart);

export default router;
