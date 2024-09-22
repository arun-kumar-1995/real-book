document.addEventListener("DOMContentLoaded", function () {
  const socket = io();
  // listing for the conenction event
  socket.on("connect", () => {
    console.log("A user connected: " + socket.id);
  });

  // listing for disconnect event
  socket.on("disconnect", () => {
    console.log("Socket Disconnected" + socket.id);
  });

  // Define globally
  window.getAvailableSeat = function (inputDate) {
    socket.emit("seat-available", { inputDate });
  };

  // update classroom details
  socket.on("update-classroom", (data) => {
    // busisness logic to update the classroom seat and details
    const seatAnalytics = document.getElementById("seat-analytics");
    updateSeatAnalysis(seatAnalytics, data);
    // redraw classroom
    setupClassroom((totalSeats = 36), (seatsPerRow = 8), data.socketData);
  });
});
