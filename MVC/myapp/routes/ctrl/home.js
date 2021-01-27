module.exports = {
  output: {
    home: function (req, res, next) {
      res.render("home/index");
    },
    login: (req, res) => {
      res.render("home/login");
    },
  },
  process: {
    login: (req, res) => {
      const id = ["taek", "asdf", "df"];
      const password = ["123", "31331", "12313"];
      if (id.includes(req.body.id)) {
        const idx = id.indexOf(req.body.id);
        if (password[idx] == req.body.password) {
          console.log(true);
          return res.send({ result: "Success" });
        } else return res.send({ result: "fail" });
      } else {
        console.log(false);
        return res.send({ result: "fail" });
      }
    },
  },
};
