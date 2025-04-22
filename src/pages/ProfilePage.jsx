"use client";
import { Settings, User, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { BACKEND_SERVER_URL } from "../utils/config";

export default function UserProfile({ user }) {
  const [activeTab, setActiveTab] = useState("Transactions"); // Active tab state
  const [visibleTransactions, setVisibleTransactions] = useState(5);
  const handleViewMore = () => {
    setVisibleTransactions((prev) => prev + 5);
  };

  function formatDateTime(dateTimeString) {
    const options = {
      timeZone: "Asia/Kolkata",
      timeZoneName: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    const utcDateTimeString = dateTimeString.endsWith("Z")
      ? dateTimeString
      : dateTimeString + "Z";
    const date = new Date(utcDateTimeString);

    return date.toLocaleString("en-US", options);
  }

  const initReq = async (transactionId) => {
    try {
      const response = await fetch(
        `${BACKEND_SERVER_URL}/api/init-refund/${transactionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt_token"),
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Refund request initiated successfully!");
      } else {
        alert(`Error: ${data.error || "Failed to initiate refund"}`);
      }
    } catch (error) {
      alert("Network error. Please try again.");
      console.error("Refund request error:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-gray-100 rounded-lg p-6 shadow">
        <div className="w-24 h-24 rounded-full border-4 capitalize border-blue-500 bg-gray-300 flex items-center justify-center text-2xl font-bold">
          {user && user.email.slice(0, 4)}
        </div>
        <div className="text-center sm:text-left">
          <h1 className="text-xl md:text-3xl font-bold">
            {user && user.email}
          </h1>
          <p className="text-xl text-gray-500">
            Member since: {user && formatDateTime(user.createdAt)}
          </p>
          <p className="text-xl text-gray-500">
            Member role: {user && user.role}
          </p>
        </div>
        <div className="flex-grow" />
      </header>

      {/* Tabs */}
      <div className="space-y-6">
        <div className="flex border-b border-gray-300">
          {["Transactions", "Payment Methods", "Preferences", "Account"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 text-center font-medium ${
                  activeTab === tab
                    ? "text-blue-500 border-b-4 border-blue-500"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>

        {/* Content Based on Active Tab */}
        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === "Transactions" && (
            <>
              <h2 className="text-xl font-semibold">Recent Transactions</h2>
              <p className="text-gray-500 mb-4">
                Your last transactions are listed below.
              </p>
              <div className="overflow-auto h-1/2">
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2">ID</th>
                      <th className="px-4 py-2">Date</th>
                      <th className="px-4 py-2">Receipt</th>
                      <th className="px-4 py-2">Amount</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Request Refund</th>
                      <th className="px-4 py-2">Download Bill</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user !== null &&
                      user.transactions
                        .slice(0, visibleTransactions)
                        .map((transaction) => (
                          <tr
                            key={transaction.id}
                            className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
                          >
                            <td className="border px-4 py-2">
                              {transaction.id}
                            </td>
                            <td className="border px-4 py-2">
                              {formatDateTime(transaction.updatedAt)}
                            </td>
                            <td className="border px-4 py-2">
                              {transaction.receipt}
                            </td>
                            <td className="border px-4 py-2">
                              ₹{transaction.amount}
                            </td>
                            <td
                              className={`border px-4 py-2 font-bold ${
                                transaction.status === "Completed"
                                  ? "text-green-500"
                                  : "text-yellow-500"
                              }`}
                            >
                              {transaction.status}
                            </td>
                            <td className="border px-4 py-2">
                              <button
                                className="bg-green-300 p-2 rounded-2"
                                onClick={() => {
                                  initReq(transaction.id);
                                }}
                              >
                                Request Refund
                              </button>
                            </td>
                            <td className="border px-4 py-2 text-center">
                              {transaction.status === "Completed" ? (
                                <a
                                  href={`${BACKEND_SERVER_URL}/user-cart/get-bill/${transaction.id}`}
                                  className="inline-flex flex-col items-center justify-center space-y-1 transition-transform transform hover:scale-105"
                                >
                                  <img
                                    src="/images/download.png"
                                    alt="Download"
                                    className="w-8 h-8"
                                  />
                                  <span className="bg-green-500 text-white text-sm px-3 py-1 rounded-md shadow hover:bg-green-600 transition-all duration-200">
                                    Download Bill
                                  </span>
                                </a>
                              ) : (
                                <span className="text-gray-400 italic">
                                  Not Available
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
              {user.transactions.length > visibleTransactions && (
                <button
                  onClick={handleViewMore}
                  className="mt-4 w-full px-4 py-2 text-blue-500 border border-blue-500 rounded-md hover:bg-blue-100"
                >
                  View More Transactions
                </button>
              )}
            </>
          )}
          {activeTab === "Payment Methods" && (
            <div className="h-64 flex items-center justify-center text-gray-500 text-lg">
              No Payment Methods Saved Yet
            </div>
          )}
          {activeTab === "Preferences" && (
            <div className="h-64 flex items-center justify-center text-gray-500 text-lg">
              No Preferences Set
            </div>
          )}
          {activeTab === "Account" && (
            <div>
              <h2 className="text-xl font-semibold">Account Information</h2>
              <ul className="mt-4 space-y-2">
                <li>
                  <strong>Email:</strong> {user.email}
                </li>
                <li>
                  <strong>Role:</strong> {user.role}
                </li>
                <li>
                  <strong>Member Since:</strong>{" "}
                  {formatDateTime(user.createdAt)}
                </li>
                <li>
                  <strong>Last Updated:</strong>{" "}
                  {formatDateTime(user.updatedAt)}
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="flex justify-center gap-4 mt-6">
        <button className="p-2 rounded-full hover:bg-gray-200">
          <User className="w-5 h-5 text-gray-700" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-200">
          <ShoppingBag className="w-5 h-5 text-gray-700" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-200">
          <Settings className="w-5 h-5 text-gray-700" />
        </button>
      </footer>
    </div>
  );
}
