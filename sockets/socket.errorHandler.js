const handleSockerError = (socket, error) => {
  console.error(`Error in socketHandler: ${err.message}`);
  socket.emit("error", {
    message: error.message,
  });
};

export default handleSockerError;
