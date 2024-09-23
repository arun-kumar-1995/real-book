const handleSockerError = (socket, message) => {
  console.error(`Error in socketHandler: ${message}`);
  socket.emit("error", {
    message,
  });
};

export default handleSockerError;
