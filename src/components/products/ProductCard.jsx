import React from "react";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 truncate">{product.name}</h2>
        <p className="text-gray-600 mb-2">{product.category}</p>
        <p className="text-gray-700 mb-4 h-20 overflow-hidden">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">  ₹ {product.price.toFixed(2)}</span>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
