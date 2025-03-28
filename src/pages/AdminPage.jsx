import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2} from "lucide-react";
import Sidebar from "../components/Sidebar";
import { BACKEND_SERVER_URL } from "../utils/config";
import UserModal from "../components/UserModal";
import ProductModal from "../components/ProductModal";
import LoaderComponent from "../components/LoaderComponent";
import { Link } from "react-router-dom";
import MaxMinSoldChart from "../components/MaxMinSoldChart";
import SalesByDate from "../components/SalesByDate";
import SalesChart from "../components/SalesChart";
import StockByCategoryChart from "../components/StockByCategoryChart";
import SoldByCategoryChart from "../components/SoldByCategoryChart";
import RevenueByDate from "../components/RevenueByDate";

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [refunds, setRefunds] = useState([]);
  const [users, setUsers] = useState([]);
  const [storeCarts, setStoreCarts] = useState([]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isStoreCartOpen, setIsStoreCartOpen] = useState(false);
  const [activeProp,setActiveProp]=useState('users');
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editingStoreCart, setEditingStoreCart] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [imageUrl, setImageUrl] = useState([]);

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

  useEffect(() => {
    fetch(`${BACKEND_SERVER_URL}/reports/get-all-sales-data?apiKey=api@ahsbdhrandomsduywhioTGSHUDYUIbsLSJ63652jbskjdudbkjdn`)
      .then((response) => response.json())
      .then((data) => setReportData(data["Purchased Items"] || {}))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const base64ToBlob = (base64, mimeType = "image/png") => {
    const byteCharacters = atob(base64); // Decode Base64
    const byteNumbers = new Array(byteCharacters.length)
        .fill()
        .map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
};


useEffect(() => {
  const fetchImages = async () => {
      setLoader(true);

      try {
          const response = await fetch(`${BACKEND_SERVER_URL}/get-surveillance-images`, {
              method: "GET",
              headers: {
                  Authorization: "Bearer " + localStorage.getItem("jwt_token"),
              },
          });

          setLoader(false);
          if (!response.ok) throw new Error("Failed to fetch images");

          const data = await response.json();

          if (data.success && data.success.length > 0) {
              const formattedImages = data.success.map((item) => {
                  const blob = base64ToBlob(item.imageData, "image/png");
                  const imageUrl = URL.createObjectURL(blob);

                  return {
                      id: item.id,
                      updatedAt: formatDateTime( new Date(item.updatedAt).toLocaleString()),
                      imageUrl: imageUrl,
                      description: item.description || "No description available",
                  };
              });

              setImageUrl(formattedImages);
          }
      } catch (error) {
          console.error("Error fetching images:", error);
          setLoader(false);
      }
  };

  fetchImages();

  return () => {
      imageUrl.forEach((img) => URL.revokeObjectURL(img.imageUrl));
  };
}, []);

const fetchRefunds = async () => {
  setLoader(true);
  try {
    const response = await fetch(`${BACKEND_SERVER_URL}/api/get-initiated-refunds`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt_token"),
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    setRefunds(data.success); // Extract success array from response
  } catch (err) {
    setLoader(err.message);
    console.error("Error fetching refunds:", err);
  } finally {
    setLoader(false);
  }
};

useEffect(() => {
  fetchRefunds();
}, []);
   

const reject = async (id) => {
  try {
    const response = await fetch(`${BACKEND_SERVER_URL}/api/reject-refund/${id}`, {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt_token"),
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      alert("Refund rejected successfully!");
      setRefunds(refunds.filter((refund) => refund.id !== id));
    } else {
      alert("Failed to reject refund.");
    }
  } catch (err) {
    console.error("Error rejecting refund:", err);
    alert("Error rejecting refund.");
  }
};


const approve = async (id) => {
  try {
    const response = await fetch(`${BACKEND_SERVER_URL}/api/approve-refund/${id}`, {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt_token"),
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      alert("Refund approved successfully!");
      setRefunds(refunds.filter((refund) => refund.id !== id)); // Remove approved refund
    } else {
      alert("Failed to approve refund.");
    }
  } catch (err) {
    console.error("Error approving refund:", err);
    alert("Error approving refund.");
  }
};


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

        {activeProp === 'surveillance' && 
         <div className="p-4">
         <h2 className="text-lg font-bold mb-4">Surveillance Images</h2>
         
         {/* Scrollable Container */}
         <div className="h-[400px] overflow-y-auto border p-4 rounded-lg shadow-md">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
             {imageUrl.map((img) => (
               <div key={img.id} className="border p-4 rounded-lg shadow-md w-full max-w-xs mx-auto">
                 <div className="flex justify-center">
                   <img
                     src={img.imageUrl}
                     alt={`Camera ${img.id}`}
                     className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 object-cover rounded-md"
                   />
                 </div>
                 <p className="mt-2 text-sm sm:text-base text-gray-600">
                   <span className="font-bold text-purple-600">🆔 Camera ID:</span> {img.id}
                 </p>
                 <p className="text-xs sm:text-sm text-gray-500">📅 Date & Time: {img.updatedAt}</p>
                 <p className="text-red-600 font-bold mt-2">⚠ Security Threat Detected:</p>
                 <p className="text-red-500">{img.description}</p>
               </div>
             ))}
           </div>
         </div>
       </div>
       
        }
        
        




    {activeProp === "reports" && (
  <div className="flex justify-center items-center w-full h-auto p-6">
    <div className="max-w-6xl mx-auto w-full">
      <h1 className="text-2xl font-bold mt-6 mb-4 text-center">📊 Sales Report</h1>

      {/* Table of Sold Items */}
      <div className="bg-white shadow-md p-6 rounded-lg mt-6">

        {reportData && Object.keys(reportData).length > 0 ? (
          <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-[#1D4046] text-white">
                <th className="border border-gray-300 p-2">Product Name</th>
                <th className="border border-gray-300 p-2">Category</th>
                <th className="border border-gray-300 p-2">Price</th>
                <th className="border border-gray-300 p-2">Total Sold</th>
                <th className="border border-gray-300 p-2">Stock Left</th>
                <th className="border border-gray-300 p-2">Total Revenue</th>
                <th className="border border-gray-300 p-2">Last Sold Quantity</th>
                <th className="border border-gray-300 p-2">Last Sold Time</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(reportData).map((key) => {
                const item = reportData[key];
                const lastSale = item.timeStampsAndQuantitySold?.[item.timeStampsAndQuantitySold.length - 1] || {};
                const lastSoldTime = Object.keys(lastSale)[0] || "N/A";
                const lastSoldQuantity = lastSale[lastSoldTime] || "N/A";
                
                return (
                  <tr key={key} className="text-center border-t border-gray-300">
                    <td className="border border-gray-300 p-2">{item.productName}</td>
                    <td className="border border-gray-300 p-2">{item.category}</td>
                    <td className="border border-gray-300 p-2">₹{item.productPrice}</td>
                    <td className="border border-gray-300 p-2">{item.totalQuantitySold}</td>
                    <td className="border border-gray-300 p-2">{item.quantityLeftInStock}</td>
                    <td className="border border-gray-300 p-2">₹{item.totalSoldAmount}</td>
                    <td className="border border-gray-300 p-2">{lastSoldQuantity}</td>
                    <td className="border border-gray-300 p-2">{formatDateTime(lastSoldTime)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No sales data available</p>
        )}
      </div>
    </div>
  </div>
)}

 {activeProp === "salesDashboard" && (
  <div className="flex justify-center items-center w-full h-auto p-6">
    <div className="max-w-6xl mx-auto w-full">
      <h1 className="text-2xl font-bold mt-6 mb-4 text-center">📊 Sales Dashboard</h1>

      {/* Grid Layout for Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Sales Trends Chart */}
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Sales Trends</h2>
          <SalesChart salesData={reportData} />
        </div>

        {/* Max/Min Sold Items Chart */}
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Best & Worst Selling Products</h2>
          <MaxMinSoldChart salesData={reportData} />
        </div>

        {/* Sales by Date */}
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Sales on Selected Date</h2>
          <SalesByDate salesData={reportData} />
        </div>
      

      {/* Items Left in Stock by Category */}
      <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Items Left in Stock by Category</h2>
          <StockByCategoryChart salesData={reportData} />
      </div>
      

      {/* Sold Products by Category */}
      <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Sold Products by Category</h2>
          <SoldByCategoryChart salesData={reportData} />
      </div>

      {/* Revenue on Selected Date */}
      <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Revenue on Selected Date</h2>
          <RevenueByDate salesData={reportData} />
      </div>
      </div>
      </div>
      </div>
        )}
      {activeProp === "Refund" && (
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
                
                <th className="border border-gray-300 px-4 py-2">Approve</th>
                <th className="border border-gray-300 px-4 py-2">Reject</th>
              </tr>
            </thead>
            <tbody>
              {refunds.map((refund) => (
                <tr key={refund.id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{refund.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{refund.amount}</td>
                  <td className="border border-gray-300 px-4 py-2">{refund.receipt}</td>
                  <td className="border border-gray-300 px-4 py-2">{refund.status}</td>
                  <td className="border border-gray-300 px-4 py-2">{refund.refundStatus}</td>
                  <td className="border border-gray-300 px-4 py-2">{new Date(refund.createdAt).toLocaleString()}</td>
                  <td className="border border-gray-300 px-4 py-2">{new Date(refund.updatedAt).toLocaleString()}</td>
                  
                  <td className="border border-gray-300 px-4 py-2"><button onClick={()=>{approve(refund.id)}}>Approve Refund</button></td>
                  <td className="border border-gray-300 px-4 py-2 text-white bg-red-500"><button onClick={()=>{reject(refund.id)}}>Reject Refund</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      )}


      



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