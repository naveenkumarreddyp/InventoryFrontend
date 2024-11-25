import React, { useState, useEffect, useMemo, useCallback } from "react";
import toast from "react-hot-toast";
import { Eye, Edit, Trash2, Plus, Search, X } from "lucide-react";
import {
  AddCategoryDialog,
  ViewCategoryDialog,
  EditCategoryDialog,
} from "../components/CategoriesDialog";
import { PulseLoader } from "react-spinners";
import Pagination from "../components/products/Pagination";
import { useQuery } from "@tanstack/react-query";
import { getData, getDatabyparams, postData } from "../apiService/apiservice";

const CATEGORIES_PER_PAGE = 10;

export default function Categories() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [viewCategory, setViewCategory] = useState(null);
  const [actionLoading, setActionLoading] = useState({ id: null, type: null });
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: categoriesData,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getData("category/getCategory"),
  });

  const categories = categoriesData?.data || [];

  const filteredCategories = useMemo(() => {
    return categories.filter(
      (category) =>
        category?.categoryName?.toLowerCase().includes(searchTerm.toLowerCase())
      //   ||
      // category?.categoryId?.toString().includes(searchTerm)
    );
  }, [categories, searchTerm]);

  const totalPages = Math.ceil(filteredCategories.length / CATEGORIES_PER_PAGE);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [filteredCategories, currentPage, totalPages]);

  const currentCategories = useMemo(() => {
    const start = (currentPage - 1) * CATEGORIES_PER_PAGE;
    return filteredCategories.slice(start, start + CATEGORIES_PER_PAGE);
  }, [currentPage, filteredCategories]);

  const handleAdd = useCallback(
    async (newCategory) => {
      setActionLoading({ id: "new", type: "add" });
      try {
        await postData("category/createCategory", {
          categoryName: newCategory.name,
          categoryTags: newCategory.tags,
          categoryDescription: newCategory.description,
        });
        setIsAddDialogOpen(false);
        toast.success("Category added successfully!");
        refetch();
      } catch (error) {
        toast.error("Failed to add category");
      } finally {
        setActionLoading({ id: null, type: null });
      }
    },
    [refetch]
  );

  const handleEdit = useCallback(
    async (updatedCategory) => {
      setActionLoading({ id: updatedCategory?.categoryId, type: "update" });
      try {
        await postData("category/editCategory", updatedCategory);
        setEditCategory(null);
        toast.success("Category updated successfully!");
        refetch();
      } catch (error) {
        toast.error("Failed to update category");
      } finally {
        setActionLoading({ id: null, type: null });
      }
    },
    [refetch]
  );

  const handleDelete = useCallback(
    async (id) => {
      setActionLoading({ id, type: "delete" });
      try {
        await getDatabyparams("category/deleteCategory", id);
        toast.success("Category deleted successfully!");
        refetch();

        const newTotalPages = Math.ceil(
          (filteredCategories.length - 1) / CATEGORIES_PER_PAGE
        );
        if (currentPage > newTotalPages) {
          setCurrentPage(Math.max(1, newTotalPages));
        }
      } catch (error) {
        toast.error("Failed to delete category");
      } finally {
        setActionLoading({ id: null, type: null });
      }
    },
    [refetch, filteredCategories.length, currentPage]
  );

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Category Management
        </h1>
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
              Add Category
            </>
          )}
        </button>
      </div>

      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search by Category Name"
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
          {currentCategories.length > 0 ? (
            <div className="overflow-x-auto bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Category ID
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Category Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentCategories.map((category) => (
                    <tr key={category.categoryId} className="hover:bg-gray-50">
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {category.categoryId}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {category.categoryName}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">
                        <div className="flex space-x-3">
                          <button
                            onClick={() => setViewCategory(category)}
                            className="text-blue-500 hover:text-blue-600"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => setEditCategory(category)}
                            className="text-yellow-500 hover:text-yellow-600"
                            disabled={
                              actionLoading.id === category.categoryId &&
                              actionLoading.type === "update"
                            }
                          >
                            {actionLoading.id === category.categoryId &&
                            actionLoading.type === "update" ? (
                              <PulseLoader color="#EAB308" size={8} />
                            ) : (
                              <Edit size={18} />
                            )}
                          </button>
                          <button
                            onClick={() => handleDelete(category.categoryId)}
                            className="text-red-500 hover:text-red-600"
                            disabled={
                              actionLoading.id === category.categoryId &&
                              actionLoading.type === "delete"
                            }
                          >
                            {actionLoading.id === category.categoryId &&
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
              No categories available
            </div>
          )}
          {filteredCategories.length > CATEGORIES_PER_PAGE && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalItems={filteredCategories.length}
                itemsPerPage={CATEGORIES_PER_PAGE}
              />
            </div>
          )}
          <AddCategoryDialog
            isOpen={isAddDialogOpen}
            onClose={() => setIsAddDialogOpen(false)}
            onAdd={handleAdd}
          />
          <EditCategoryDialog
            category={editCategory}
            onClose={() => setEditCategory(null)}
            onSave={handleEdit}
          />
          <ViewCategoryDialog
            category={viewCategory}
            onClose={() => setViewCategory(null)}
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
