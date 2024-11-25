import { useEffect, useState } from "react";

export function AddCategoryDialog({ isOpen, onClose, onAdd }) {
  const [category, setCategory] = useState({
    name: "",
    tags: [],
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim());
    setCategory((prev) => ({ ...prev, tags }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...category });
    setCategory({ name: "", tags: [], description: "" });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add New Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Category Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={category.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="tags"
            >
              Category Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={category.tags.join(", ")}
              onChange={handleTagsChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter tags separated by commas"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Category Description
            </label>
            <textarea
              id="description"
              name="description"
              value={category.description}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Category
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

export function EditCategoryDialog({ category, onClose, onSave }) {
  const [editedCategory, setEditedCategory] = useState(category);

  useEffect(() => {
    setEditedCategory(category);
  }, [category]);

  if (!category) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedCategory);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Edit Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              name="categoryName"
              value={editedCategory?.categoryName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Category Description
            </label>
            <textarea
              id="categoryDescription"
              name="categoryDescription"
              value={editedCategory?.categoryDescription}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
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

export function ViewCategoryDialog({ category, onClose }) {
  if (!category) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{category?.name}</h2>
        <p>
          <strong>Category ID:</strong> {category?.categoryId}
        </p>
        <p>
          <strong>Category Name:</strong> {category?.categoryName}
        </p>
        <p>
          <strong>Tags:</strong> {category?.categoryTags?.join(", ")}
        </p>
        <p>
          <strong>Description:</strong> {category?.categoryDescription}
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Close
        </button>
      </div>
    </div>
  );
}
