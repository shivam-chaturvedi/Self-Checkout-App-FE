import React, { useState } from "react";

export default function RevenueByDate({ salesData }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [totalRevenue, setTotalRevenue] = useState(0);

  const formatDate = (dateString) => new Date(dateString).toISOString().split("T")[0];

  const calculateRevenue = (date) => {
    if (!date) {
      setTotalRevenue(0);
      return;
    }

    const revenue = Object.values(salesData).reduce((acc, item) => {
      const salesOnDate = item.timeStampsAndQuantitySold?.filter((sale) =>
        formatDate(Object.keys(sale)[0]) === date
      ) || [];

      const revenueForItem = salesOnDate.reduce((sum, sale) => {
        const soldQuantity = Object.values(sale)[0] || 0;
        return sum + soldQuantity * item.productPrice;
      }, 0);

      return acc + revenueForItem;
    }, 0);

    setTotalRevenue(revenue);
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
      <p className="text-lg font-semibold text-center">Total Revenue: ₹{totalRevenue.toFixed(2)}</p>
    </div>
  );
}
