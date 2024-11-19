import React, { useEffect, useRef, useState } from 'react';
import { BrowserBarcodeReader } from '@zxing/library';
import { BACKEND_SERVER_URL } from '../utils/config';

const CartPage = () => {
  const videoRef = useRef(null); // Reference to the video element
  const [result, setResult] = useState('Waiting for a barcode...');
  const [error, setError] = useState('');
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  const [scannedItems, setScannedItems] = useState([]); // State to hold scanned items

  useEffect(() => {
    const fetchDevices = async () => {
      const codeReader = new BrowserBarcodeReader();

      try {
        const videoDevices = await codeReader.getVideoInputDevices();
        setDevices(videoDevices);

        // Set default camera to back camera or the first available one
        const backCamera = videoDevices.find((device) =>
          device.label.toLowerCase().includes('back') ||
          device.label.toLowerCase().includes('rear')
        );
        setSelectedDeviceId(backCamera ? backCamera.deviceId : videoDevices[0]?.deviceId);
      } catch (err) {
        console.error(err);
        setError(`Error fetching camera devices: ${err.message}`);
      }
    };

    fetchDevices();
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
              try {
                const res = await fetch(`${BACKEND_SERVER_URL}/product/get/${result.text}`, {
                  headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt_token'),
                  },
                });
                const data = await res.json();
                if (res.ok) {
                  // Check if the product already exists in the scannedItems list
                  setScannedItems((prevItems) => {
                    if (!prevItems.some(item => item.id === data.id)) {
                      return [...prevItems, data];
                    }
                    return prevItems; // Do not add if it already exists
                  });
                  console.log(data);
                }
              } catch (error) {
                console.warn(error);
              }
              setError('');
            } else if (err && err.name !== 'NotFoundException') {
              console.error(err);
              setError('Error: Could not detect barcode. Ensure it is in view.');
            }
          }
        );
      } catch (err) {
        console.error(err);
        setError(`Error starting barcode scanner: ${err.message}`);
      }

      return () => {
        codeReader.reset(); // Clean up when the component unmounts
      };
    };

    startBarcodeScanner();
  }, [selectedDeviceId]);

  const handleDeviceChange = (e) => {
    setSelectedDeviceId(e.target.value);
  };

  return (
    <div
      style={{
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f4f4f9',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <h1 style={{ fontSize: '24px', margin: '20px 0' }}>Back Camera Barcode Scanner</h1>

      {/* Camera selection dropdown */}
      <select
        value={selectedDeviceId}
        onChange={handleDeviceChange}
        style={{
          marginBottom: '20px',
          padding: '10px',
          fontSize: '16px',
        }}
      >
        {devices.map((device) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Camera ${device.deviceId}`}
          </option>
        ))}
      </select>

      <video
        ref={videoRef}
        style={{
          width: '90%',
          maxWidth: '600px',
          margin: '20px auto',
          border: '3px solid #ddd',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
        autoPlay
        playsInline
      />

      {/* Scanned items list */}
      <div className="my-4">
        <h2 className="text-xl font-semibold">Scanned Items</h2>
        <div className="overflow-auto" style={{ maxHeight: '50vh' }}>
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
                      onClick={() =>
                        setScannedItems((prevItems) =>
                          prevItems.filter((i) => i.id !== item.id)
                        )
                      }
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
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
          Checkout
        </button>
      </div>

      {/* Display result or error */}
      <div className="text-lg font-bold">{result}</div>
      <div className="text-red-600">{error}</div>
    </div>
  );
};

export default CartPage;
