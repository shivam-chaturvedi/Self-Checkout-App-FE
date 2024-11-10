import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const CartPage = () => {
  const [cameras, setCameras] = useState([]);
  const [selectedCameraId, setSelectedCameraId] = useState('');
  const [items, setItems] = useState({});
  const [scanTimeout, setScanTimeout] = useState(false); // Boolean to control scan debounce
  const qrCodeReader = useRef(null);
  const audioRef = useRef(new Audio('/beep.wav'));

  // Load available cameras on component mount
  useEffect(() => {
    Html5Qrcode.getCameras()
      .then((devices) => setCameras(devices))
      .catch((err) => console.error("Error loading cameras:", err));
  }, []);

  // Start scanning when a camera is selected
  useEffect(() => {
    if (selectedCameraId && !qrCodeReader.current) {
      qrCodeReader.current = new Html5Qrcode("qr-reader");
      qrCodeReader.current.start(
        selectedCameraId,
        { fps: 1, qrbox: 250 },
        handleScanSuccess,
        (error) => console.warn("QR scanning failed:", error)
      ).catch((err) => console.error("Error starting scanner:", err));
    }

    return () => {
      if (qrCodeReader.current) {
        qrCodeReader.current.stop().then(() => {
          qrCodeReader.current = null;
        }).catch((err) => console.error("Error stopping scanner:", err));
      }
    };
  }, [selectedCameraId]);

  // Handle successful scan with a debounce to prevent multiple scans
  const handleScanSuccess = (item) => {
    if (!scanTimeout) {
      audioRef.current.play();
      addItemToCart(item);

      // Set a timeout to prevent immediate re-trigger
      setScanTimeout(true);
      setTimeout(() => setScanTimeout(false), 1000); // Clear after 1 second
    }
  };

  // Add or update scanned item in cart
  const addItemToCart = (item) => {
    setItems((prevItems) => {
      const updatedItems = { ...prevItems };
      if (updatedItems[item]) {
        updatedItems[item].quantity += 1;
      } else {
        updatedItems[item] = {
          name: item,
          quantity: 1,
          price: (Math.random() * (100 - 10) + 10).toFixed(2),
        };
      }
      return updatedItems;
    });
  };

  // Remove or decrement item quantity with single action per click
  const deleteItem = (itemName) => {
    setItems((prevItems) => {
      const updatedItems = { ...prevItems };
      if (updatedItems[itemName].quantity > 1) {
        updatedItems[itemName].quantity -= 1;
      } else {
        delete updatedItems[itemName];
      }
      return updatedItems;
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="container mx-auto flex-grow p-6">
        <h2 className="text-center text-xl font-semibold mb-4">Select Camera</h2>
        
        <select
          className="block w-1/2 mx-auto p-3 border border-gray-300 rounded"
          onChange={(e) => setSelectedCameraId(e.target.value)}
        >
          <option value="">Select a camera</option>
          {cameras.map((camera, index) => (
            <option key={camera.id} value={camera.id}>
              {camera.label || `Camera ${index + 1}`}
            </option>
          ))}
        </select>

        <div className="reader mt-8 border-2 border-dashed border-green-500 rounded-lg p-2 flex items-center justify-center">
          <div id="qr-reader" style={{ width: "100%" }}></div>
        </div>

        <h3 className="text-center text-lg font-semibold mt-8">Scanned Items</h3>

        <div className="mt-4 overflow-x-auto">
          <table className="table-auto w-full text-left bg-white shadow rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Product</th>
                <th className="py-3 px-6 text-left">Quantity</th>
                <th className="py-3 px-6 text-left">Price</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(items).length > 0 ? (
                Object.keys(items).map((item) => (
                  <tr key={item} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">{items[item].name}</td>
                    <td className="py-3 px-6 text-left">{items[item].quantity}</td>
                    <td className="py-3 px-6 text-left">${items[item].price}</td>
                    <td className="py-3 px-6 text-center">
                      <button
                        onClick={() => deleteItem(item)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-3">
                    No items scanned.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
