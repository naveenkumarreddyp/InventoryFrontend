import React from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function Header({ toggleSidebar, isSidebarOpen }) {
  const { user: UserData } = useAuth();

  return (
    <header className="flex items-center justify-between min-h-20 px-6 bg-white border-b">
      <button
        onClick={toggleSidebar}
        className="p-1 text-gray-400 focus:outline-none focus:ring lg:hidden"
        aria-label="Toggle sidebar"
      >
        {isSidebarOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>
      <div className="flex-grow" />
      <div className="flex items-center">
        <span className="text-xl font-semibold text-gray-800">
          Welcome, {UserData ? UserData.username : "Guest"}!
        </span>
      </div>
    </header>
  );
}
