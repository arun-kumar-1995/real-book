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

  // book seat
  const bookingform = document.querySelector("#booking-modal form");
  bookingform.addEventListener("submit", (e) => {
    e.preventDefault();

    const seatNumber = bookingform.children[0].value;
    const selectedDate = bookingform.children[1].value;
    console.log(seatNumber, selectedDate);
    // emit socket event for booking
    socket.emit("book-seat", { seatNumber, selectedDate });
  });

  // refetch booked seats
  socket.on("refetch-seat", (data) => {
    // rerender classroom
    rerenderClassroom(data);
  });
});
