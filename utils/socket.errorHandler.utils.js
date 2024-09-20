const SocketError = (socket, error) => {
  socket.emit((eventType = "error"), { message: error.message });
};

export default SocketError;
