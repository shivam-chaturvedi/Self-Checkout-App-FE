"use client";
import { useState } from "react";
import { CreditCard, Wallet, Building } from "lucide-react";

export default function Checkout({ totalPrice, setCheckoutModal }) {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  const handlePayment = () => {
    console.log("Payment method:", paymentMethod);
    // Add your payment handling logic here
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal Container */}
      <div className="bg-white shadow-md rounded-lg w-full max-w-lg p-6 mx-4 sm:mx-0">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-8 text-primary text-center">
          Retail Edge
        </h1>

        {/* Checkout Card */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-center">Checkout</h2>
          <div className="text-center mt-4">
            <p className="text-lg font-medium">Total Amount</p>
            <p className="text-3xl font-bold text-primary">${totalPrice}</p>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-6">
          <label className="block text-base font-semibold mb-2">
            Select Payment Method
          </label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                value="credit-card"
                id="credit-card"
                name="payment-method"
                checked={paymentMethod === "credit-card"}
                onChange={() => setPaymentMethod("credit-card")}
                className="h-5 w-5"
              />
              <label
                htmlFor="credit-card"
                className="flex items-center space-x-2 cursor-pointer"
              >
                <CreditCard className="h-5 w-5" />
                <span>Credit/Debit Card</span>
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                value="digital-wallet"
                id="digital-wallet"
                name="payment-method"
                checked={paymentMethod === "digital-wallet"}
                onChange={() => setPaymentMethod("digital-wallet")}
                className="h-5 w-5"
              />
              <label
                htmlFor="digital-wallet"
                className="flex items-center space-x-2 cursor-pointer"
              >
                <Wallet className="h-5 w-5" />
                <span>Digital Wallet</span>
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                value="bank-transfer"
                id="bank-transfer"
                name="payment-method"
                checked={paymentMethod === "bank-transfer"}
                onChange={() => setPaymentMethod("bank-transfer")}
                className="h-5 w-5"
              />
              <label
                htmlFor="bank-transfer"
                className="flex items-center space-x-2 cursor-pointer"
              >
                <Building className="h-5 w-5" />
                <span>Bank Transfer</span>
              </label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => setCheckoutModal(false)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg border border-gray-400 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            className="px-4 py-2 bg-[#22c638] text-white rounded-lg border border-primary hover:bg-secondary"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}
