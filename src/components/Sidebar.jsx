import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LogOut,
  Home,
  LayoutDashboard,
  BarChart2,
  ShoppingCart,
  Tag,
  Boxes,
} from "lucide-react";
import { navItems, appInfo } from "../utility/commondata";
import { useAuth } from "../contexts/AuthContext";

const iconMap = {
  Home,
  LayoutDashboard,
  BarChart2,
  ShoppingCart,
  Tag,
};

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const getAppNameFontSize = (name) => {
    if (name.length <= 15) return "text-xl";
    if (name.length <= 20) return "text-lg";
    return "text-base";
  };

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <aside
      className={`${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col`}
    >
      <div
        className="flex items-center justify-center h-20 border-b px-4 relative"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div className="flex-shrink-0 w-10 h-10 mr-3">
          <Boxes className="w-full h-full " />
        </div>
        <h1
          className={`font-bold text-gray-800 truncate ${getAppNameFontSize(
            appInfo.name
          )}`}
        >
          {appInfo.name}
        </h1>
        {showTooltip && appInfo.name.length > 17 && (
          <div className="absolute left-1/2 top-full mt-2 bg-gray-800 text-white p-2 rounded shadow-lg transform -translate-x-1/2 z-50 whitespace-nowrap">
            {appInfo.name}
          </div>
        )}
      </div>
      <nav className="flex-grow mt-5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-6 py-2 mt-4 transition-colors duration-300 ease-in-out ${
                isActive(item.path)
                  ? "bg-gray-200 text-gray-700"
                  : "text-gray-500 hover:bg-gray-200 hover:text-gray-700"
              }`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <button
        onClick={handleLogout}
        className="flex items-center px-6 py-3 mt-auto mb-8 text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300 ease-in-out"
      >
        <LogOut className="h-5 w-5 mr-3 flex-shrink-0" />
        <span className="truncate">Logout</span>
      </button>
    </aside>
  );
}
