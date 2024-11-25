// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Eye, EyeOff, Lock } from "lucide-react";
// import { toast } from "react-hot-toast";
// import { useMutation } from "@tanstack/react-query";
// import { postData } from "../apiService/apiservice";
// import Loader from "../components/Loader";

// export default function ForgotPasswordPage() {
//   const [resetEmail, setResetEmail] = useState("");
//   const navigate = useNavigate();

//   let { mutate,isPending } = useMutation({
//     mutationFn: async (data) => {
//       // Replace with your actual API call
//       const response = await postData("auth/forgotPassword", data);
//       if (!response.success) throw new Error("forgot password request failed");
//       return response.data;
//     },

//     onError: (error) => {
//       toast.error("Failed to request forgot password");
//     },
//     onSuccess: (data) => {
//       // toast.success("reset password mail sent successfully");
//       // navigate("/login");
//       if(data === "email not registered"){
//         toast.error("Email is not registred");
//       }else{
//         toast.success(data);
//       navigate("/login");

//       }
//     },

//   });
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Here you would typically call an API to reset the password
//     console.log("Password reset for:", resetEmail);
//     if(!resetEmail){
//       toast.error("Email is required");
//     }
//     //toast.success("Password reset successfully");
//     mutate({ email: resetEmail });

//   };

//   return (
//     <>
//     {isPending && <Loader />}

//     <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Reset your password
//         </h2>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Email address
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   required
//                   placeholder="Registerd Email"
//                   value={resetEmail}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
//                   onChange={(e) => setResetEmail(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 <Lock className="h-5 w-5 mr-2" />
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Lock } from "lucide-react";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { postData } from "../apiService/apiservice";
import Loader from "../components/Loader";

export default function ForgotPasswordPage() {
  const [resetEmail, setResetEmail] = useState("");
  const navigate = useNavigate();

  let { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      // Replace with your actual API call
      const response = await postData("auth/forgotPassword", data);
      if (!response.success) throw new Error("forgot password request failed");
      return response.data;
    },

    onError: (error) => {
      toast.error("Failed to request forgot password");
    },
    onSuccess: (data) => {
      // toast.success("reset password mail sent successfully");
      // navigate("/login");
      if (data === "email not registered") {
        toast.error("Email is not registred");
      } else {
        toast.success(data);
        navigate("/login");
      }
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you would typically call an API to reset the password
    console.log("Password reset for:", resetEmail);
    if (!resetEmail) {
      toast.error("Email is required");
    }
    //toast.success("Password reset successfully");
    mutate({ email: resetEmail });
  };

  return (
    <>
      {isPending && <Loader />}

      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
            <div className="mb-8">
              <h2 className="mt-6 text-center text-2xl sm:text-3xl font-bold text-gray-900">
                Send reset link to mail
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Enter your email address and we'll send you a link to reset your
                password.
              </p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your email address"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                >
                  <Lock className="h-5 w-5 mr-2" />
                  Submit
                </button>
              </div>
            </form>
            <div className="text-center mt-6">
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out"
              >
                Back to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
