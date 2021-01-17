var express = require("express");
var parseurl = require("parseurl");
var session = require("express-session");
const FileStroe = require("session-file-store")(session);

var app = express();

app.use(
  session({
    //남들에겐 보여서 안될 부분. 버전관리나 서버에서 변수로 사용하고 따로 파일을 만들어서 이그노어처리
    secret: "keyboard cat",
    // 걍 이렇게 하셈 아래는 ㅇㅇ
    resave: false,
    // 세션이 필요하지 않으면 구동하지 않는다.
    saveUninitialized: true,
    store: new FileStroe(),
  })
);

app.get("/foo", function (req, res, next) {
  if (req.session.num === undefined) {
    req.session.num = 1;
  } else {
    req.session.num += 1;
  }
  console.log(req.session);
  res.send("hi" + req.session.num);
});

app.listen(3000, () => {
  console.log("3000!!!");
});
