import React, { useState, useEffect, useMemo, useCallback } from "react";
import toast from "react-hot-toast";
import { Eye, Edit, Trash2, Plus, Search, X } from "lucide-react";
import { PulseLoader } from "react-spinners";
import ViewProductDialog from "../components/products/ViewProductDialog";
import EditProductDialog from "../components/products/EditProductDialog";
import AddProductDialog from "../components/products/AddProductDialog";
import Pagination from "../components/products/Pagination";
import { getData, getDatabyparams, postData } from "../apiService/apiservice";
import { useQuery } from "@tanstack/react-query";

const PRODUCTS_PER_PAGE = 10;

export default function ProductList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewProduct, setViewProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState({
    id: null,
    type: null,
  });

  const {
    data: productsData,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => getData("product/getProduct"),
  });

  const products = productsData?.data || [];

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      [product?.productName, product?.productCategory].some((field) =>
        field?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [products, searchTerm]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [filteredProducts, currentPage, totalPages]);

  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [currentPage, filteredProducts]);

  const handleView = useCallback((product) => setViewProduct(product), []);
  const handleEdit = useCallback((product) => setEditProduct(product), []);

  const handleDelete = useCallback(
    async (id) => {
      setActionLoading({ id, type: "delete" });
      try {
        await getDatabyparams("product/deleteProduct", id);
        toast.success("Product deleted successfully!");
        await refetch();

        const newTotalPages = Math.ceil(
          (filteredProducts.length - 1) / PRODUCTS_PER_PAGE
        );
        if (currentPage > newTotalPages) {
          setCurrentPage(Math.max(1, newTotalPages));
        }
      } catch (error) {
        toast.error("Failed to delete product");
      } finally {
        setActionLoading({ id: null, type: null });
      }
    },
    [refetch, filteredProducts.length, currentPage]
  );

  const handleSave = useCallback(
    async (updatedProduct) => {
      setActionLoading({ id: updatedProduct.productId, type: "update" });
      try {
        await postData("product/editProduct", updatedProduct);
        setEditProduct(null);
        toast.success("Product updated successfully!");
        refetch();
      } catch (error) {
        toast.error("Failed to update product");
      } finally {
        setActionLoading({ id: null, type: null });
      }
    },
    [refetch]
  );

  const handleAdd = useCallback(
    async (newProduct) => {
      setActionLoading({ id: "new", type: "add" });
      try {
        await postData("product/createProduct", {
          productName: newProduct.name,
          productCategory: newProduct.category,
          productDescription: newProduct.description,
          productPrice: newProduct.price,
          productRemainingQty: Math.floor(Math.random() * 150 + 50),
        });
        setIsAddDialogOpen(false);
        toast.success("Product added successfully!");
        refetch();
      } catch (error) {
        toast.error("Failed to add product");
      } finally {
        setActionLoading({ id: null, type: null });
      }
    },
    [refetch]
  );

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Product Management</h1>
        <button
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full flex items-center transition duration-300 ease-in-out transform hover:scale-105"
          disabled={actionLoading.type === "add"}
        >
          {actionLoading.type === "add" ? (
            <PulseLoader color="#ffffff" size={10} />
          ) : (
            <>
              <Plus className="mr-2" size={20} />
              Add Product
            </>
          )}
        </button>
      </div>
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search by Product Name or Category..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full px-4 py-2 pl-10 pr-10 text-gray-700 bg-white border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm("");
              setCurrentPage(1);
            }}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        )}
      </div>
      {!isLoading ? (
        <>
          {currentProducts.length > 0 ? (
            <div className="overflow-x-auto bg-white rounded-lg shadow overflow-hidden mt-6">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Product Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Available Quantity
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map((product) => (
                    <tr key={product.productId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {product.productName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {product.productCategory}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {product.productRemainingQty}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ₹ {product.productPrice}
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleView(product)}
                            className="text-blue-500 hover:text-blue-600"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-yellow-500 hover:text-yellow-600"
                            disabled={
                              actionLoading.id === product.productId &&
                              actionLoading.type === "update"
                            }
                          >
                            {actionLoading.id === product.productId &&
                            actionLoading.type === "update" ? (
                              <PulseLoader color="#EAB308" size={8} />
                            ) : (
                              <Edit size={18} />
                            )}
                          </button>
                          <button
                            onClick={() => handleDelete(product.productId)}
                            className="text-red-500 hover:text-red-600"
                            disabled={
                              actionLoading.id === product.productId &&
                              actionLoading.type === "delete"
                            }
                          >
                            {actionLoading.id === product.productId &&
                            actionLoading.type === "delete" ? (
                              <PulseLoader color="#EF4444" size={8} />
                            ) : (
                              <Trash2 size={18} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-6">
              No products available
            </div>
          )}
          {filteredProducts.length > PRODUCTS_PER_PAGE && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalItems={filteredProducts.length}
                itemsPerPage={PRODUCTS_PER_PAGE}
              />
            </div>
          )}
          <ViewProductDialog
            product={viewProduct}
            onClose={() => setViewProduct(null)}
          />
          <EditProductDialog
            product={editProduct}
            onClose={() => setEditProduct(null)}
            onSave={handleSave}
          />
          <AddProductDialog
            isOpen={isAddDialogOpen}
            onClose={() => setIsAddDialogOpen(false)}
            onAdd={handleAdd}
          />
        </>
      ) : (
        <div className="flex justify-center items-center h-[250px]">
          <PulseLoader color="#3B82F6" size={15} />
        </div>
      )}
    </div>
  );
}
