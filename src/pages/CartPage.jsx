import React, { useEffect, useRef, useState } from "react";
import { BrowserBarcodeReader } from "@zxing/library";
import { BACKEND_SERVER_URL } from "../utils/config";
import localforage from "localforage"; // For IndexedDB support
import Checkout from "../components/Checkout";

const CartPage = ({user}) => {
  const videoRef = useRef(null); // Reference to the video element
  // eslint-disable-next-line
  const [result, setResult] = useState("Waiting for a barcode...");
  const [error, setError] = useState("");
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkoutModal, setCheckoutModal] =  useState(false);

  const [scannedItems, setScannedItems] = useState([]); // State to hold scanned items
  // Save scanned items to IndexedDB
  const saveItemsToIndexedDB = async (items) => {
    await localforage.setItem("scannedItems", items);
  };

  // Load items from IndexedDB
  const loadItemsFromIndexedDB = async () => {
    const items = await localforage.getItem("scannedItems");
    if (items) {
      setScannedItems(items);
      updateTotalPrice(items);
    }
  };

  // Clear IndexedDB

  // eslint-disable-next-line
  const clearIndexedDB = async () => {
    await localforage.removeItem("scannedItems");
  };

  // Update total price
  const updateTotalPrice = (items) => {
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(total.toFixed(2));
  };

  // Handle checkout button
  const handleCheckout = async () => {
    let sum = 0;
    scannedItems.forEach((item) => {
      sum += item.price * item.quantity;
    });
    setTotalPrice(sum.toFixed(2));
    setCheckoutModal(true);

    // // Clear IndexedDB after checkout

    // await clearIndexedDB();
    // setScannedItems([]); // Clear the state as well
  };

  // Handle deleting an item
  const handleDeleteItem = (item) => {
    let updatedItems;

    if (item.quantity > 1) {
      updatedItems = scannedItems.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
      );
    } else {
      updatedItems = scannedItems.filter((i) => i.id !== item.id);
    }

    // Update the state and IndexedDB with the new items list
    setScannedItems(updatedItems);
    saveItemsToIndexedDB(updatedItems); // Update IndexedDB
  };

  // Effect for device selection
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

    fetchDevices();
  }, []);

  // Start the barcode scanner
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
              try {
                const res = await fetch(
                  `${BACKEND_SERVER_URL}/product/get/${result.text}`,
                  {
                    headers: {
                      Authorization:
                        "Bearer " + localStorage.getItem("jwt_token"),
                    },
                  }
                );
                const data = await res.json();
                if (res.ok) {
                  await new Audio("beep.wav").play();

                  setScannedItems((prevItems) => {
                    const existingItem = prevItems.find(
                      (item) => item.id === data.id
                    );
                    let updatedItems;
                    if (existingItem) {
                      updatedItems = prevItems.map((item) =>
                        item.id === data.id
                          ? { ...item, quantity: item.quantity + 1 }
                          : item
                      );
                    } else {
                      updatedItems = [...prevItems, { ...data, quantity: 1 }];
                    }

                    // Save the updated items to IndexedDB
                    saveItemsToIndexedDB(updatedItems);

                    return updatedItems;
                  });
                }
              } catch (error) {
                console.warn(error);
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

  // Load items from IndexedDB on component mount
  useEffect(() => {
    loadItemsFromIndexedDB();
    // eslint-disable-next-line
  }, []);

  const handleDeviceChange = (e) => {
    setSelectedDeviceId(e.target.value);
  };

  return (
    <div
      style={{
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f4f4f9",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {checkoutModal ? (
        <Checkout User={user} setCheckoutModal={setCheckoutModal} totalPrice={totalPrice} />
      ) : null}
      <h1 style={{ fontSize: "24px", margin: "20px 0" }}>
        Back Camera Barcode Scanner
      </h1>

      <select
        value={selectedDeviceId}
        onChange={handleDeviceChange}
        style={{ marginBottom: "20px", padding: "10px", fontSize: "16px" }}
      >
        {devices.map((device,i) => (
          <option key={device.deviceId+i} value={device.deviceId}>
            {device.label || `Camera ${device.deviceId}`}
          </option>
        ))}
      </select>

      <video
        ref={videoRef}
        style={{
          width: "90%",
          maxWidth: "600px",
          margin: "20px auto",
          border: "3px solid #ddd",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
        autoPlay
        playsInline
      />

      <div className="my-4">
        <h2 className="text-xl font-semibold">Scanned Items</h2>
        <div className="overflow-auto" style={{ maxHeight: "50vh" }}>
          <table className="table-auto w-full text-sm text-left">
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
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Checkout
        </button>
      </div>

      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default CartPage;
