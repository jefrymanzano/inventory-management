// productRoutes.ts
import { Router } from "express";
import { createProduct, getProducts, deleteProduct, updateProduct } from "../controllers/productController";

const router = Router();

router.get("/", getProducts);  // GET all products
router.post("/", createProduct);  // POST a new product
router.delete("/:id", deleteProduct);  // DELETE a product by ID
router.put("/:productId", updateProduct);

export default router;
