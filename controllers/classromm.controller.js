export const classroom = async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      return res.redirect("/classroom");
    }
    return res.render("classroom", { title: "Classroom" });
  } catch (err) {
    next(err);
  }
};
