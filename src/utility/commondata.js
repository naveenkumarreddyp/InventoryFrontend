export const appInfo = {
  name: "Inventory App",
  logo: "./src/assets/AppLogo.svg",
};

export const navItems = [
  { name: "Home", path: "/home", icon: "Home" },
  { name: "Billings", path: "/billings", icon: "LayoutDashboard" },
  { name: "Reports", path: "/reports", icon: "BarChart2" },
  { name: "Products", path: "/products", icon: "ShoppingCart" },
  { name: "Categories", path: "/categories", icon: "Tag" },
];

export const pastThreeMonthsBilling = [
  { month: "January", amount: 45000 },
  { month: "February", amount: 52000 },
  { month: "March", amount: 49000 },
];

// Generate data for payment methods
export const paymentMethodsData = [
  { method: "UPI" },
  { method: "Credit Card" },
  { method: "Debit Card" },
  { method: "Cash" },
  { method: "Others" },
];
