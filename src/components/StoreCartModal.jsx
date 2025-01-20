import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

export default function StoreCartModal({
  isOpen,
  setIsOpen,
  newStoreCart,
  setNewStoreCart,
  handleSaveStoreCart,
}) {

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 w-10/12 md:w-1/2 rounded-lg shadow-lg">
          <Dialog.Title className="text-2xl font-semibold mb-4">
            {newStoreCart.id || 'NA' ? "Edit Store Cart" : "Add Store Cart"}
          </Dialog.Title>

          {/* ID Input */}
          <div className="mb-4">
            <label className="block mb-2">Cart ID</label>
            <input
              type="text"
              value={newStoreCart.id || ""}
              onChange={(e) =>{
                setNewStoreCart({ ...newStoreCart, id: e.target.value })
              }

              }
              className="border rounded px-3 py-2 w-full"
            />
          </div>


          {/* Buttons */}
          <div className="flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveStoreCart}
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
