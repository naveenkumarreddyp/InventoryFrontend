import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Zod from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import toast from "react-hot-toast";
import { CheckCircle, ChevronLeft } from "lucide-react";
import confetti from "canvas-confetti";
import { paymentMethodsData as paymentMethods } from "../utility/commondata";
import { useMutation } from "@tanstack/react-query";
import { postData } from "../apiService/apiservice";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const validationSchema = Zod.object({
  customerName: Zod.string({
    required_error: "Customer name is required",
    invalid_type_error: "Customer Name must be a string",
  }).min(1, "Customer name is required"),

  customerMobile: Zod.string({
    required_error: "Mobile Number is required",
    invalid_type_error: "Mobile Number must be number",
  }).regex(phoneRegex, "Invalid Mobile Number!"),
  customerEmail: Zod.string({
    required_error: "Email is required",
  }).email("Invalid email address"),
  paymentMethod: Zod.string("Select one payment method ").min(
    1,
    "Payment method is required"
  ),
  // sendBillToSMS: Zod.boolean(),
  // sendBillToWhatsApp: Zod.boolean(),
});

export default function BillingInfo() {
  const location = useLocation();
  const navigate = useNavigate();

  const { selectedProducts, totalPrice } = location.state || {
    selectedProducts: [],
    totalPrice: 0,
  };
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  let { mutate } = useMutation({
    mutationFn: async (data) => {
      // Replace with your actual API call
      const response = await postData("billing/createBilling", data);
      if (!response.success) throw new Error("API call failed");
      return response.data;
    },
    onError: (error) => {
      toast.error("Failed to create billing");
    },
    onSuccess: (variables) => {
      if (variables.paymentStatus === "Success") {
        setShowSuccessDialog(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } else {
        navigate("/billings");
      }
      localStorage.removeItem("checkout");
    },
  });

  const formik = useFormik({
    initialValues: {
      customerName: "",
      customerMobile: "",
      customerEmail: "",
      paymentMethod: "",
      // sendBillToSMS: false,
      // sendBillToWhatsApp: false,
    },
    validationSchema: toFormikValidationSchema(validationSchema),
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);
    },
  });

  const handleSubmit = async (paymentStatus) => {
    formik.setTouched({
      customerName: true,
      customerMobile: true,
      customerEmail: true,
      paymentMethod: true,
    });
    const errors = await formik.validateForm();
    if (Object.keys(errors).length > 0) {
      toast.error("Please fill the customer details correctly");
      return;
    }

    const submissionData = {
      ...formik.values,
      createdAt: new Date().toISOString(),
      createdBy: "Admin",
      productsList: selectedProducts, // Add your product list here
      totalItems: selectedProducts.length, // Add your total items count here
      finalPrice: Number(totalPrice), // Add your final price here
      paymentStatus,
      paymentStatusId:
        paymentStatus === "Success" ? 1 : paymentStatus === "Pending" ? 0 : 2,
    };

    mutate(submissionData);
  };

  const handleDone = () => {
    setShowSuccessDialog(false);
    navigate("/billings");
    localStorage.removeItem("checkout");
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6 flex items-center">
        <button
          onClick={() => navigate("/billings/add")}
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
            <li>
              <Link
                to="/billings/add"
                className="text-blue-600 hover:text-blue-800 before:content-['>'] before:mx-2"
                state={{ selectedProducts, totalPrice }}
              >
                New Billing
              </Link>
            </li>
            <li className="text-gray-500 before:content-['>'] before:mx-2">
              Billing Info
            </li>
          </ul>
        </nav>
      </div>
      <h1 className="text-3xl font-bold mb-6">Billing Information</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Items:</span>
          <span className="font-bold">{selectedProducts.length}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-gray-600">Final Price:</span>
          <span className="font-bold text-green-600">
            {/* ${totalPrice.toFixed(2)} */} ₹ {totalPrice * 1}
          </span>
        </div>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="customerName"
              className="block text-sm font-medium text-gray-700"
            >
              Customer Name
            </label>
            <input
              type="text"
              id="customerName"
              {...formik.getFieldProps("customerName")}
              className="mt-1 px-3 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            {formik.touched.customerName && formik.errors.customerName && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.customerName}
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="customerMobile"
              className="block text-sm font-medium text-gray-700"
            >
              Customer Mobile
            </label>
            <input
              type="tel"
              id="customerMobile"
              {...formik.getFieldProps("customerMobile")}
              className="mt-1 px-3 py-2 block w-full rounded-md border-gray-700 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            {formik.touched.customerMobile && formik.errors.customerMobile && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.customerMobile}
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="customerEmail"
              className="block text-sm font-medium text-gray-700"
            >
              Customer Email
            </label>
            <input
              type="email"
              id="customerEmail"
              {...formik.getFieldProps("customerEmail")}
              className="mt-1 px-3 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            {formik.touched.customerEmail && formik.errors.customerEmail && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.customerEmail}
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="paymentMethod"
              className="block text-sm font-medium text-gray-700"
            >
              Payment Method
            </label>
            <select
              id="paymentMethod"
              {...formik.getFieldProps("paymentMethod")}
              className="mt-1 px-3 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="" disabled>
                Select a payment method
              </option>
              {paymentMethods.map((method) => (
                <option key={method.method} value={method.method}>
                  {method.method}
                </option>
              ))}
            </select>
            {formik.touched.paymentMethod && formik.errors.paymentMethod && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.paymentMethod}
              </div>
            )}
          </div>
        </div>
        {/* <div className="mt-6  flex justify-around items-center">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="sendBillToSMS"
              {...formik.getFieldProps("sendBillToSMS")}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <label
              htmlFor="sendBillToSMS"
              className="ml-2 block text-sm text-gray-900"
            >
              Send bill to SMS
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="sendBillToWhatsApp"
              {...formik.getFieldProps("sendBillToWhatsApp")}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <label
              htmlFor="sendBillToWhatsApp"
              className="ml-2 block text-sm text-gray-900"
            >
              Send bill to WhatsApp
            </label>
          </div>
        </div> */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            // onClick={handleSuccess}
            onClick={() => handleSubmit("Success")}
            type="button"
            className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            Pay Now
          </button>
          <button
            type="button"
            // onClick={handlePayLater}
            onClick={() => handleSubmit("Pending")}
            className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            Pay Later
          </button>
          <button
            type="button"
            // onClick={handleRejected}
            onClick={() => handleSubmit("Failed")}
            className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            Cancel
          </button>
        </div>
      </form>
      {showSuccessDialog && (
        // <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 overflow-y-auto">
          <div className="bg-white rounded-lg p-8 max-w-sm w-full">
            <div className="flex justify-center items-center mb-4">
              <h2 className="text-2xl font-bold text-green-600">
                Payment Successful
              </h2>
            </div>
            <div className="text-center">
              <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
              <p className="text-gray-600 mb-6">
                Your payment has been processed successfully.
              </p>
              <button
                onClick={handleDone}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
