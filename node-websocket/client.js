const WebSocket = require('ws');

// Replace 'ws://localhost:8080' with the WebSocket URL of your server
const socket = new WebSocket('ws://localhost:8080',

{
    headers: {
        'user-id': 'ced'
      }
});

// Event handler when the connection is opened
socket.on('open', () => {
  console.log('Connected to WebSocket server');
  
  // Send a test message to the server
  const message = JSON.stringify({ recipientId: 'recipientUserId', text: 'Hello, WebSocket server!' });
  socket.send(message);
});

// Event handler for incoming messages from the server
socket.on('message', (data) => {
  console.log(`Received message from server: ${data}`);
});

// Event handler when the connection is closed
socket.on('close', () => {
  console.log('Disconnected from WebSocket server');
});

// Event handler for errors
socket.on('error', (error) => {
  console.error('WebSocket error:', error.message);
});