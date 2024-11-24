import React from "react";
import { Dialog } from "@headlessui/react";

export default function ProductModal({
  isOpen,
  setIsOpen,
  newProduct,
  setNewProduct,
  handleSaveProduct,
}) {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 w-10/12 md:w-1/2 rounded-lg shadow-lg">
          <Dialog.Title className="text-2xl font-semibold mb-4">
            {newProduct.id ? "Edit Product" : "Add Product"}
          </Dialog.Title>
          <div className="mb-4">
            <label className="block mb-2">Product Name</label>
            <input
              type="text"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Price</label>
            <input
              type="text"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Category</label>
            <input
              type="text"
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Quantity</label>
            <input
              type="number"
              value={newProduct.quantity}
              onChange={(e) =>
                setNewProduct({ ...newProduct, quantity: e.target.value })
              }
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProduct}
              className="bg-blue-600 text-white py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
