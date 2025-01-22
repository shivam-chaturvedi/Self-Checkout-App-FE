import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2} from "lucide-react";
import Sidebar from "../components/Sidebar";
import { BACKEND_SERVER_URL } from "../utils/config";
import UserModal from "../components/UserModal";
import ProductModal from "../components/ProductModal";
import LoaderComponent from "../components/LoaderComponent";

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [storeCarts, setStoreCarts] = useState([]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isStoreCartOpen, setIsStoreCartOpen] = useState(false);
  const [activeProp,setActiveProp]=useState('users');
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editingStoreCart, setEditingStoreCart] = useState(null);

  const [loader, setLoader] = useState(true);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    quantity: "",
  });

  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    role: "", // Default role
  });

  const [newStoreCart, setNewStoreCart] = useState({
    id: "",
    isActive: "",
    currentUser: "", //current attached user to that cart
  });

  // Fetch products and users from the backend
  useEffect(() => {
    setLoader(true);
    fetch(`${BACKEND_SERVER_URL}/admin/product/get-all`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt_token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoader(false);
        setProducts(data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoader(false);
      });

    // Fetch users
    fetch(`${BACKEND_SERVER_URL}/admin/get-all-users`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt_token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setUsers(data);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setUsers([]);
      });

    fetch(`${BACKEND_SERVER_URL}/admin/store-cart/get-all`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt_token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoader(false);
        setStoreCarts(data);
      })
      .catch((err) => {
        console.error("Error fetching store carts:", err);
        setLoader(false);
      });
  }, []);

  // Add or edit product
  const handleSaveProduct = () => {
    setLoader(true);
    const method = editingProduct ? "PUT" : "POST";
    const url = editingProduct
      ? `${BACKEND_SERVER_URL}/admin/update/product`
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
        setLoader(false);
        if (editingProduct) {
          setProducts(
            products.map((p) => (p.id === editingProduct.id ? data.success : p))
          );
        } else {
          setProducts([...products, data.success]);
        }
        setIsProductModalOpen(false);
      })
      .catch((err) => {
        console.error("Error saving product:", err);
        setLoader(false);
      });
  };

  // Add or edit user
  const handleSaveUser = () => {
    setLoader(true);
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
        setLoader(false);
        // console.log(data);
        if (editingUser) {
          setUsers(
            users.map((u) => (u.email === editingUser.email ? data.success : u))
          );
        } else {
          setUsers([...users, data.success]);
        }
        setIsUserModalOpen(false);
      })
      .catch((err) => {
        console.error("Error saving user:", err);
        setLoader(false);
      });
  };

  // Add or edit product
  const handleSaveStoreCart = () => {
    setLoader(true);
    const method = editingStoreCart ? "PUT" : "POST";
    const url = editingStoreCart
      ? `${BACKEND_SERVER_URL}/admin/update/store-cart`
      : `${BACKEND_SERVER_URL}/admin/store-cart/create`;

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt_token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoader(false);
        if (editingStoreCart) {
          setStoreCarts(
            storeCarts.map((p) =>
              p.id === editingStoreCart.id ? data.storeCart : p
            )
          );
        } else {
          setStoreCarts([...storeCarts, data.storeCart]);
        }
        setIsStoreCartOpen(false);
      })
      .catch((err) => {
        console.error("Error saving StoreCart:", err);
        setLoader(false);
      });
  };

  // Delete product
  const handleDeleteProduct = (id) => {
    setLoader(true);
    fetch(`${BACKEND_SERVER_URL}/admin/product/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt_token"),
      },
    })
      .then((res) => {
        setLoader(false);
        if (res.ok) {
          setProducts(products.filter((product) => product.id !== id));
        }
      })
      .catch((err) => {
        console.error("Error deleting product:", err);
        setLoader(false);
      });
  };

  // Delete user
  const handleDeleteUser = (email) => {
    setLoader(true);
    fetch(`${BACKEND_SERVER_URL}/admin/user/delete/${email}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt_token"),
      },
    })
      .then((res) => {
        setLoader(false);
        if (res.ok) {
          setUsers(users.filter((user) => user.email !== email));
        }
      })
      .catch((err) => {
        console.error("Error deleting user:", err);
        setLoader(false);
      });
  };

  // Delete product
  const handleDeleteStoreCart = (id) => {
    setLoader(true);
    fetch(`${BACKEND_SERVER_URL}/admin/store-cart/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt_token"),
      },
    })
      .then((res) => {
        setLoader(false);
        if (res.ok) {
          setStoreCarts(storeCarts.filter((storeCart) => storeCart.id !== id));
        }
      })
      .catch((err) => {
        console.error("Error deleting StoreCart:", err);
        setLoader(false);
      });
  };

  // Open modals
  const handleAddProduct = () => {
    setEditingProduct(null);
    setNewProduct({ name: "", price: "", category: "", quantity: "" });
    setIsProductModalOpen(true);
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setNewUser({ email: "", password: "", role: "" });
    setIsUserModalOpen(true);
  };

  const handleAddStoreCart = () => {
    setEditingStoreCart(null);
    setNewStoreCart({ id: "", isActive: "", currentUser: "" });
    handleSaveStoreCart();
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

  const handleEditStoreCart = (storeCart) => {
    setEditingStoreCart(storeCart);
    setNewStoreCart({ ...storeCart });
    setIsStoreCartOpen(true);
  };

  function formatDateTime(dateTimeString) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
  
    const date = new Date(dateTimeString);
    return date.toLocaleString("en-US", options);
  }
  
   

  return (
    <>
      {loader && <LoaderComponent />}
      <div className="flex m-1">
        
      <Sidebar active={activeProp} setActiveProp={setActiveProp}/>

      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

        {activeProp==='users' && (
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
                    <td className="py-3 px-4 ">{formatDateTime(user.createdAt)}</td>
                    <td className="py-3 px-4 ">{formatDateTime(user.updatedAt)}</td>
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
        )}

        {activeProp==='products' && (
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
                    
                    <td className="py-3 px-4">{formatDateTime(product.createdAt) || "NA"}</td>
                    <td className="py-3 px-4">{formatDateTime(product.updatedAt) || "NA"}</td>
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

        )}


        {activeProp==='carts' && (
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
                    
                    <td className="py-3 px-4">{formatDateTime(storeCart.createdAt) || "NA"}</td>
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
        )}

        {activeProp==='reports' && 
        <div className="flex justify-center items-center w-full h-[70vh]">
          <h1 className=" text-center mx-auto font-mono text-3xl text-gray-400">Feature coming soon </h1>
          </div>
        }

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
      

      </div>
    </>
  );
}
