module.exports = {
  "output.home": function (req, res, next) {
    res.render("home/index");
  },
  "output.login": (req, res) => {
    res.render("home/login");
  },
};
