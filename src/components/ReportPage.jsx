import react from 'react';

export default function ReportPage({reportData, formatDateFn}){
  return(
    <div className="flex justify-center items-center w-full h-auto p-6">
    <div className="max-w-6xl mx-auto w-full">
      <h1 className="text-2xl font-bold mt-6 mb-4 text-center">📊 Sales Report</h1>

      {/* Table of Sold Items */}
      <div className="bg-white shadow-md p-6 rounded-lg mt-6">

        {reportData && Object.keys(reportData).length > 0 ? (
          <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-[#1D4046] text-white">
                <th className="border border-gray-300 p-2">Product Name</th>
                <th className="border border-gray-300 p-2">Category</th>
                <th className="border border-gray-300 p-2">Price</th>
                <th className="border border-gray-300 p-2">Total Sold</th>
                <th className="border border-gray-300 p-2">Stock Left</th>
                <th className="border border-gray-300 p-2">Total Revenue</th>
                <th className="border border-gray-300 p-2">Last Sold Quantity</th>
                <th className="border border-gray-300 p-2">Last Sold Time</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(reportData).map((key) => {
                const item = reportData[key];
                const lastSale = item.timeStampsAndQuantitySold?.[item.timeStampsAndQuantitySold.length - 1] || {};
                const lastSoldTime = Object.keys(lastSale)[0] || "N/A";
                const lastSoldQuantity = lastSale[lastSoldTime] || "N/A";
                
                return (
                  <tr key={key} className="text-center border-t border-gray-300">
                    <td className="border border-gray-300 p-2">{item.productName}</td>
                    <td className="border border-gray-300 p-2">{item.category}</td>
                    <td className="border border-gray-300 p-2">₹{item.productPrice}</td>
                    <td className="border border-gray-300 p-2">{item.totalQuantitySold}</td>
                    <td className="border border-gray-300 p-2">{item.quantityLeftInStock}</td>
                    <td className="border border-gray-300 p-2">₹{item.totalSoldAmount}</td>
                    <td className="border border-gray-300 p-2">{lastSoldQuantity}</td>
                    <td className="border border-gray-300 p-2">{formatDateFn(lastSoldTime)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No sales data available</p>
        )}
      </div>
    </div>
  </div>
  );
}