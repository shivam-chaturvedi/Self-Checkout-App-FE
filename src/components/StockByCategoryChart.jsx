import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function StockByCategoryChart({ salesData }) {
  const categoryStock = {};

  // Calculate stock left per category
  Object.values(salesData).forEach((item) => {
    if (!categoryStock[item.category]) {
      categoryStock[item.category] = 0;
    }
    categoryStock[item.category] += item.quantityLeftInStock;
  });

  // Convert to chart-friendly format
  const chartData = Object.entries(categoryStock).map(([category, stock]) => ({
    name: category,
    stockLeft: stock,
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="stockLeft" fill="#FF8042" />
      </BarChart>
    </ResponsiveContainer>
  );
}
