import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { BACKEND_SERVER_URL } from "../utils/config";
import UserModal from "../components/UserModal";
import ProductModal from "../components/ProductModal";

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    quantity: "",
  });
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    role: "USER", // Default role
  });

  // Fetch products and users from the backend
  useEffect(() => {
    fetch(`${BACKEND_SERVER_URL}/product/get-all`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt_token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.error("Error fetching products:", err));

    // Fetch users
    fetch(`${BACKEND_SERVER_URL}/admin/get-all-users`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt_token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setUsers([]);
      });
  }, []);

  // Add or edit product
  const handleSaveProduct = () => {
    const method = editingProduct ? "PUT" : "POST";
    const url = editingProduct
      ? `${BACKEND_SERVER_URL}/admin/update/product/${editingProduct.id}`
      : `${BACKEND_SERVER_URL}/admin/add/product`;

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt_token"),
      },
      body: JSON.stringify({
        ...newProduct,
        price: parseFloat(newProduct.price),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (editingProduct) {
          setProducts(
            products.map((p) => (p.id === editingProduct.id ? data.success : p))
          );
        } else {
          setProducts([...products, data.success]);
        }
        setIsProductModalOpen(false);
      })
      .catch((err) => console.error("Error saving product:", err));
  };

  // Add or edit user
  const handleSaveUser = () => {
    const method = editingUser ? "PUT" : "POST";
    const url = editingUser
      ? `${BACKEND_SERVER_URL}/admin/update/user`
      : `${BACKEND_SERVER_URL}/admin/add/user`;

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt_token"),
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (editingUser) {
          setUsers(
            users.map((u) => (u.email === editingUser.email ? data.success : u))
          );
        } else {
          setUsers([...users, data.success]);
        }
        setIsUserModalOpen(false);
      })
      .catch((err) => console.error("Error saving user:", err));
  };

  // Delete product
  const handleDeleteProduct = (id) => {
    fetch(`${BACKEND_SERVER_URL}/admin/product/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt_token"),
      },
    })
      .then((res) => {
        if (res.ok) {
          setProducts(products.filter((product) => product.id !== id));
        }
      })
      .catch((err) => console.error("Error deleting product:", err));
  };

  // Delete user
  const handleDeleteUser = (email) => {
    fetch(`${BACKEND_SERVER_URL}/admin/user/delete/${email}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt_token"),
      },
    })
      .then((res) => {
        if (res.ok) {
          setUsers(users.filter((user) => user.email !== email));
        }
      })
      .catch((err) => console.error("Error deleting user:", err));
  };

  // Open modals
  const handleAddProduct = () => {
    setEditingProduct(null);
    setNewProduct({ name: "", price: "", category: "", quantity: "" });
    setIsProductModalOpen(true);
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setNewUser({ email: "", password: "", role: "USER" });
    setIsUserModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({ ...product, price: product.price.toString() });
    setIsProductModalOpen(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({ ...user });
    setIsUserModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* User Table Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Users</h2>
        <button
          onClick={handleAddUser}
          className="bg-green-600 text-white py-2 px-4 rounded flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </button>
      </div>

      {users && users.length!==0?
      (
      <div className="overflow-x-auto bg-white shadow rounded-lg mb-4">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 text-left">Created At</th>
              <th className="py-2 px-4 text-left">Updated At</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Password</th>
              <th className="py-2 px-4 text-left">Role</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!users && users.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-4 px-4 text-center text-gray-500">
                  No Users Found
                </td>
              </tr>
            ): (
              !users && users.map((user) => (
                <tr key={user.email} className="border-b">
                  <td className="py-2 px-4">{user.createdAt}</td>
                  <td className="py-2 px-4">{user.updatedAt}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{user.password}</td>
                  <td className="py-2 px-4">{user.role}</td>
                  <td className="py-2 px-4 flex space-x-2">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="bg-yellow-500 text-white py-1 px-3 rounded flex items-center"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.email)}
                      className="bg-red-600 text-white py-1 px-3 rounded flex items-center"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      ):(
        <h1>No Users Found</h1>
      )}

      {/* Product Table Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Products</h2>
        <button
          onClick={handleAddProduct}
          className="bg-green-600 text-white py-2 px-4 rounded flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg mb-4">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Price</th>
              <th className="py-2 px-4 text-left">Category</th>
              <th className="py-2 px-4 text-left">Quantity</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-4 px-4 text-center text-gray-500">
                  No Products Found
                </td>
              </tr>
            ) : !products ? (
              <tr>
                <td colSpan="5" className="py-4 px-4 text-center text-gray-500">
                  Loading products...
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="py-2 px-4">{product.name}</td>
                  <td className="py-2 px-4">{product.price}</td>
                  <td className="py-2 px-4">{product.category}</td>
                  <td className="py-2 px-4">{product.quantity}</td>
                  <td className="py-2 px-4 flex space-x-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="bg-yellow-500 text-white py-1 px-3 rounded flex items-center"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="bg-red-600 text-white py-1 px-3 rounded flex items-center"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modals for Add/Edit */}
      <UserModal
        isOpen={isUserModalOpen}
        setIsOpen={setIsUserModalOpen}
        newUser={newUser}
        setNewUser={setNewUser}
        handleSaveUser={handleSaveUser}
      />
      <ProductModal
        isOpen={isProductModalOpen}
        setIsOpen={setIsProductModalOpen}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
        handleSaveProduct={handleSaveProduct}
      />
    </div>
  );
}
