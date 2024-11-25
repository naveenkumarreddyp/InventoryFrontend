import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { FileText, DollarSign, User } from "lucide-react";
// import { pastThreeMonthsBilling } from "../utility/commondata";
import { useQuery } from "@tanstack/react-query";
import { getData } from "../apiService/apiservice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Reports() {
  const { data: yearlybillingsData } = useQuery({
    queryKey: ["yearlybillings"],
    queryFn: async () => await getData("billing/fetchbillings/yearly"),
  });
  const { data: topcustomerData } = useQuery({
    queryKey: ["topCustomer"],
    queryFn: async () => await getData("report/topcustomer"),
  });

  const { data: paymnetMethosReport } = useQuery({
    queryKey: ["paymnetmethodreports"],
    queryFn: async () => await getData("report/paymentmethodreports"),
  });

  const { data: lastthreemonthsReport } = useQuery({
    queryKey: ["lastthreemonthsreports"],
    queryFn: async () => await getData("report/lastthreemonthsreports"),
  });

  const pastThreeMonthsBilling = lastthreemonthsReport?.data || [];

  const paymentMethodsData = paymnetMethosReport?.data || [];

  const topCustomerData = topcustomerData?.data?.[0] || {
    totalAmount: 0,
    totalBillings: 0,
    customerName: "John Doe",
  };

  const yearlyBillingsData = yearlybillingsData?.data?.[0] || {
    totalBillings: 0,
    totalAmount: 0,
  };

  const barChartData = {
    labels: pastThreeMonthsBilling.map((item) => item.month),
    datasets: [
      {
        label: "Billing Amount",
        data: pastThreeMonthsBilling.map((item) => item.amount),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Past 3 Months Billing Amount",
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Amount ( ₹ )",
        },
      },
    },
  };
  function capitalizeFLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  const pieChartData = {
    labels: paymentMethodsData.map((item) => item.method),
    datasets: [
      {
        data: paymentMethodsData.map((item) => item.amount),
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Payment Methods Distribution",
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Bills (YTD)"
          value={yearlyBillingsData?.totalBillings}
          icon={<FileText className="h-6 w-6" />}
        />
        <StatCard
          title="Total Amount (YTD)"
          value={`₹ ${yearlyBillingsData?.totalAmount?.toFixed(2)}`}
          icon={<DollarSign className="h-6 w-6" />}
        />
        <StatCard
          title="Top Customer"
          value={`${capitalizeFLetter(topCustomerData?.customerName)}`}
          subValue={`₹ ${topCustomerData?.totalAmount} - ${topCustomerData?.totalBillings} bills`}
          icon={<User className="h-6 w-6" />}
        />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          {/* <h2 className="text-xl font-semibold mb-4">
            Past 3 Months Billing Amount
          </h2> */}
          <div className="h-80 md:h-96">
            {pastThreeMonthsBilling?.length > 0 ? (
              <Bar options={barChartOptions} data={barChartData} />
            ) : (
              <div className="h-full flex items-center justify-center">
                No data available
              </div>
            )}
          </div>
        </div>

        <div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          {/* <h2 className="text-xl font-semibold mb-4">
            Payment Methods Distribution
          </h2> */}
          <div className="h-80 md:h-96">
            {paymentMethodsData?.length > 0 ? (
              <Pie options={pieChartOptions} data={pieChartData} />
            ) : (
              <div className="h-full flex items-center justify-center">
                No data available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, subValue, icon }) {
  return (
    <div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className="text-blue-500">{icon}</div>
      </div>
      <div className="text-3xl font-bold text-gray-800 mb-2">{value}</div>
      {subValue && <p className="text-sm text-gray-500">{subValue}</p>}
    </div>
  );
}
