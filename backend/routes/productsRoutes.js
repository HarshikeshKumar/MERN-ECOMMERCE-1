import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Route for creating a new product
router.post("/add", createProduct);

// Route for getting all products
router.get("/", getProducts);

// Route for updating a product
router.put("/update/:id", updateProduct);

// Route for deleting a product
router.delete("/delete/:id", deleteProduct);

export default router;
