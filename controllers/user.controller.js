export const signIn = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/classroom");
  }
  return res.render("signin", { title: "Real Book | Sign In" });
};

export const signUp = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/classroom");
  }
  return res.render("signup", { title: "Real Book | Sign Up" });
};
