import React, { useState } from "react";

export default function SalesByDate({ salesData }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [salesDetails, setSalesDetails] = useState([]);

  // Convert timestamp to local date format (YYYY-MM-DD)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-CA"); // Ensures accurate date comparison
  };

  const getSalesOnDate = (date) => {
    if (!date) {
      setSalesDetails([]);
      return;
    }

    let salesOnSelectedDate = [];

    // Iterate through each product in salesData
    Object.values(salesData).forEach((item) => {
      let totalQuantitySold = 0;

      // Check each timestamp in timeStampsAndQuantitySold
      item.timeStampsAndQuantitySold?.forEach((sale) => {
        const timestamp = Object.keys(sale)[0]; // Extract timestamp
        if (formatDate(timestamp) === date) {
          totalQuantitySold += sale[timestamp]; // Add quantity if date matches
        }
      });

      // If sales exist, add to list
      if (totalQuantitySold > 0) {
        salesOnSelectedDate.push({
          productName: item.productName,
          quantitySold: totalQuantitySold,
        });
      }
    });

    setSalesDetails(salesOnSelectedDate);
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2">Select a Date:</label>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => {
          setSelectedDate(e.target.value);
          getSalesOnDate(e.target.value);
        }}
        className="border p-2 rounded-md mb-3 w-full"
      />

      {salesDetails.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-[#1D4046] text-white">
              <th className="border border-gray-300 p-2">Product Name</th>
              <th className="border border-gray-300 p-2">Quantity Sold</th>
            </tr>
          </thead>
          <tbody>
            {salesDetails.map((sale, index) => (
              <tr key={index} className="text-center border-t border-gray-300">
                <td className="border border-gray-300 p-2">{sale.productName}</td>
                <td className="border border-gray-300 p-2">{sale.quantitySold}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500 mt-3">No sales data available</p>
      )}
    </div>
  );
}
