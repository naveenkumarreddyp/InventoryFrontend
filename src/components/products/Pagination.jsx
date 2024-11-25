import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export default function Pagination({
  currentPage,
  setCurrentPage,
  totalItems,
  itemsPerPage,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pageNumbers = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <button
        onClick={() => setCurrentPage(1)}
        disabled={currentPage === 1}
        className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
        aria-label="First page"
      >
        <ChevronsLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => setCurrentPage(number)}
          className={`px-3 py-1 rounded-md ${
            currentPage === number
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
      <button
        onClick={() => setCurrentPage(totalPages)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
        aria-label="Last page"
      >
        <ChevronsRight className="w-5 h-5" />
      </button>
    </div>
  );
}
