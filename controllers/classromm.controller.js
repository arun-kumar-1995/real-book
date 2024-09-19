export const classroom = async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      return res.render("classroom", { title: "Classroom" });
    } else {
      return res.redirect("/sign-in");
    }
  } catch (err) {
    next(err);
  }
};
