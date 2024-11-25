import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Search,
  Plus,
  Trash2,
  ShoppingCart,
  ChevronLeft,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import debounce from "lodash/debounce";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getDataByQuery } from "../apiService/apiservice";

export default function NewBilling() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedSearchProduct, setSelectedSearchProduct] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: searchResults = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["searchProducts", searchTerm],
    queryFn: () =>
      getDataByQuery(
        "billing/searchproductforbilling",
        `productName=${searchTerm}`
      ),
    enabled: false,
    select: (response) => response.data || [],
  });

  const debouncedSearch = useMemo(
    () =>
      debounce((term) => {
        if (term.trim() !== "") {
          refetch();
        } else {
          queryClient.setQueryData(["searchProducts", term], []);
        }
      }, 500),
    [queryClient, refetch]
  );

  useEffect(() => {
    calculateTotalPrice();
  }, [selectedProducts]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim() === "") {
      queryClient.setQueryData(["searchProducts", term], []);
      setSelectedSearchProduct(null);
    } else {
      debouncedSearch(term);
    }
  };

  const handleSearchResultClick = (product) => {
    setSearchTerm(product.productName);
    queryClient.setQueryData(["searchProducts", searchTerm], []);
    setSelectedSearchProduct(product);
  };

  const handleAddProduct = () => {
    if (selectedSearchProduct) {
      const existingProductIndex = selectedProducts.findIndex(
        (p) => p.productId === selectedSearchProduct.productId
      );

      if (existingProductIndex !== -1) {
        toast.error(
          `${selectedSearchProduct.productName} has already been added. Please increase the quantity instead.`
        );
      } else if (selectedSearchProduct.productRemainingQty === 0) {
        toast.error(`${selectedSearchProduct.productName} is out of stock`);
      } else {
        setSelectedProducts([
          {
            ...selectedSearchProduct,
            quantity: 1,
            totalPrice: selectedSearchProduct.productPrice,
          },
          ...selectedProducts,
        ]);
        setSearchTerm("");
        queryClient.setQueryData(["searchProducts", searchTerm], []);
        setSelectedSearchProduct(null);
      }
    }
  };

  const handleQuantityChange = useCallback((id, quantity) => {
    if (quantity === "" || isNaN(quantity)) {
      quantity = 0;
    }

    setSelectedProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.productId === id) {
          if (quantity > product.productRemainingQty) {
            toast.error(
              `Quantity cannot exceed current quantity (${product.productRemainingQty})`
            );
            return product;
          }
          const newQuantity = Math.max(0, quantity);
          return {
            ...product,
            quantity: newQuantity,
            totalPrice: newQuantity * product.productPrice,
          };
        }
        return product;
      })
    );
  }, []);

  const handleRemoveProduct = useCallback((id) => {
    setSelectedProducts((prevProducts) =>
      prevProducts.filter((product) => product.productId !== id)
    );
  }, []);

  const calculateTotalPrice = useCallback(() => {
    const total = selectedProducts.reduce(
      (sum, product) => sum + Number(product.totalPrice),
      0
    );
    setTotalPrice(total);
  }, [selectedProducts]);

  const handleCheckout = () => {
    if (selectedProducts.length === 0) {
      toast.error("Please add products to your bill before checking out.");
      return;
    }
    if (selectedProducts.find((product) => product.quantity === 0)) {
      toast.error("Cannot checkout the product with no quantity");
      return;
    }
    navigate("/billings/billingInfo", {
      state: { selectedProducts, totalPrice },
    });
  };

  const clearSearch = () => {
    setSearchTerm("");
    queryClient.setQueryData(["searchProducts", searchTerm], []);
    setSelectedSearchProduct(null);
  };

  useEffect(() => {
    let getProducts = localStorage.getItem("checkout");
    if (getProducts) {
      setSelectedProducts(JSON.parse(getProducts));
      calculateTotalPrice();
    }
  }, []);

  useEffect(() => {
    if (selectedProducts.length === 0) {
      localStorage.removeItem("checkout");
    } else {
      localStorage.setItem("checkout", JSON.stringify(selectedProducts));
    }
  }, [selectedProducts]);

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6 flex items-center">
        <button
          onClick={() => navigate("/billings")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full flex items-center transition duration-300 ease-in-out w-full sm:w-auto justify-center"
        >
          <ChevronLeft className="" size={20} />
          Back
        </button>
        <nav className="text-sm breadcrumbs ml-10">
          <ul className="flex items-center space-x-2">
            <li>
              <Link
                to="/billings"
                className="text-blue-600 hover:text-blue-800"
              >
                Billings
              </Link>
            </li>
            <li className="text-gray-500 before:content-['>'] before:mx-2">
              New Billing
            </li>
          </ul>
        </nav>
      </div>
      <h1 className="text-3xl font-bold mb-6">New Billing</h1>
      <div className="mb-6 flex flex-col sm:flex-row items-center">
        <div className="relative flex-grow mr-0 sm:mr-4 mb-4 sm:mb-0 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search product by ID or name"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 pl-10 pr-10 text-gray-700 bg-white border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          )}
          {searchTerm.trim() !== "" &&
            !isLoading &&
            searchResults.length > 0 && (
              <div className="absolute z-10 w-full bg-white border rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
                <ul>
                  {searchResults.map((product) => (
                    <li
                      key={product?.productId}
                      onClick={() => handleSearchResultClick(product)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {product.productName}
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div>
        <button
          onClick={handleAddProduct}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full flex items-center transition duration-300 ease-in-out w-full sm:w-auto justify-center"
        >
          <Plus className="mr-2" size={20} />
          Add Product
        </button>
      </div>

      {selectedProducts.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <div className="max-h-96 overflow-y-auto">
              <table className="min-w-full leading-normal">
                <thead className="sticky top-0 bg-gray-100">
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Product Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Product ID
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Total Price
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedProducts.map((product) => (
                    <tr key={product.productId} className="hover:bg-gray-50">
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {product.productName}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {product.productId}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          ₹ {product?.productPrice}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">
                        <input
                          type="number"
                          min="1"
                          max={product?.productRemainingQty}
                          value={
                            product?.quantity?.toString().replace(/^0+/, "") ||
                            "0"
                          }
                          onChange={(e) =>
                            handleQuantityChange(
                              product.productId,
                              parseInt(e.target.value)
                            )
                          }
                          className="w-20 px-2 py-1 text-gray-700 bg-gray-100 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <span className="ml-2 text-xs text-gray-500">
                          (Max: {product?.productRemainingQty})
                        </span>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          ₹ {product?.totalPrice}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">
                        <button
                          onClick={() => handleRemoveProduct(product.productId)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="flex items-center mb-4 sm:mb-0">
                <span className="text-lg font-semibold text-gray-700 mr-2">
                  Total Items:
                </span>
                <span className="text-xl font-bold text-blue-600">
                  {selectedProducts.length}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-lg font-semibold text-gray-700 mr-2">
                  Final Price:
                </span>
                <span className="text-2xl font-bold text-green-600">
                  ₹ {totalPrice * 1}
                </span>
              </div>
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={handleCheckout}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full inline-flex items-center transition duration-300 ease-in-out transform hover:scale-105"
              >
                <ShoppingCart className="mr-2" size={24} />
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
