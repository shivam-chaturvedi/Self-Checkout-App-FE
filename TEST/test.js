// test.js
const WebSocket = require('ws');

const socket = new WebSocket('wss://donalddesk.duckdns.org:8443/cart?cartId=1');

socket.on('open', () => {
  console.log('✅ Connected to WebSocket');

  let count = 0;
  setInterval(() => {
    const message = `Hello from Node #${++count}`;
    socket.send(message);
    console.log('📤 Sent:', message);
  }, 1);
});

socket.on('message', (data) => {
  console.log('📥 Received:', data.toString());
});

socket.on('error', (err) => {
  console.error('❌ WebSocket error:', err.message || err);
});

socket.on('close', () => {
  console.log('❎ WebSocket closed');
});
