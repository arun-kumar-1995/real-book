const checkAuth = (req, res, next) => {
  let cookie_data;
  const _session = req.cookies._session;
  if (_session) {
    cookie_data = JSON.parse(_session);
  }
  // define authenticate function
  req.isAuthenticated = () => !!cookie_data?.token;
  // assign user from cookie to req.user
  req.user = cookie_data?.user;
  // so that we can access to each views
  res.locals.user = req.user;
  next();
};

export default checkAuth;
