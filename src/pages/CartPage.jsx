import React, { useEffect, useRef, useState } from "react";
import { BrowserBarcodeReader } from "@zxing/library";
import { BACKEND_SERVER_URL } from "../utils/config";
import Checkout from "../components/Checkout";
import Notification from "../components/Notification";
import LoaderComponent from "../components/LoaderComponent";

const CartPage = ({ user }) => {
  const videoRef = useRef(null);
  const [error, setError] = useState("");
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [scannedItems, setScannedItems] = useState([]);
  const [notify, setNotify] = useState(null);
  const [loading, setLoading] = useState(false);
  const [attachedCart, setCartAttached] = useState(null);
  const [isScanningCart, setIsScanningCart] = useState(false);
  const [isScanningProducts, setIsScanningProducts] = useState(false);

  const updateTotalPrice = (items) => {
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(total.toFixed(2));
  };

  const handleCheckout = () => {
    setCheckoutModal(true);
  };

  const requestCameraPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());
      return true;
    } catch (err) {
      console.error("Camera permission denied:", err);
      setError("Camera permission is required to scan barcodes.");
      return false;
    }
  };

  const attachCart = async (cartId) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${BACKEND_SERVER_URL}/store-cart/attach/${cartId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          },
          body: JSON.stringify({ email: user.email }),
        }
      );
      const data = await res.json();

      if (res.ok) {
        setCartAttached(data.userCart.id);
        localStorage.setItem("CurrentCartId", data.userCart.id);
        setNotify("Cart successfully attached!");
      } else {
        setNotify(data.error);
      }
    } catch (err) {
      setError(err.message);
      setNotify("Failed to attach cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${BACKEND_SERVER_URL}/cart/get-all/${user.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        const items = data.cart.map((item) => ({
          id: item.cartId,
          name: item.product.name,
          price: item.product.price,
          category: item.product.category,
          quantity: item.quantity,
        }));
        setScannedItems(items);
        updateTotalPrice(items);
      } else {
        setNotify(data.error || "Failed to fetch cart items.");
      }
    } catch (error) {
      console.error(error);
      setNotify("Error fetching cart items.");
    } finally {
      setLoading(false);
    }
  };

  const startCartScanning = async () => {
    const hasPermission = await requestCameraPermissions();
    if (hasPermission) {
      setIsScanningCart(true);
      initializeCamera();
    }
  };

  const startProductScanning = () => {
    setIsScanningProducts(true);
    initializeCamera();
  };

  const initializeCamera = async () => {
    const codeReader = new BrowserBarcodeReader();
    try {
      const videoDevices = await codeReader.getVideoInputDevices();
      const backCamera = videoDevices.find(
        (device) =>
          device.label.toLowerCase().includes("back") ||
          device.label.toLowerCase().includes("rear")
      );
      setDevices(videoDevices);
      setSelectedDeviceId(
        backCamera ? backCamera.deviceId : videoDevices[0]?.deviceId
      );
    } catch (err) {
      console.error(err);
      setNotify("Error accessing camera. Please check permissions.");
    }
  };

  const handleDeleteItem = async (item) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${BACKEND_SERVER_URL}/cart/remove-item/${item.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          },
        }
      );
      if (res.ok) {
        await fetchCartItems();
        setNotify("Item removed successfully");
      }
    } catch (err) {
      console.warn(err);
      setNotify("Failed to remove item");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(localStorage.getItem("CurrentCartId")){
      setIsScanningCart(false);
      setCartAttached(localStorage.getItem("CurrentCartId"));
    }
    if (!selectedDeviceId || (!isScanningCart && !isScanningProducts)) return;

    const codeReader = new BrowserBarcodeReader();
    let mounted = true;

    const startScanner = async () => {
      await fetchCartItems();
      try {
        await codeReader.decodeFromVideoDevice(
          selectedDeviceId,
          videoRef.current,
          async (result, err) => {
            if (!mounted) return;
            if (result) {
              if (isScanningCart) {
                await attachCart(result.text);
                await fetchCartItems();
                setIsScanningCart(false);
              } else if (isScanningProducts) {
                setLoading(true);
                try {
                  const res = await fetch(
                    `${BACKEND_SERVER_URL}/user-cart/add-item?productId=${result.text}&cartId=${attachedCart}`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                          "jwt_token"
                        )}`,
                      },
                    }
                  );
                  const data = await res.json();
                  if (res.ok) {
                    await new Audio("beep.wav").play();
                    await fetchCartItems();
                    setNotify("Product added successfully");
                  } else {
                    setNotify(data.error);
                  }
                } catch (error) {
                  setNotify("Failed to add product");
                } finally {
                  setLoading(false);
                }
              }
            } else if (err && err.name !== "NotFoundException") {
              setNotify("Error scanning code. Please try again.");
            }
          }
        );
      } catch (err) {
        console.error(err);
        setNotify("Error starting scanner");
      }
    };

    startScanner();

    return () => {
      mounted = false;
      codeReader.reset();
    };
  }, [selectedDeviceId, isScanningCart, isScanningProducts]);

  return (
    <div className="min-h-screen bg-gray-100">
      {loading && <LoaderComponent />}

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              {!attachedCart ? "Cart Scanner" : `Cart #${attachedCart}`}
            </h1>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Initial Attach Cart Button */}
            {!attachedCart && !isScanningCart && (
              <div className="text-center">
                <button
                  onClick={startCartScanning}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Attach Cart
                </button>
              </div>
            )}

            {notify && (
              <Notification
                setNotify={setNotify}
                message={notify}
                type="info"
              />
            )}

            {/* Start Product Scanning Button */}
            {attachedCart && !isScanningProducts && (
              <div className="text-center mb-6">
                <button
                  onClick={startProductScanning}
                  className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Start Scanning Products
                </button>
              </div>
            )}

            {/* Camera View */}
            {(isScanningCart || isScanningProducts) && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4 text-center">
                  {isScanningCart
                    ? "Scan Cart QR Code"
                    : "Scan Product Barcode"}
                </h2>
                <video
                  ref={videoRef}
                  className="w-full max-w-lg mx-auto border-4 border-gray-300 rounded-lg shadow-md"
                  autoPlay
                  playsInline
                />
              </div>
            )}

            {/* Scanned Items Table */}
            {attachedCart && scannedItems.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Scanned Items</h2>
                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Price</th>
                        <th className="px-4 py-2 text-left">Category</th>
                        <th className="px-4 py-2 text-left">Quantity</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scannedItems.map((item) => (
                        <tr key={item.id} className="border-b">
                          <td className="px-4 py-2">{item.name}</td>
                          <td className="px-4 py-2">₹{item.price}</td>
                          <td className="px-4 py-2">{item.category}</td>
                          <td className="px-4 py-2">{item.quantity}</td>
                          <td className="px-4 py-2">
                            <button
                              onClick={() => handleDeleteItem(item)}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Total and Checkout */}
                <div className="mt-6 text-right">
                  <p className="text-xl font-semibold">Total: ₹{totalPrice}</p>
                  <button
                    onClick={handleCheckout}
                    className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals and Notifications */}
      {checkoutModal && (
        <Checkout
          total={totalPrice}
          User={user}
          setCheckoutModal={setCheckoutModal}
        />
      )}
    </div>
  );
};

export default CartPage;
