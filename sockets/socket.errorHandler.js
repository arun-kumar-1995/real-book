const handleSockerError = (socket, error) => {
  socket.emit("error", {
    message: error.message,
  });
};

export default handleSockerError;
