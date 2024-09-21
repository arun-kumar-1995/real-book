// Initialize Socket.IO client
//  global socket instance
const socket = io();

// connect socket
socket.on("connect", () => {
  console.log("Connected to Socket.IO server");
});

// disconnect event
socket.on("disconnect", () => {
  console.log("Disconnected from Socket.IO server");
});

socket.on("error", (error) => {
  console.error("Socket encountered error:", error);
  // Take appropriate action, such as notifying the user
});

function getAvailableSeat(inputDate) {
  socket.emit("seat-available", { inputDate });
}

// update classroom details
socket.on("update-classroom", (data) => {
  // busisness logic to update the classroom seat and details
  const seatAnalytics = document.getElementById("seat-analytics");
  updateSeatAnalysis(seatAnalytics, data);
  // redraw seats
});
