export const signIn = async (req, res, next) => {
  return res.render("signin", { title: "Real Book | Sign In" });
};

export const signUp = async (req, res, next) => {
  return res.render("signup", { title: "Real Book | Sign Up" });
};
