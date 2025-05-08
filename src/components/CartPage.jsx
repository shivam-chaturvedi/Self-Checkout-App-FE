import React from "react";
import { Plus, Pencil, Trash2} from "lucide-react";
import { BACKEND_SERVER_URL } from "../utils/config";


export default function CartPage({storeCarts, handleDeleteStoreCart, handleAddStoreCart, formatDateFn}){
    return (
        <>
            {/* StoreCart Table Section */}
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold ml-8">Store Carts</h2>
            <button
                onClick={handleAddStoreCart}
                className="bg-[#58cbeb] font-bold text-white py-2 px-4 rounded-md flex items-center hover:bg-[#47b7d4] transition"
            >
                <Plus className="mr-2 h-4 w-4" />
                Generate New Store Cart
            </button>
            </div>

            {/* Scrollable Product Table */}
            <div className="overflow-y-scroll h-[70vh] bg-[#254E58] shadow-md rounded-lg mb-4">
            {storeCarts.length > 0 ? (
                <table className="min-w-full table-auto text-white">
                {/* Table Header */}
                <thead>
                    <tr className="border-b border-gray-600 bg-[#1D4046]">
                    <th className="py-3 px-4 text-left uppercase tracking-wider font-bold">
                        Created At
                    </th>
                    <th className="py-3 px-4 text-left uppercase tracking-wider font-bold">
                        StoreCart Id
                    </th>
                    <th className="py-3 px-4 text-left uppercase tracking-wider font-bold">
                        is Active
                    </th>
                    <th className="py-3 px-4 text-left uppercase tracking-wider font-bold">
                        Currently Attached User
                    </th>

                    <th className="py-3 px-4 text-left uppercase tracking-wider font-bold">
                        QR Code
                    </th>

                    <th className="py-3 px-4 text-left uppercase tracking-wider font-bold">
                        Actions
                    </th>
                    </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                    {storeCarts.map((storeCart, index) => (
                    <tr
                        key={storeCart.id}
                        className={`${
                        index % 2 === 0 ? "bg-[#2E5A62]" : "bg-[#254E58]"
                        } hover:bg-[#1B3438] font-mono font-light`}
                    >
                        
                        <td className="py-3 px-4">{formatDateFn(storeCart.createdAt) || "NA"}</td>
                        <td className="py-3 px-4">{storeCart.id || "NA"}</td>
                        <td className="py-3 px-4">
                        {storeCart.active ? "YES" : "NO" || "NA"}
                        </td>
                        <td className="py-3 px-4">
                        {storeCart.currentUser ? storeCart.currentUser.email:'NA' }
                        </td>
                        <td className="py-3 px-4">
                        <a
                            href={`${BACKEND_SERVER_URL}/store-cart/qr/${storeCart.id}`}
                        >
                            <img
                            className="w-10 h-8 "
                            src="/images/qr-scan.jpg"
                            alt="qr code"
                            />
                        </a>
                        </td>

                        <td className="py-3 px-4 flex space-x-3">
                    
                        <button
                            onClick={() => handleDeleteStoreCart(storeCart.id)}
                            className="bg-red-600 text-white py-1 px-3 rounded-md flex items-center hover:bg-red-500 transition"
                        >
                            <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            ) : (
                <h1 className="text-center text-lg text-gray-400 py-4">
                No Store Carts Found
                </h1>
            )}
            </div>
        </>
    )
}