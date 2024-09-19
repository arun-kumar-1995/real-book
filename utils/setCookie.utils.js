const setCookie = (res, user, token) => {
  // calculate expires in milliseconds
  const expiresIn = Date.now() + process.env.COOKIE_EXPIRE * 86400000;

  const cookie_options = {
    expires: new Date(expiresIn),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  // setting up cookie
  res.cookie(
    "token",
    JSON.stringify({
      token,
      user: { id: user._id, name: user.name },
    }),
    cookie_options
  );
};

export default setCookie;
