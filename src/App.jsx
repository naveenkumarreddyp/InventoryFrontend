import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Home from "./pages/Home";
import Reports from "./pages/Reports";
import BillingPage from "./pages/BillingPage";
import Categories from "./pages/Categories";
import NewBilling from "./pages/Create Billing";
import BillingInfo from "./pages/BillingInfo";
import ResetPasswordPage from "./pages/ResetPassword";
import ForgotPasswordPage from "./pages/ForgotPassword";
import PageNotFound from "./pages/PageNotFound";

function ProtectedRoutes({ children }) {
  const { isAuthentcated } = useAuth();
  return isAuthentcated ? <>{children}</> : <Navigate to="/login" />;
}

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthentcated } = useAuth();

  if (isAuthentcated) {
    return <Navigate to="/home" />;
  }
  return children;
};

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Layout />
            </ProtectedRoutes>
          }
        >
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="billings" element={<BillingPage />} />
          <Route path="billings/billingInfo" element={<BillingInfo />} />
          <Route path="billings/add" element={<NewBilling />} />
          <Route path="reports" element={<Reports />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
        </Route>
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <Login />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/register"
          element={
            <RedirectAuthenticatedUser>
              <Register />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <RedirectAuthenticatedUser>
              <ForgotPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/reset-password/:resetToken"
          element={
            <RedirectAuthenticatedUser>
              <ResetPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <Toaster position="top-right" />
    </>
  );
}

export default App;
