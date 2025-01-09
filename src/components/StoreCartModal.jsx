import React from "react";
import { Dialog } from "@headlessui/react";

export default function StoreCartModal({
  isOpen,
  setIsOpen,
  newCartEntry,
  setNewCartEntry,
  handleSaveCartEntry,
}) {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 w-10/12 md:w-1/2 rounded-lg shadow-lg">
          <Dialog.Title className="text-2xl font-semibold mb-4">
            {newCartEntry.id ? "Edit Cart Entry" : "Add Cart Entry"}
          </Dialog.Title>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block mb-2">User Email</label>
            <input
              type="email"
              value={newCartEntry.current_user_email || ""}
              onChange={(e) =>
                setNewCartEntry({ ...newCartEntry, current_user_email: e.target.value })
              }
              className="border rounded px-3 py-2 w-full"
            />
          </div>

          {/* Is Active Checkbox */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              checked={newCartEntry.is_active || false}
              onChange={(e) =>
                setNewCartEntry({ ...newCartEntry, is_active: e.target.checked })
              }
              className="mr-2"
            />
            <label>Is Active</label>
          </div>

          {/* Created At Input */}
          <div className="mb-4">
            <label className="block mb-2">Created At</label>
            <input
              type="date"
              value={newCartEntry.created_at || ""}
              onChange={(e) =>
                setNewCartEntry({ ...newCartEntry, created_at: e.target.value })
              }
              className="border rounded px-3 py-2 w-full"
            />
          </div>

          {/* Updated At Input */}
          <div className="mb-4">
            <label className="block mb-2">Updated At</label>
            <input
              type="date"
              value={newCartEntry.updated_at || ""}
              onChange={(e) =>
                setNewCartEntry({ ...newCartEntry, updated_at: e.target.value })
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
              onClick={handleSaveCartEntry}
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
