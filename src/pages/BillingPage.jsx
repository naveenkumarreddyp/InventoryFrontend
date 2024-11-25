import React, { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, X } from "lucide-react";
import BillingDetailsDialog from "../components/BillingDetailsDialog";
import Pagination from "../components/products/Pagination";
import { PulseLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import { getData } from "../apiService/apiservice";
import { formatDate } from "../utility/dateFormatter";

const ITEMS_PER_PAGE = 10;

export default function BillingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBilling, setSelectedBilling] = useState(null);
  const [mouseDownTime, setMouseDownTime] = useState(0);
  const LONG_PRESS_THRESHOLD = 100; // 500ms threshold for a long press

  const handleMouseDown = () => {
    setMouseDownTime(Date.now());
  };

  const handleMouseUp = (billing) => {
    const pressDuration = Date.now() - mouseDownTime;
    if (pressDuration < LONG_PRESS_THRESHOLD) {
      // This is a normal click (not a long press)
      setSelectedBilling(billing);
    }
  };
  const navigate = useNavigate();

  const { data: billingsData, isLoading } = useQuery({
    queryKey: ["billings"],
    queryFn: () => getData("billing/getBillings"),
  });

  const billings = billingsData?.data || [];

  const filteredBillings = useMemo(() => {
    return billings.filter(
      (billing) =>
        billing?.customerMobile?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        billing?.paidVia?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        billing?.paymentStatus?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [billings, searchTerm]);

  const totalPages = Math.ceil(filteredBillings.length / ITEMS_PER_PAGE);

  const currentBillings = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBillings.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, filteredBillings]);

  const getStatusColor = useCallback((status) => {
    switch (status) {
      case "Success":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }, []);

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Billing Details</h1>
        <button
          onClick={() => navigate("/billings/add")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full flex items-center transition duration-300 ease-in-out transform hover:scale-105"
        >
          <Plus className="mr-2" size={20} />
          New Billing
        </button>
      </div>
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search by Mobile Number | Payment method | Payment status"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value.trim());
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
          {currentBillings.length > 0 ? (
            <div className="overflow-x-auto bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Billing ID
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Mobile
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Paid Via
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentBillings.map((billing) => (
                    <tr
                      key={billing.billingId}
                      className="hover:bg-gray-50 cursor-pointer"
                      onMouseDown={handleMouseDown}
                      onMouseUp={() => handleMouseUp(billing)}
                    >
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {billing.billingId}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          ₹ {billing.finalPrice * 1}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {formatDate(billing.createdAt)}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {billing.customerMobile}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {billing.paidVia}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            billing.paymentStatus
                          )}`}
                        >
                          {billing.paymentStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-6">
              No billings available
            </div>
          )}
          {filteredBillings.length > ITEMS_PER_PAGE && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalItems={filteredBillings.length}
                itemsPerPage={ITEMS_PER_PAGE}
              />
            </div>
          )}
          <BillingDetailsDialog
            billing={selectedBilling?.productsList}
            onClose={() => setSelectedBilling(null)}
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
