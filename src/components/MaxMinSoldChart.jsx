import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function MaxMinSoldChart({ salesData }) {
  const sortedData = Object.values(salesData).sort((a, b) => b.totalQuantitySold - a.totalQuantitySold);
  const maxSold = sortedData[0] || {};
  const minSold = sortedData[sortedData.length - 1] || {};

  const chartData = [
    { name: maxSold.productName || "N/A", sales: maxSold.totalQuantitySold || 0 },
    { name: minSold.productName || "N/A", sales: minSold.totalQuantitySold || 0 },
  ];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="sales" fill="#16A34A" />
      </BarChart>
    </ResponsiveContainer>
  );
}
