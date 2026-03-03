import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Route for creating a new product
router.post("/add", createProduct);

// Route for getting all products
router.get("/", getProducts);

router.get("/:id", getProductById);

// Route for updating a product
router.put("/update/:id", updateProduct);

// Route for deleting a product
router.delete("/delete/:id", deleteProduct);

export default router;
