const socketHandler = (handler, io, socket) => {
  return (data, callback) => {
    handler({ ...data, io, socket }, callback);
  };
};
export default socketHandler;
