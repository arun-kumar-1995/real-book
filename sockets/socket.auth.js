const socketAuth = (socket, token) => {
  let cookie = {};
  const [name, value] = token.trim().split("=");
  if (value) {
    cookie[name] = JSON.parse(decodeURIComponent(value));
  }
  socket.user = cookie[name].user || null;
};

export default socketAuth;
