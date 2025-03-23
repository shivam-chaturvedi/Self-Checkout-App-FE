import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function SalesChart({ salesData }) {
  const chartData = Object.values(salesData).map((item) => ({
    name: item.productName,
    sales: item.totalQuantitySold,
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="sales" fill="#4F46E5" />
      </BarChart>
    </ResponsiveContainer>
  );
}
