"use client";

import { useCreateProductMutation, useUpdateProductMutation, useGetProductsQuery, useDeleteProductMutation } from "@/state/api";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import { useState, useEffect } from "react";
import Header from "@/app/(components)/Header";
import Rating from "@/app/(components)/Rating";
import CreateProductModal from "./CreateProductModal";
import Image from "next/image";

type ProductFormData = {

  name: string;
  price: number;
  stockQuantity: number;
  rating?: number; 
  productId: string;
};

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<ProductFormData | null>(null);

  const { data: products, isLoading, isError } = useGetProductsQuery(searchTerm);
  const [createProduct] = useCreateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const handleCreateProduct = async (productData: ProductFormData) => {
    await createProduct(productData);
  };

  const handleUpdateProduct = async (updatedProduct: ProductFormData) => {
    if (updatedProduct.productId) {
      await updateProduct(updatedProduct);
      setProductToEdit(null); // Close modal after updating
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    await deleteProduct(productId);
  };

  useEffect(() => {
    if (productToEdit) {
      setIsModalOpen(true);
    }
  }, [productToEdit]);

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !products) {
    return <div className="text-center text-red-500 py-4">Failed to fetch products</div>;
  }

  return (
    <div className="mx-auto pb-5 w-full">
      {/* SEARCH BAR */}
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
          <input
            className="w-full py-2 px-4 rounded bg-white"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* HEADER BAR */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Products" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200" /> Create Product
        </button>
      </div>

      {/* BODY PRODUCTS LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg-grid-cols-3 gap-10 justify-between">
        {products?.map((product) => (
          <div key={product.productId} className="border shadow rounded-md p-4 max-w-full w-full mx-auto">
            <div className="flex flex-col items-center">
              <Image
                src={`https://s3-inventorymanagement.s3.us-east-2.amazonaws.com/product${Math.floor(Math.random() * 3) + 1}.png`}
                alt={product.name}
                width={150}
                height={150}
                className="mb-3 rounded-2xl w-36 h-36"
              />
              <h3 className="text-lg text-gray-900 font-semibold">{product.name}</h3>
              <p className="text-gray-800">₱{product.price.toFixed(2)}</p>
              <div className="text-sm text-gray-600 mt-1">Stock: {product.stockQuantity}</div>
              {product.rating && (
                <div className="flex items-center mt-2">
                  <Rating rating={product.rating} />
                </div>
              )}

              {/* Edit and Delete Buttons */}
              <div className="flex space-x-4 mt-4">
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white px-4 py-2 rounded"
                  onClick={() => setProductToEdit(product)} // Pass product to modal for editing
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
                  onClick={() => handleDeleteProduct(product.productId!)} // Delete product
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProduct}
        onUpdate={handleUpdateProduct}
        productToEdit={productToEdit} // Pass product for editing
      />
    </div>
  );
};

export default Products;
