"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// productRoutes.ts
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const router = (0, express_1.Router)();
router.get("/", productController_1.getProducts); // GET all products
router.post("/", productController_1.createProduct); // POST a new product
router.delete("/:id", productController_1.deleteProduct); // DELETE a product by ID
router.put("/:productId", productController_1.updateProduct);
exports.default = router;
