// import React, { useState } from "react";

// export default function SalesByDate({ salesData }) {
//   const [selectedDate, setSelectedDate] = useState("");

//   const filteredData = selectedDate
//     ? Object.values(salesData).filter((item) =>
//         item.timeStampsAndQuantitySold?.some((sale) => Object.keys(sale)[0] === selectedDate)
//       )
//     : [];

//   return (
//     <div>
//       <input
//         type="date"
//         value={selectedDate}
//         onChange={(e) => setSelectedDate(e.target.value)}
//         className="border p-2 rounded-md mb-2 w-full"
//       />
//       <ul className="text-sm">
//         {filteredData.length > 0 ? (
//           filteredData.map((item, index) => (
//             <li key={index} className="p-1 border-b">{item.productName} - {item.totalQuantitySold} sold</li>
//           ))
//         ) : (
//           <p className="text-gray-500 text-sm">No sales on this date</p>
//         )}
//       </ul>
//     </div>
//   );
// }
import React, { useState } from "react";

export default function SalesByDate({ salesData }) {
  const [selectedDate, setSelectedDate] = useState("");

  // Function to format date to match stored timestamps (YYYY-MM-DD)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Extract YYYY-MM-DD
  };

  // Filter sales data based on the selected date
  const filteredData = selectedDate
    ? Object.values(salesData).filter((item) =>
        item.timeStampsAndQuantitySold?.some((sale) => 
          formatDate(Object.keys(sale)[0]) === selectedDate
        )
      )
    : [];

  return (
    <div>
      <label className="block text-sm font-medium mb-2">Select a Date:</label>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="border p-2 rounded-md mb-3 w-full"
      />

      {filteredData.length > 0 ? (
        <ul className="text-sm">
          {filteredData.map((item, index) => {
            // Find the quantity sold on the selected date
            const saleEntry = item.timeStampsAndQuantitySold?.find((sale) =>
              formatDate(Object.keys(sale)[0]) === selectedDate
            );
            const soldQuantity = saleEntry ? Object.values(saleEntry)[0] : 0;

            return (
              <li key={index} className="p-2 border-b">
                <span className="font-semibold">{item.productName}</span> - {soldQuantity} sold
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm">No sales on this date</p>
      )}
    </div>
  );
}
