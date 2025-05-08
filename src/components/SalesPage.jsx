import react from 'react';
import MaxMinSoldChart from "../components/MaxMinSoldChart";
import SalesByDate from "../components/SalesByDate";
import SalesChart from "../components/SalesChart";
import StockByCategoryChart from "../components/StockByCategoryChart";
import SoldByCategoryChart from "../components/SoldByCategoryChart";
import RevenueByDate from "../components/RevenueByDate";

export default function SalesPage({reportData}){
    return (
          <div className="flex justify-center items-center w-full h-auto p-6">
            <div className="max-w-6xl mx-auto w-full">
              <h1 className="text-2xl font-bold mt-6 mb-4 text-center">📊 Sales Dashboard</h1>
        
              {/* Grid Layout for Charts */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Sales Trends Chart */}
                <div className="bg-white shadow-md p-4 rounded-lg">
                  <h2 className="text-lg font-semibold mb-2">Sales Trends</h2>
                  <SalesChart salesData={reportData} />
                </div>
        
                {/* Max/Min Sold Items Chart */}
                <div className="bg-white shadow-md p-4 rounded-lg">
                  <h2 className="text-lg font-semibold mb-2">Best & Worst Selling Products</h2>
                  <MaxMinSoldChart salesData={reportData} />
                </div>
        
                {/* Sales by Date */}
                <div className="bg-white shadow-md p-4 rounded-lg">
                  <h2 className="text-lg font-semibold mb-2">Sales on Selected Date</h2>
                  <SalesByDate salesData={reportData} />
                </div>
              
        
              {/* Items Left in Stock by Category */}
              <div className="bg-white shadow-md p-4 rounded-lg">
                  <h2 className="text-lg font-semibold mb-2">Items Left in Stock by Category</h2>
                  <StockByCategoryChart salesData={reportData} />
              </div>
              
        
              {/* Sold Products by Category */}
              <div className="bg-white shadow-md p-4 rounded-lg">
                  <h2 className="text-lg font-semibold mb-2">Sold Products by Category</h2>
                  <SoldByCategoryChart salesData={reportData} />
              </div>
        
              {/* Revenue on Selected Date */}
              <div className="bg-white shadow-md p-4 rounded-lg">
                  <h2 className="text-lg font-semibold mb-2">Revenue on Selected Date</h2>
                  <RevenueByDate salesData={reportData} />
              </div>
              </div>
              </div>
              </div>
    )
}