

import React, { useState, useEffect } from "react";

export default function EditProductDialog({ product, onClose, onSave }) {
  const [editedProduct, setEditedProduct] = useState(product);

  useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  if (!product) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedProduct);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="productName"
            >
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={editedProduct?.productName}
              onChange={handleChange}
              maxLength={25}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="productCategory"
            >
              Category
            </label>
            <input
              type="text"
              id="productCategory"
              name="productCategory"
              value={editedProduct?.productCategory}
              onChange={handleChange}
              maxLength={25}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="productDescription"
            >
              Description
            </label>
            <textarea
              id="productDescription"
              name="productDescription"
              value={editedProduct?.productDescription}
              onChange={handleChange}
              maxLength={100}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="productPrice"
            >
              Price
            </label>
            <input
              type="number"
              id="productPrice"
              name="productPrice"
              value={editedProduct?.productPrice}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
