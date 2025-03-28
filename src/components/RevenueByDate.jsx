import React, { useState } from "react";

export default function RevenueByDate({ salesData }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [revenueDetails, setRevenueDetails] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  // Fix: Use local time instead of UTC
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-CA"); // Converts to YYYY-MM-DD in local timezone
  };

  const calculateRevenue = (date) => {
    if (!date) {
      setRevenueDetails([]);
      setTotalRevenue(0);
      return;
    }

    let totalRevenueCalc = 0;

    const revenueData = Object.entries(salesData).reduce((acc, [productName, item]) => {
      const salesOnDate = item.timeStampsAndQuantitySold?.filter((sale) => {
        const timestamp = Object.keys(sale)[0]; // Extract timestamp
        return timestamp && formatDate(timestamp) === date; // Match selected date correctly
      }) || [];

      if (salesOnDate.length > 0) {
        const revenueForItem = salesOnDate.reduce((sum, sale) => {
          const timestamp = Object.keys(sale)[0];
          const quantitySold = sale[timestamp] || 0;
          return sum + quantitySold * item.productPrice;
        }, 0);

        totalRevenueCalc += revenueForItem;

        acc.push({
          productName: item.productName,
          category: item.category,
          productPrice: item.productPrice,
          revenue: revenueForItem,
        });
      }

      return acc;
    }, []);

    setRevenueDetails(revenueData);
    setTotalRevenue(totalRevenueCalc);
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2">Select a Date:</label>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => {
          setSelectedDate(e.target.value);
          calculateRevenue(e.target.value);
        }}
        className="border p-2 rounded-md mb-3 w-full"
      />

      <p className="text-lg font-semibold text-center">
        Total Revenue: ₹{totalRevenue.toFixed(2)}
      </p>

      {revenueDetails.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-[#1D4046] text-white">
              <th className="border border-gray-300 p-2">Product Name</th>
              <th className="border border-gray-300 p-2">Category</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {revenueDetails.map((item, index) => (
              <tr key={`${item.productName}-${index}`} className="text-center border-t border-gray-300">
                <td className="border border-gray-300 p-2">{item.productName}</td>
                <td className="border border-gray-300 p-2">{item.category}</td>
                <td className="border border-gray-300 p-2">₹{item.productPrice}</td>
                <td className="border border-gray-300 p-2">₹{item.revenue.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No sales data available for this date</p>
      )}
    </div>
  );
}
