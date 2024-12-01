"use client";

import { useState } from "react";
import { BACKEND_SERVER_URL } from "../utils/config";
import LoaderComponent from "./LoaderComponent";

const Checkout = ({ scannedItems, User, totalPrice, setCheckoutModal }) => {
  const [loader, setLoader] = useState(false);

  // Function to verify the payment status with Razorpay API
  // console.log(User);
  const verifyPayment = async (paymentId, transaction_id) => {
    // console.log(paymentId,transactionID);
    setLoader(true);
    try {
      const response = await fetch(
        `${BACKEND_SERVER_URL}/api/verify-payment?payment_id=${paymentId}&transaction_id=${transaction_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          },
        }
      );
      const paymentDetails = await response.json();
      if (paymentDetails.ok) {
        // console.log(paymentDetails);
        setLoader(false);
      } else {
        console.log("Payment verification failed");
        setLoader(false);
      }
    } catch (error) {
      console.error("Error verifying payment", error);
      setLoader(false);
    }
  };

  const handlePayment = async () => {
    setLoader(true);
    const data_to_send = {
      username: User.email,
      cart: scannedItems.filter(item => item.id).map(item => ({
        id: item.id,
        quantity: item.quantity // Add the quantity to the object
      })),
    };
    
    // console.log(data_to_send);
    try {
      const response = await fetch(`${BACKEND_SERVER_URL}/api/create-order`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data_to_send),
      });
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        setLoader(false);
        console.error("Failed to create order");
        return;
      } else {
        setLoader(false);
      }


      // 2. Initialize Razorpay payment gateway
      const options = {
        key: "rzp_test_VVaxe8RQLNF0DS", // Razorpay Key ID (Should be moved to backend ideally) this is test api so ignore, this is not a flaw
        amount: data.amount, // Amount in paise (Razorpay expects amount in paise)
        currency: "INR",
        name: "Retail Edge",
        description: "Payment for Order",
        order_id: data.id,
        handler: function (response) {
          // alert("Payment Successful: " + response.razorpay_payment_id);
          setCheckoutModal(false); // Close the modal on success
          verifyPayment(response.razorpay_payment_id, data.transaction_id); // Verify payment once completed
        },
        prefill: {
          name: User.email, // You can replace this with dynamic values from user info
          email: User.email, // You can replace this with dynamic values
        },
        theme: {
          color: "#22c638",
        },
        modal: {
          ondismiss: function () {
            setLoader(false);
            alert("Payment process was dismissed");
            setCheckoutModal(false); // Close modal when dismissed
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      setLoader(false);
      console.error("Error during payment process", error);
    }
  };

  return (
    <>
      {loader && <LoaderComponent />}
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
              <p className="text-3xl font-bold text-primary">₹{totalPrice}</p>
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
    </>
  );
};

export default Checkout;
