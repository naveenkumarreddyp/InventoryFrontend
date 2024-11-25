import React from "react";

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search products or categories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
