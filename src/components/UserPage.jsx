import React from "react";
import { Plus, Pencil, Trash2} from "lucide-react";

export default function UserPage({handleAddUser, users, handleDeleteUser, handleEditUser, formatDateFn}){
    return(
        <>
        {/* User Table Section */}
        <div className="flex justify-between items-center mb-4 ">
          <h2 className="text-xl font-semibold ml-8">Users</h2>
          <button
            onClick={handleAddUser}
            className="bg-[#58cbeb] font-bold text-white py-2 px-4 rounded flex items-center"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </button>
        </div>

        {/* Scrollable User Table */}
        <div className="overflow-y-scroll h-[70vh] bg-[#254E58] shadow-md rounded-lg mb-4">
          {users.length > 0 ? (
            <table className="min-w-full table-auto text-white font-bold">
              {/* Table Header */}
              <thead>
                <tr className="border-b border-gray-600 bg-[#1D4046]">
                  <th className="py-3 px-4 text-left uppercase tracking-wider ">
                    Created At
                  </th>
                  <th className="py-3 px-4 text-left uppercase tracking-wider ">
                    Updated At
                  </th>
                  <th className="py-3 px-4 text-left uppercase tracking-wider ">
                    Email
                  </th>
                  <th className="py-3 px-4 text-left uppercase tracking-wider ">
                    Password
                  </th>
                  <th className="py-3 px-4 text-left uppercase tracking-wider ">
                    Role
                  </th>
                  <th className="py-3 px-4 text-left uppercase tracking-wider ">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user.email}
                    className={`${
                      index % 2 === 0 ? "bg-[#2E5A62]" : "bg-[#254E58]"
                    } hover:bg-[#1B3438] font-mono font-light`}
                  >
                    <td className="py-3 px-4 ">{formatDateFn(user.createdAt)}</td>
                    <td className="py-3 px-4 ">{formatDateFn(user.updatedAt)}</td>
                    <td className="py-3 px-4 ">{user.email}</td>
                    <td className="py-3 px-4 ">
                      {user.password.slice(6, 20)}...
                    </td>
                    <td className="py-3 px-4 ">{user.role}</td>
                    <td className="py-3 px-4 flex space-x-3">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="bg-yellow-500 text-white py-1 px-3 rounded-md flex items-center hover:bg-yellow-400 transition"
                      >
                        <Pencil className="h-4 w-4 mr-1" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.email)}
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
              No Users Found
            </h1>
          )}
        </div>
        </>

    )
}