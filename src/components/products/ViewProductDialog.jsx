export default function ViewProductDialog({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{product?.productName}</h2>
        <p>
          <strong>Category:</strong> {product?.productCategory}
        </p>
        <p>
          <strong>Description:</strong> {product?.productDescription}
        </p>
        <p>
          {/* <strong>Price:</strong> ${product?.productPrice?.toFixed(2)} */}
          <strong>Price:</strong>   ₹ {product?.productPrice}
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
