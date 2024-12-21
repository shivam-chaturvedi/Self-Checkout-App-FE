import React, { useEffect, useRef, useState } from "react";
import { BrowserBarcodeReader } from "@zxing/library";
import { BACKEND_SERVER_URL } from "../utils/config";
import Checkout from "../components/Checkout";
import Notification from "../components/Notification";
import LoaderComponent from "../components/LoaderComponent";

const CartPage = ({ user }) => {
  const videoRef = useRef(null);
  const [result, setResult] = useState("Waiting for a barcode...");
  const [error, setError] = useState("");
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [scannedItems, setScannedItems] = useState([]);
  const [notify, setNotify] = useState(null);
  const [loading, setLoading] = useState(true);

  const updateTotalPrice = (items) => {
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(total.toFixed(2));
  };

  const handleCheckout = async () => {
    setCheckoutModal(true);
  };

  const requestCameraPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());
    } catch (err) {
      console.error("Camera permission denied:", err);
      setError("Camera permission is required to scan barcodes.");
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
            Authorization: "Bearer " + localStorage.getItem("jwt_token"),
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
        setError(data.error || "Failed to fetch cart items.");
      }
    } catch (error) {
      console.error(error);
      setError("Error fetching cart items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  useEffect(() => {
    const fetchDevices = async () => {
      const codeReader = new BrowserBarcodeReader();

      try {
        const videoDevices = await codeReader.getVideoInputDevices();
        setDevices(videoDevices);
        const backCamera = videoDevices.find(
          (device) =>
            device.label.toLowerCase().includes("back") ||
            device.label.toLowerCase().includes("rear")
        );
        setSelectedDeviceId(
          backCamera ? backCamera.deviceId : videoDevices[0]?.deviceId
        );
      } catch (err) {
        console.error(err);
        setError(`Error fetching camera devices: ${err.message}`);
      }
    };

    requestCameraPermissions().then(fetchDevices);
  }, []);

  useEffect(() => {
    if (!selectedDeviceId) return;

    const startBarcodeScanner = async () => {
      const codeReader = new BrowserBarcodeReader();

      try {
        codeReader.decodeFromVideoDevice(
          selectedDeviceId,
          videoRef.current,
          async (result, err) => {
            if (result) {
              setResult(`Barcode detected: ${result.text}`);
              setLoading(true);
              try {
                const res = await fetch(
                  `${BACKEND_SERVER_URL}/cart/add-item/${user.email}`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization:
                        "Bearer " + localStorage.getItem("jwt_token"),
                    },
                    body: JSON.stringify({
                      productId: parseInt(result.text),
                    }),
                  }
                );
                const data = await res.json();
                if (res.ok) {
                  await new Audio("beep.wav").play();
                  // update cart
                  await fetchCartItems();
                } else {
                  setNotify(data.error);
                }
              } catch (error) {
                console.warn(error);
              } finally {
                setLoading(false);
              }
              setError("");
            } else if (err && err.name !== "NotFoundException") {
              console.error(err);
              setError(
                "Error: Could not detect barcode. Ensure it is in view."
              );
            }
          }
        );
      } catch (err) {
        console.error(err);
        setError(`Error starting barcode scanner: ${err.message}`);
      }

      return () => {
        codeReader.reset();
      };
    };

    startBarcodeScanner();
  }, [selectedDeviceId]);

  async function handleDeleteItem(item) {
    setLoading(true);
    try {
      const res = await fetch(
        `${BACKEND_SERVER_URL}/cart/remove-item/${item.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt_token"),
          },
        }
      );
      if (res.ok) {
        // updatecart
        fetchCartItems();
      }
    } catch (err) {
      console.warn(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  const handleDeviceChange = (e) => {
    setSelectedDeviceId(e.target.value);
  };

  return (
    <>
      {loading && <LoaderComponent />}
      <div className="text-center font-sans bg-gray-100 min-h-screen p-6">
        {checkoutModal && (
          <Checkout
            total={totalPrice}
            User={user}
            setCheckoutModal={setCheckoutModal}
          />
        )}
        <h1 className="text-2xl font-bold mb-4">Back Camera Barcode Scanner</h1>

        <select
          value={selectedDeviceId}
          onChange={handleDeviceChange}
          className="mb-4 p-2 border rounded"
        >
          {devices.map((device, i) => (
            <option key={device.deviceId + i} value={device.deviceId}>
              {device.label || `Camera ${device.deviceId}`}
            </option>
          ))}
        </select>

        <video
          ref={videoRef}
          className="w-11/12 max-w-lg mx-auto border-4 border-gray-300 rounded-lg shadow-md"
          autoPlay
          playsInline
        />

        <div className="my-6">
          {notify && (
            <Notification setNotify={setNotify} message={notify} type="info" />
          )}
          <h2 className="text-lg font-semibold">Scanned Items</h2>

          <div className="overflow-x-auto">
            <table className="table-auto w-full mt-4 text-sm text-left border border-gray-300 rounded">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">ID</th>
                  <th className="px-4 py-2 border-b">Name</th>
                  <th className="px-4 py-2 border-b">Price</th>
                  <th className="px-4 py-2 border-b">Category</th>
                  <th className="px-4 py-2 border-b">Quantity</th>
                  <th className="px-4 py-2 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {scannedItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-2 border-b">{item.id}</td>
                    <td className="px-4 py-2 border-b">{item.name}</td>
                    <td className="px-4 py-2 border-b">{item.price}</td>
                    <td className="px-4 py-2 border-b">{item.category}</td>
                    <td className="px-4 py-2 border-b">{item.quantity}</td>
                    <td className="px-4 py-2 border-b">
                      <button
                        onClick={() => handleDeleteItem(item)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="my-4">
          <button
            onClick={handleCheckout}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartPage;
