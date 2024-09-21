const handleSockerError = (socket, error) => {
  console.error(`Error in socketHandler: ${error.message}`);
  socket.emit("error", {
    message: error.message,
  });
};

export default handleSockerError;
