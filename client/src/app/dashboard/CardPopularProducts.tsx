import { useGetDashboardMetricsQuery } from "@/state/api";
import { ShoppingBag } from "lucide-react";
import React from "react";
import Rating from "../(components)/Rating";

const CardPopularProducts = () => {
  const { data: dashboardMetrics, isLoading, error } = useGetDashboardMetricsQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="row-span-3 xl:row-span-6 bg-pink-100 shadow-md rounded-2xl pb-16">
      <h3 className="text-lg font-semibold px-7 pt-5 pb-2">Popular Products</h3>
      <hr />
      <div className="overflow-auto h-full">
        {dashboardMetrics?.popularProducts?.map((product) => (
           <div
           key={product.productId}
           className="flex flex-col gap-3 px-5 py-7 border-b"
         >
           <div className="flex items-center justify-between">
             <div>Image</div>
             <div className="flex flex-col justify-between gap-1">
               <div className="font-bold text-gray-700">{product.name}</div>
               <div className="flex text-sm items-center">
                 <span className="font-bold text-blue-500">₱{product.price}</span>
                 <span className="mx-2"></span>
                 <Rating  rating={product.rating || 0}/>
               </div>
             </div>
           </div>
           <div className="text-xs flex items-center">
             <button className="p-2 rounded-full bg-blue-100 text-blue-600 mr-2">
               <ShoppingBag className="w-4 h-4" />
             </button>
             {Math.round(product.stockQuantity / 100)} Sold
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardPopularProducts;
