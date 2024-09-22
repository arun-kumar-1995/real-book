const socketAuth = (socket, token) => {
  if (token) {
    const [name, value] = token.trim().split("=");
    const cookie = JSON.parse(decodeURIComponent(value));
    socket.user = cookie.user || null;
  }
};

export default socketAuth;
