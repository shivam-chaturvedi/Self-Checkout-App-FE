import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { BACKEND_SERVER_URL } from "../utils/config";
import UserModal from "../components/UserModal";
import ProductModal from "../components/ProductModal";
import LoaderComponent from "../components/LoaderComponent";
import ReportPage from "../components/ReportPage";
import SalesPage from "../components/SalesPage";
import RefundPage from "../components/RefundPage";
import SurveillancePage from "../components/SurveillancePage";
import CartPage from "../components/CartPage";
import ProductPage from "../components/ProductPage";
import UserPage from "../components/UserPage";


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
    role: "",
  });

  const [newStoreCart, setNewStoreCart] = useState({
    id: "",
    isActive: "",
    currentUser: "", 
  });

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

    // user api it is
    fetch(`${BACKEND_SERVER_URL}/admin/get-all-users`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt_token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
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
    setRefunds(data.success);
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
   

  return (
    <>
      {loader && <LoaderComponent />}
      <div className="flex m-1">
        <Sidebar active={activeProp} setActiveProp={setActiveProp}/>
      
      
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        

        {activeProp==='users' && (
          <UserPage  users = {users} handleAddUser={handleAddUser} handleDeleteUser={handleDeleteUser} 
          handleEditUser={handleEditUser} formatDateFn={formatDateTime}/>
        
        )}

      {activeProp==='products' && (
        <ProductPage products = {products} handleAddProduct = {handleAddProduct} 
        handleEditProduct={handleEditProduct} handleDeleteProduct={handleDeleteProduct} formatDateFn={formatDateTime}/>
      )}

      {activeProp==='carts' && (
        <CartPage storeCarts = {storeCarts} handleAddStoreCart = {handleAddStoreCart} 
        handleDeleteStoreCart={handleDeleteStoreCart} formatDateFn = {formatDateTime}/>
 
      )}

      {activeProp === 'surveillance' && 
        <SurveillancePage imageUrl = {imageUrl}/>
      }
      {activeProp === "reports" && (
        <ReportPage reportData = {reportData} formatDateFn = {formatDateTime} />
      )}

      {activeProp === "salesDashboard" && (
        <SalesPage reportData = {reportData}/>
      )}

      {activeProp === "Refund" && (
        <RefundPage refundData = {refunds} />
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