// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await login(username, password);
//   };

//   const text =
//     "The backend is currently deployed on a free-tier server, which may experience occasional unavailability.";
//   const [displayedText, setDisplayedText] = useState("");
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     if (index < text.length) {
//       const timeoutId = setTimeout(() => {
//         setDisplayedText((prev) => prev + text[index]);
//         setIndex(index + 1);
//       }, 100);
//       return () => clearTimeout(timeoutId);
//     }
//   }, [index, text]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div className="text-center mb-10">
//           <p className="text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
//             {displayedText}
//           </p>
//           {index === text.length && (
//             <a
//               href={import.meta.env.VITE_BASE_URL}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="relative font-medium bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent underline ml-2"
//             >
//               Click here to check the server status
//               <span className="absolute inset-x-0 bottom-[-2px] h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></span>
//             </a>
//           )}
//         </div>
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Sign in to your account
//           </h2>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <input type="hidden" name="remember" defaultValue="true" />
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <label htmlFor="username" className="sr-only">
//                 Username
//               </label>
//               <input
//                 id="username"
//                 name="username"
//                 type="text"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="sr-only">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Sign in
//             </button>
//           </div>
//         </form>
//         <div className="text-center">
//           <Link
//             to="/register"
//             className="font-medium text-indigo-600 hover:text-indigo-500"
//           >
//             Don't have an account? Register here
//           </Link>
//         </div>
//         <div className="text-center">
//           <Link
//             to="/forgot-password"
//             className="font-medium text-indigo-600 hover:text-indigo-500"
//           >
//             Forgot Password? Reset here
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  const text =
    "The backend is currently deployed on a free-tier server, which may experience occasional unavailability.";
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [index, text]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start sm:justify-center bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md mx-auto mt-8 sm:mt-16 mb-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="text-center mb-4">
              <p className="text-sm sm:text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {displayedText}
              </p>
              {index === text.length && (
                <a
                  href={import.meta.env.VITE_SERVER_BASE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                >
                  Check server status
                </a>
              )}
            </div>
            <div className="w-full max-w-md space-y-8">
              <h2 className="mt-6 text-center text-2xl sm:text-3xl font-bold text-gray-900">
                Sign in to your account
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                  >
                    Sign in
                  </button>
                </div>
              </form>
              <div className="mt-6 flex flex-col space-y-2 text-sm text-center">
                <Link
                  to="/register"
                  className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                >
                  Don't have an account? Register here
                </Link>
                <Link
                  to="/forgot-password"
                  className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                >
                  Forgot Password? Reset here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
