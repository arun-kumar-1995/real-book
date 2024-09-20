console.log("hello world!");
// Initialize Socket.IO client
//  global socket instance
const socket = io();

socket.on("connect", () => {
  console.log("Connected to Socket.IO server");
});
