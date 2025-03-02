"use client";
import { Settings, User, ShoppingBag } from "lucide-react";
import { useState } from "react";

export default function UserProfile({ user }) {
  const [activeTab, setActiveTab] = useState("Transactions"); // Active tab state
  const [visibleTransactions, setVisibleTransactions] = useState(5);
  const handleViewMore = () => {
    setVisibleTransactions((prev) => prev + 5);
  };
  
  function formatDateTime(dateTimeString) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
  
    const date = new Date(dateTimeString);
    return date.toLocaleString("en-US", options);
  }
  
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
                    </tr>
                  </thead>
                  <tbody>
                    {user!==null &&
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
                              {formatDateTime(transaction.createdAt)}
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
                  <strong>Member Since:</strong> {formatDateTime(user.createdAt)}
                </li>
                <li>
                  <strong>Last Updated:</strong> {formatDateTime(user.updatedAt)}
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
