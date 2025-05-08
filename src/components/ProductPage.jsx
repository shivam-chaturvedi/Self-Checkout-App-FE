import react from 'react';
import { Plus, Pencil, Trash2} from "lucide-react";
import { BACKEND_SERVER_URL } from "../utils/config";

export default function ProductPage({products, handleAddProduct,handleDeleteProduct, handleEditProduct, formatDateFn}){
    return(
             <>
            {/* Product Table Section */}
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold ml-8">Products</h2>
            
            <button
                onClick={handleAddProduct}
                className="bg-[#58cbeb] font-bold text-white py-2 px-4 rounded-md flex items-center hover:bg-[#47b7d4] transition"
            >
                <Plus className="mr-2 h-4 w-4" />
                Add Product
            </button>
            </div>

            {/* Scrollable Product Table */}
            <div className="overflow-y-scroll h-[70vh] bg-[#254E58] shadow-md rounded-lg mb-4">
            {products.length > 0 ? (
                <table className="min-w-full table-auto text-white">
                {/* Table Header */}
                <thead>
                    <tr className="border-b border-gray-600 bg-[#1D4046]">
                    <th className="py-3 px-4 text-left uppercase tracking-wider font-bold">
                        Created At
                    </th>
                    <th className="py-3 px-4 text-left uppercase tracking-wider font-bold">
                        Updated At
                    </th>
                    <th className="py-3 px-4 text-left uppercase tracking-wider font-bold">
                        Product Name
                    </th>
                    <th className="py-3 px-4 text-left uppercase tracking-wider font-bold">
                        Price
                    </th>
                    <th className="py-3 px-4 text-left uppercase tracking-wider font-bold">
                        Category
                    </th>
                    <th className="py-3 px-4 text-left uppercase tracking-wider font-bold">
                        Quantity
                    </th>
                    <th className="py-3 px-4 text-left uppercase tracking-wider font-bold">
                        QR Code
                    </th>
                    <th className="py-3 px-4 text-left uppercase tracking-wider font-bold">
                        RFID Tag
                    </th>
                    <th className="py-3 px-4 text-left uppercase tracking-wider font-bold">
                        Actions
                    </th>
                    </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                    {products.map((product, index) => (
                    <tr
                        key={product.id}
                        className={`${
                        index % 2 === 0 ? "bg-[#2E5A62]" : "bg-[#254E58]"
                        } hover:bg-[#1B3438] font-mono font-light`}
                    >
                        
                        <td className="py-3 px-4">{formatDateFn(product.createdAt) || "NA"}</td>
                        <td className="py-3 px-4">{formatDateFn(product.updatedAt) || "NA"}</td>
                        <td className="py-3 px-4">{product.name || "NA"}</td>
                        <td className="py-3 px-4">₹{product.price || "NA"}</td>
                        <td className="py-3 px-4">{product.category || "NA"}</td>
                        <td className="py-3 px-4">{product.quantity || "NA"}</td>
                        <td className="py-3 px-4">
                        <a
                            href={`${BACKEND_SERVER_URL}/product/qr/${product.id}`}
                        >
                            <img
                            className="w-10 h-8 "
                            src="/images/qr-scan.jpg"
                            alt="qr code"
                            />
                        </a>
                        </td>

                        <td className="py-3 px-4">{product.rfidTag}</td>
                        <td className="py-3 px-4 flex space-x-3">
                        <button
                            onClick={() => handleEditProduct(product)}
                            className="bg-yellow-500 text-white py-1 px-3 rounded-md flex items-center hover:bg-yellow-400 transition"
                        >
                            <Pencil className="h-4 w-4 mr-1" /> Edit
                        </button>
                        <button
                            onClick={() => handleDeleteProduct(product.id)}
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
                No Products Found
                </h1>
            )}
            </div>

        </>

    )
}