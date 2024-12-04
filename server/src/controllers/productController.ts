// productController.ts
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const search = req.query.search?.toString();
    const products = await prisma.products.findMany({
      where: {
        name: {
          contains: search,
        },
      },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products" });
  }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId, name, price, rating, stockQuantity } = req.body;
    const product = await prisma.products.create({
      data: {
        productId,
        name,
        price,
        rating,
        stockQuantity,
      },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
};

// Add the deleteProduct function
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;  // Get the productId from request params
    const product = await prisma.products.delete({
      where: { productId: id },  // Assuming productId is a unique field
    });

    res.status(200).json({ message: "Product deleted successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params; // Get the productId from request params
    const { name, price, rating, stockQuantity } = req.body; // Get the new data from the request body

    // Update the product in the database
    const updatedProduct = await prisma.products.update({
      where: { productId }, // Find the product by its ID
      data: { name, price, rating, stockQuantity }, // Set the new values
    });

    res.status(200).json(updatedProduct); // Return the updated product
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};
