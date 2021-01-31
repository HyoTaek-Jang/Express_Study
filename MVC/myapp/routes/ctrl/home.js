const User = require("../../models/User");

module.exports = {
  output: {
    home: function (req, res, next) {
      res.render("home/index");
    },
    login: (req, res) => {
      res.render("home/login");
    },
    register: (req, res) => {
      res.render("home/register");
    },
  },
  process: {
    login: async (req, res) => {
      const user = new User(req.body);
      const login = await user.login();
      return res.json(login);
    },
    register: async (req, res) => {
      const user = new User(req.body);
      const signUpResult = await user.register();
      console.log(signUpResult);
      return res.json(signUpResult);
    },
  },
};
