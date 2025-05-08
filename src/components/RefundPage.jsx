import React from "react";

export default function RefundPage({refundData}){
    return(
    <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Initiated Refunds</h2>

        <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
            <thead>
            <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Amount (INR)</th>
                <th className="border border-gray-300 px-4 py-2">Receipt</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Refund Status</th>
                <th className="border border-gray-300 px-4 py-2">Created At</th>
                <th className="border border-gray-300 px-4 py-2">Updated At</th>
            </tr>
            </thead>
            <tbody>
            {refundData.map((refund) => (
                <tr key={refund.id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{refund.id}</td>
                <td className="border border-gray-300 px-4 py-2">{refund.amount}</td>
                <td className="border border-gray-300 px-4 py-2">{refund.receipt}</td>
                <td className="border border-gray-300 px-4 py-2">{refund.status}</td>
                <td className="border border-gray-300 px-4 py-2">{refund.refundStatus}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(refund.createdAt).toLocaleString()}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(refund.updatedAt).toLocaleString()}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
  </div>

);

}