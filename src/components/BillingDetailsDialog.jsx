import React, { useState } from "react";
import { XIcon, ChevronUpIcon, ChevronDownIcon } from "lucide-react";

export default function BillingDetailsDialog({ billing, onClose }) {
  if (!billing) return null;
  const [selectedItem, setSelectedItem] = useState(null);

  const totalAmount = billing.reduce(
    (sum, item) => sum + parseFloat(item.productPrice) * item.quantity,
    0
  );
  const totalItems = billing.reduce((sum, item) => sum + item.quantity, 0);

  const toggleItem = (index) => {
    setSelectedItem(selectedItem === index ? null : index);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 overflow-y-auto">
      <div
        className="w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden transform transition-all animate-fadeIn"
        role="dialog"
        aria-modal="true"
        aria-labelledby="billing-details-title"
      >
        <div className="relative p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close dialog"
          >
            <XIcon className="h-6 w-6" />
          </button>
          <h2 id="billing-details-title" className="text-2xl font-bold mb-4">
            Billing Products
          </h2>

          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total Items:</span>
              <span className="text-lg font-bold">{billing?.length}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="font-semibold">Total Amount:</span>
              <span className="text-xl font-bold">
                ₹ {totalAmount.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto pr-2">
            {billing.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg mb-2 overflow-hidden transition-all duration-200 ease-in-out"
              >
                <button
                  className="w-full text-left p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => toggleItem(index)}
                  aria-expanded={selectedItem === index}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">
                      {item.productName}
                    </h3>
                    {selectedItem === index ? (
                      <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Quantity: {item.quantity} | Price: ₹ {item.productPrice}
                  </div>
                </button>
                {selectedItem === index && (
                  <div className="p-4 bg-gray-50 border-t border-gray-200 animate-fadeIn">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Unit Price:</span>
                      <span> ₹ {item.productPrice}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-gray-600">Quantity:</span>
                      <span>{item.quantity}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2 font-semibold">
                      <span>Subtotal:</span>
                      <span>
                        ₹{" "}
                        {(
                          parseFloat(item.productPrice) * item.quantity
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
