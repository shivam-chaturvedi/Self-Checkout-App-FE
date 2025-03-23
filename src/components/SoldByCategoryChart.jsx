import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function SoldByCategoryChart({ salesData }) {
  const categorySales = {};

  // Calculate total sold per category
  Object.values(salesData).forEach((item) => {
    if (!categorySales[item.category]) {
      categorySales[item.category] = 0;
    }
    categorySales[item.category] += item.totalQuantitySold;
  });

  // Convert to chart-friendly format
  const chartData = Object.entries(categorySales).map(([category, sales]) => ({
    name: category,
    value: sales,
  }));

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
