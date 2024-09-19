const SendResponse = (
  res,
  statusCode,
  message,
  data = null,
  redirect = null
) => {
  return res.status(statusCode).json({
    success: statusCode >= 200 && statusCode < 300,
    message,
    status: statusCode,
    ...(data && { data }),
    ...(redirect && { redirectUrl: redirect }),
  });
};

export default SendResponse;
