const socketHandler = (handler, io) => {
  return (data, callback) => {
    handler({ ...data, io }, callback);
  };
};
export default socketHandler;
