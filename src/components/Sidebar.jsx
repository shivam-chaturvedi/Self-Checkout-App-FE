import React, { useState } from "react";
import { GiCctvCamera } from "react-icons/gi";

const Sidebar = ({ active, setActiveProp }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility

  const handleMenuClick = (menu) => {
    setActiveProp(menu);
    setIsSidebarOpen(false); // Close sidebar on mobile
  };

  return (
    <div>
      {/* Burger Menu Button */}
      <button
        className="p-1 w-10 md:hidden text-black text-2xl fixed top-[75px] right-0 z-20"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`h-screen top-0 fixed w-72 z-20 bg-black text-white flex flex-col transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-purple-500">
          <svg
            width="30px"
            height="40px"
            viewBox="0 0 24 24"
            id="meteor-icon-kit__regular-sidebar"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_525_143)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 4C4.44772 4 4 4.44772 4 5V13C4 13.5523 4.44772 14 5 14H11C11.5523 14 12 13.5523 12 13V5C12 4.44772 11.5523 4 11 4H5ZM6 6V12H10V6H6Z"
                fill="#758CA3"
              />
              <path
                d="M5 17C4.44772 17 4 17.4477 4 18C4 18.5523 4.44772 19 5 19H11C11.5523 19 12 18.5523 12 18C12 17.4477 11.5523 17 11 17H5Z"
                fill="#758CA3"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 0C0.89543 0 0 0.895431 0 2V22C0 23.1046 0.895431 24 2 24H22C23.1046 24 24 23.1046 24 22V2C24 0.895431 23.1046 0 22 0H2ZM16 22H22V2L16 2V22ZM14 2L2 2V22H14V2Z"
                fill="#758CA3"
              />
            </g>
            <defs>
              <clipPath id="clip0_525_143">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>

        {/* Menu Items */}
        <nav className="flex-grow">
          <ul>
            <li
              onClick={() => handleMenuClick("users")}
              className={
                active === "users"
                  ? "p-4 hover:bg-purple-700 bg-green-900 mt-5"
                  : "p-4 hover:bg-purple-700 mt-5"
              }
            >
              <button className="flex items-center space-x-3">
                <span className="text-xl">👥</span>
                <span>Manage Users</span>
              </button>
            </li>
            <li
              onClick={() => handleMenuClick("products")}
              className={
                active === "products"
                  ? "p-4 hover:bg-purple-700 bg-green-900"
                  : "p-4 hover:bg-purple-700"
              }
            >
              <button className="flex items-center space-x-3">
                <span className="text-xl">🛍️</span>
                <span>Manage Products</span>
              </button>
            </li>
            <li
              onClick={() => handleMenuClick("carts")}
              className={
                active === "carts"
                  ? "p-4 hover:bg-purple-700 bg-green-900"
                  : "p-4 hover:bg-purple-700"
              }
            >
              <button className="flex items-center space-x-3">
                <span className="text-xl">🛒</span>
                <span>Manage Store Carts</span>
              </button>
            </li>
            <li
              onClick={() => handleMenuClick("reports")}
              className={
                active === "reports"
                  ? "p-4 hover:bg-purple-700 bg-green-900"
                  : "p-4 hover:bg-purple-700"
              }
            >
              <button className="flex items-center space-x-3">
                <span className="text-xl">📊</span>
                <span>Reports</span>
              </button>
            </li>
            <li
              onClick={() => handleMenuClick("salesDashboard")}
              className={
                active === "salesDashboard"
                  ? "p-4 hover:bg-purple-700 bg-green-900"
                  : "p-4 hover:bg-purple-700"
              }
            >
              <button className="flex items-center space-x-3">
                <span className="text-xl">📈</span>
                <span>Sales Dashboard</span>
              </button>
            </li>
            <li
              onClick={() => handleMenuClick("surveillance")}
              className={
                active === "surveillance"
                  ? "p-4 hover:bg-purple-700 bg-green-900"
                  : "p-4 hover:bg-purple-700"
              }
            >
              <button className="flex items-center space-x-3">
                <span className="text-xl">
                  <GiCctvCamera />
                </span>
                <span>Surveillance</span>
              </button>
            </li>
            <li
              onClick={() => handleMenuClick("Refund")}
              className={
                active === "Refund"
                  ? "p-4 px-3 hover:bg-purple-700 bg-green-900"
                  : "p-4 px-3 hover:bg-purple-700"
              }
            >
              <button className="flex items-center space-x-3">
                <span className="text-xl">👥</span>
                <span>Track Refunds</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
