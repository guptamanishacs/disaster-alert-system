const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 6001 });

console.log("🔴 WebSocket Server running on port 6001");

wss.on("connection", (ws) => {
  console.log("Client connected");

  // send sensor data every 3 seconds
  setInterval(() => {
    const data = {
      temperature: (25 + Math.random() * 10).toFixed(1),
      humidity: (50 + Math.random() * 20).toFixed(1),
      vibration: (Math.random() * 5).toFixed(2),
    };
    ws.send(JSON.stringify(data));
  }, 3000);
});