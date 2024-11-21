"use client"
import { useState } from 'react';
import { CreditCard, Receipt, Settings, User, ShoppingBag } from 'lucide-react';

export default function UserProfile({user}) {
  const [notifications, setNotifications] = useState(true);
  const [expressCheckout, setExpressCheckout] = useState(false);

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-gray-100 rounded-lg p-6 shadow">
        <div className="w-24 h-24 rounded-full border-4 capitalize border-blue-500 bg-gray-300 flex items-center justify-center text-2xl font-bold">
          {user && user.email.slice(0,4)}
        </div>
        <div className="text-center sm:text-left">
          <h1 className="text-xl md:text-3xl font-bold ">{user && user.email}</h1>
          <p className="text-xl text-gray-500">Member since : {user && user.createdAt}</p>
          <p className="text-xl text-gray-500">Member role : {user && user.role}</p>
        </div>
        <div className="flex-grow" />
        <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200">
          Edit Profile
        </button>
      </header>

      {/* Tabs */}
      <div className="space-y-6">
        <div className="flex border-b border-gray-300">
          <button className="flex-1 py-2 text-center font-medium text-gray-700 hover:bg-gray-200">Transactions</button>
          <button className="flex-1 py-2 text-center font-medium text-gray-700 hover:bg-gray-200">Payment Methods</button>
          <button className="flex-1 py-2 text-center font-medium text-gray-700 hover:bg-gray-200">Preferences</button>
          <button className="hidden lg:flex flex-1 py-2 text-center font-medium text-gray-700 hover:bg-gray-200">Account</button>
        </div>

        {/* Content: Transactions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          <p className="text-gray-500 mb-4">Your last 5 self-checkout transactions</p>
          <ul className="space-y-4">
            {[
              { date: '2023-06-01', items: 3, total: 45.99 },
              { date: '2023-05-28', items: 1, total: 12.99 },
              { date: '2023-05-25', items: 5, total: 78.50 },
              { date: '2023-05-22', items: 2, total: 23.98 },
              { date: '2023-05-19', items: 4, total: 56.75 },
            ].map((transaction, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-2 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                <div className="flex items-center gap-4">
                  <Receipt className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="font-medium">{transaction.date}</p>
                    <p className="text-sm text-gray-500">{transaction.items} items</p>
                  </div>
                </div>
                <p className="font-bold">${transaction.total.toFixed(2)}</p>
              </li>
            ))}
          </ul>
          <button className="mt-4 w-full px-4 py-2 text-blue-500 border border-blue-500 rounded-md hover:bg-blue-100">
            View All Transactions
          </button>
        </div>

        {/* Footer */}
        <footer className="flex justify-center gap-4">
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
    </div>
  );
}

