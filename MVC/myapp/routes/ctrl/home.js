const User = require("../../models/User");
const UserStorage = require("../../models/UserStorage");

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
    login: (req, res) => {
      console.log(req.body);
      const user = new User(req.body);
      const login = user.login();
      return res.json(login);
    },
    register: (req, res) => {
      const signUpResult = UserStorage.setUser(req.body);
      return res.json(signUpResult);
    },
  },
};
