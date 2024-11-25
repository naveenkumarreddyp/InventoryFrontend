// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { Eye, EyeOff, Lock } from "lucide-react";
// import { toast } from "react-hot-toast";
// import { getData, getDatabyparams, postData } from "../apiService/apiservice";
// import { useQuery,useMutation } from "@tanstack/react-query";
// import Loader from "../components/Loader";

// export default function ResetPasswordPage() {
//   const [email, setEmail] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   // const location = useLocation();
//   const navigate = useNavigate();
//   let { resetToken } = useParams();

// // console.log("----params----", resetToken)
//   // useEffect(() => {
//   //   const params = new URLSearchParams(location.search);
//   //   const emailFromUrl = params.get("email");
//   //   if (emailFromUrl) {
//   //     setEmail(decodeURIComponent(emailFromUrl));
//   //   }
//   // }, [location]);

//   const {
//     data: userInfo,
//   } = useQuery({
//     queryKey: ["reset-token"],
//     queryFn: () => getData(`auth/getUserInfoByResetToken/?resettoken=${resetToken}`),
//   });
// console.log("useronfo--",userInfo)
//   let { mutate,isPending } = useMutation({
//     mutationFn: async (data) => {
//       // Replace with your actual API call
//       const response = await postData("auth/resetPassword", data);
//       if (!response.success) throw new Error("reset password request failed");
//       return response.data;
//     },

//     onError: (error) => {
//       toast.error("Failed to request reset password");
//     },
//     onSuccess: (data) => {
//       toast.success("Reset Password Successful");
//       navigate("/login");
//     },

//   });
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (newPassword !== confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }
//     // Here you would typically call an API to reset the password
//     // console.log("Password reset for:", email);
//     if(!userInfo?.data?.email){
//       toast.error("Email is required");
//     }
//     //toast.success("Password reset successfully");
//     mutate({ email: userInfo?.data?.email,  newPassword:newPassword, resetToken:resetToken });
//   };

//   return (
//     <>
//     {isPending && <Loader />}
//     <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset your password</h2>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email address
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   value={userInfo?.data?.email}
//                   readOnly
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
//                 New password
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <input
//                   id="new-password"
//                   name="new-password"
//                   type={showPassword ? "text" : "password"}
//                   required
//                   value={newPassword}
//                   onChange={(e) => setNewPassword(e.target.value)}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//                 <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
//                   {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
//                 </button>
//               </div>
//             </div>

//             <div>
//               <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
//                 Confirm new password
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <input
//                   id="confirm-password"
//                   name="confirm-password"
//                   type={showConfirmPassword ? "text" : "password"}
//                   required
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//                 <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
//                   {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
//                 </button>
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 <Lock className="h-5 w-5 mr-2" />
//                 Reset Password
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
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import { Eye, EyeOff, Lock } from "lucide-react";
import { toast } from "react-hot-toast";
import { getData, getDatabyparams, postData } from "../apiService/apiservice";
import { useQuery, useMutation } from "@tanstack/react-query";
import Loader from "../components/Loader";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  let { resetToken } = useParams();

  const { data: userInfo } = useQuery({
    queryKey: ["reset-token"],
    queryFn: () =>
      getData(`auth/getUserInfoByResetToken/?resettoken=${resetToken}`),
  });
  console.log("useronfo--", userInfo);
  let { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      // Replace with your actual API call
      const response = await postData("auth/resetPassword", data);
      if (!response.success) throw new Error("reset password request failed");
      return response.data;
    },

    onError: (error) => {
      toast.error("Failed to request reset password");
    },
    onSuccess: (data) => {
      toast.success("Reset Password Successful");
      navigate("/login");
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    // Here you would typically call an API to reset the password
    // console.log("Password reset for:", email);
    if (!userInfo?.data?.email) {
      toast.error("Email is required");
    }
    //toast.success("Password reset successfully");
    mutate({
      email: userInfo?.data?.email,
      newPassword: newPassword,
      resetToken: resetToken,
    });
  };

  return (
    <>
      {isPending && <Loader />}
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
            <div className="mb-8">
            <h2 className="mt-6 text-center text-2xl sm:text-3xl font-bold text-gray-900">
                Reset your password
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Enter your new password below
              </p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={userInfo?.data?.email}
                    readOnly
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="new-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  New password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="new-password"
                    name="new-password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                          clipRule="evenodd"
                        />
                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm new password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                          clipRule="evenodd"
                        />
                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                >
                  <Lock className="h-5 w-5 mr-2" />
                  Reset Password
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
