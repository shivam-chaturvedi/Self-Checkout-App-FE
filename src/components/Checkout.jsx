"use client";

import { BACKEND_SERVER_URL } from "../utils/config";

const Checkout = ({user, totalPrice, setCheckoutModal }) => {

  // Function to verify the payment status with Razorpay API
  const verifyPayment = async (paymentId) => {
    try {
      const response = await fetch(`${BACKEND_SERVER_URL}/api/verify-payment?payment_id=${paymentId}`,{
        headers:{
          "Authorization":`Bearer ${localStorage.getItem("jwt_token")}`
        }
      });
      const paymentDetails = await response.json();
      if(paymentDetails.ok){
        console.log(paymentDetails);
      }
      else {
        console.log("Payment verification failed");
      }
    } catch (error) {
      console.error("Error verifying payment", error);
    }
  };

  const handlePayment = async () => {
    try {
      // 1. Make an API call to your backend to create an order
      const response = await fetch(`${BACKEND_SERVER_URL}/api/create-order`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username:user.email,amount: totalPrice }),
      });

      if (!response.ok) {
        console.error("Failed to create order");
        return;
      }

      const data = await response.json();
      console.log(data);

      // 2. Initialize Razorpay payment gateway
      const options = {
        key: "rzp_test_VVaxe8RQLNF0DS", // Razorpay Key ID (Should be moved to backend ideally)
        amount: data.amount, // Amount in paise (Razorpay expects amount in paise)
        currency: "INR",
        name: "Retail Edge",
        description: "Payment for Order",
        order_id: data.id,
        handler: function (response) {
          // alert("Payment Successful: " + response.razorpay_payment_id);
          setCheckoutModal(false); // Close the modal on success
          verifyPayment(response.razorpay_payment_id); // Verify payment once completed
        },
        prefill: {
          name: "Customer Name", // You can replace this with dynamic values from user info
          email: user.email, // You can replace this with dynamic values
        },
        theme: {
          color: "#22c638",
        },
        modal: {
          ondismiss: function () {
            alert("Payment process was dismissed");
            setCheckoutModal(false); // Close modal when dismissed
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error("Error during payment process", error);
    }
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
  );
};

export default Checkout;
