const WebSocket = require('ws');
const http = require('http');

const server = http.createServer((req, res) => {
});

const wss = new WebSocket.Server({ server });
const connectedUsers = new Map(); // Map to store user WebSocket connections

wss.on('connection',  function(ws) {
  console.log("connected");
  let userId = "";
  ws.on('message', (message) => {

    // Handle one-on-one messaging
    const data = JSON.parse(message);
    console.log(data);
    if(data.userId != undefined){
      console.log("User connected with id: " + data.userId);
      userId = data.userId;
      connectedUsers.set(data.userId, ws);
    }
    else{
    const senderId = data.sender;
    const recipientId = data.receiver;
    const text = data.message;
    
    console.log(senderId,recipientId,text);
  
    const recipientSocket = connectedUsers.get(recipientId);
    if (recipientSocket && recipientSocket.readyState === WebSocket.OPEN) {
      recipientSocket.send(JSON.stringify({ senderId: userId, text }));
    }
  }
  });
  ws.on('close', () => {
    // Handle user disconnection and remove them from the connected users Map
    connectedUsers.delete(userId);
    console.log(`User disconnected: ${userId}`);
  });
});



// Start the HTTP server on port 8080 (same as previous example)
server.listen(8080, () => {
  console.log('WebSocket server is running on port 8080');
});
