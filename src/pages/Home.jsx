import { useNavigate } from "react-router-dom";
import {
  Plus,
  CreditCard,
  Tag,
  ChevronRight,
  CalendarDays,
  FileText,
  List,
} from "lucide-react";
import { getData } from "../apiService/apiservice";
import { useQuery } from "@tanstack/react-query";
import { formatDate as formattedDate } from "../utility/dateFormatter";

export default function HomePage() {
  const navigate = useNavigate();

  const { data: recentbillingsData } = useQuery({
    queryKey: ["billings"],
    queryFn: async () => await getData("billing/recentbillings"),
  });
  const recentTransactions = recentbillingsData?.data || [];
  const { data: todaysbillingsData } = useQuery({
    queryKey: ["todaysbillings"],
    queryFn: async () => await getData("billing/fetchbillings/today"),
  });

  const todayBillingsData = todaysbillingsData?.data?.[0] || {
    totalBillings: 0,
    totalAmount: 0,
  };
  const { data: monthlybillingsData } = useQuery({
    queryKey: ["monthlybillings"],
    queryFn: async () => await getData("billing/fetchbillings/monthly"),
  });
  const monthBillingsData = monthlybillingsData?.data?.[0] || {
    totalBillings: 0,
    totalAmount: 0,
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-2 py-4">
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6 border-t-[1px]">
          <div className="text-center mb-4">
            <CalendarDays className="mx-auto mb-2" />
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              {formatDate(new Date())}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Today's Bills</p>
              <p className="text-2xl font-bold text-gray-800">
                {todayBillingsData?.totalBillings}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Today's Amount</p>
              <p className="text-2xl font-bold text-gray-800">
                ₹ {todayBillingsData?.totalAmount?.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Monthly Bills</p>
              <p className="text-2xl font-bold text-gray-800">
                {monthBillingsData?.totalBillings}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Monthly Amount</p>
              <p className="text-2xl font-bold text-gray-800">
                ₹ {monthBillingsData?.totalAmount?.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-t-[1px]">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Quick Actions
          </h2>
          <div className=" p-6 flex flex-col justify-center items-center space-y-4">
            <button
              onClick={() => navigate("/billings")}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
            >
              <FileText className="mr-2" />
              New Billing
            </button>
            <button
              onClick={() => navigate("/products")}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
            >
              <CreditCard className="mr-2" />
              Add Product
            </button>
            <button
              onClick={() => navigate("/categories")}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
            >
              <Tag className="mr-2" />
              Add Category
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Recent Transactions
          </h2>
          <button
            onClick={() => navigate("/billings")}
            className="text-blue-500 hover:text-blue-600 font-medium flex items-center"
          >
            View All Transactions
            <ChevronRight size={20} />
          </button>
        </div>
        {recentTransactions?.length >0 ? (
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full leading-normal">
              <thead className="h-10">
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Billing ID
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions?.map((transaction) => (
                  <tr key={transaction.billingId} className="hover:bg-gray-50">
                    <td className="px-4 py-2 whitespace-nowrap">
                      {transaction.billingId}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {/* ${transaction?.finalPrice.toFixed(2)} */}₹{" "}
                      {transaction?.finalPrice * 1}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {/* {new Date(transaction.createdAt).toLocaleDateString()} */}
                      {formattedDate(transaction?.createdAt)}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          transaction.paymentStatus === "Success"
                            ? "bg-green-100 text-green-800"
                            : transaction.paymentStatus === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {transaction.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            No recent transactions.
          </div>
        )}
      </div>
    </div>
  );
}
