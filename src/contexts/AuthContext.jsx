import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getData, postData } from "../apiService/apiservice";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthentcated, setisAuthentcated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      // Replace with your actual API endpoint
      const response = await postData("auth/login", { email, password });

      setisAuthentcated(true);
      toast.success(response?.data);
      await fetchUser();
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const register = async (email, password) => {
    try {
      const response = await postData("auth/register", { email, password });
      // setUser({
      //   username: username,
      //   email: "srinath@chitha.com",
      //   mobile: 8976890585,
      // });
      // localStorage.setItem(
      //   "user",
      //   JSON.stringify({
      //     username: "srinath",
      //     email: "srinath@chitha.com",
      //     mobile: 8976890585,
      //   })
      // );
      toast.success(response?.data);
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  const logout = async () => {
    try {
      const response = await getData("auth/signout");
      setUser(null);
      localStorage.clear();
      setisAuthentcated(false);
      toast.success(response?.data);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out. Please try again.");
      return;
    }
  };

  async function fetchUser() {
    try {
      const result = await getData("auth/getUserDetails");
      if (result) {
        setisAuthentcated(true);
        setUser(result.data);
      }
    } catch (error) {
      console.error("Failed to authenticate user", error);
      setisAuthentcated(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [setisAuthentcated, setUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthentcated,
        setisAuthentcated,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
