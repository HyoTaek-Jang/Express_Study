//모듈 호출
const express = require("express");
var fs = require("fs");
var template = require("./lib/template.js");
var path = require("path");
var sanitizeHtml = require("sanitize-html");
var qs = require("querystring");
//라우터 분리
const pageRouter = require("./routes/topic");
const bodyParser = require("body-parser");
const compression = require("compression");
const cookie = require("cookie");

var helmet = require("helmet");
const app = express();
app.use(helmet());

const port = 3000;
// 정적 파일을 사용하기위해. 퍼플릭디렉토리 안에서 스태틱을 찾겠다.
app.use(express.static("public"));
// 폼 형식의 바디를 팔즈함
// app은 요청이 들어올때마다 아래 use로 장착된걸 거침
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
let isOwner = false;
app.use((req, res) => {
  if (req.headers.cookie !== undefined) {
    //  객체로 전달해줌
    cookies = cookie.parse(req.headers.cookie);
    isOwner = true;
  }
});
//미들웨어는 ,로 연결하여 연달아 실행되게 할 수 잇음. 넥스트 안하면 거기서 끝.
// next('route')와 next() 차이점, 다음 라우터 실행과 그냥 다음 미들웨어 실행.

//사용자정의 미들웨어이자 애플리케이션 레벨 미들웨어임
// use를 쓰면 모든 요청에서 미들웨어를 다 사용해서 낭비임. 그래서 get을 쓰는 요청에만 미들웨어를 사용함.
// 이야 우리가 만든 모든건 다 미들웨어였어!
app.get("*", (req, res, next) => {
  fs.readdir("./data", (err, filelist) => {
    req.list = filelist;
    // 그 담엔 실행될 미들웨어를 호출시킴.
    next();
  });
});

// route, routing
// 기존에 if문으로 패스 분석해서 라우팅한거를 가독성 좋게 만든거
// 기존 방식을 req res를 한번 받아서 쓰느냐 정의된 부분이랑 사용되는 부분이 너무 먼데, express 라우터 방식은 각각 구현되서 사용처랑 가까움
app.get("/", (req, res) => {
  var title = "Welcome";
  var description = "Hello, Node.js";
  var list = template.list(req.list);
  var html = template.HTML(
    title,
    list,
    `<h2>${title}</h2>${description} <img src="/images/img.jpg" style="width:100px; display : block;">`,
    `<a href="/create">create</a>`
  );
  //  기존 writehaed랑 end를 축약형
  res.send(html);
});

app.get("/login", (req, res) => {
  var title = "Welcome";
  var description = "Hello, Node.js";
  var list = template.list(req.list);
  var html = template.HTML(
    title,
    list,
    `<h2>${title}</h2>${description} <img src="/images/img.jpg" style="width:100px; display : block;">`,
    `
    <form action="login_process" method="POST">
    <p><input type="text" name="email" placeholder="email" /></p>
    <p><input type="password" name="password" placeholder="PW" /></p>
    <input type="submit">
  </form>
    <a href="/create">create</a>`
  );
  //  기존 writehaed랑 end를 축약형
  res.send(html);
});

app.post("/login_process", (req, res) => {
  body = req.body;
  if (body.email === "gyxor8582@naver.com" && body.password === "111") {
    res.setHeader("Set-Cookie", [
      `emial=${body.email}`,
      `password=${body.password}`,
      `nickname=john`,
    ]);
    res.redirect("/");
  } else res.send("who?");
});

//라우터 분리
app.use("/page", pageRouter);

app.get("/create", (req, res) => {
  fs.readdir("./data", function (error, filelist) {
    var title = "WEB - create";
    var list = template.list(filelist);
    var html = template.HTML(
      title,
      list,
      `
      <form action="/create_process" method="post">
        <p><input type="text" name="title" placeholder="title"></p>
        <p>
          <textarea name="description" placeholder="description"></textarea>
        </p>
        <p>
          <input type="submit">
        </p>
      </form>
    `,
      ""
    );
    res.send(html);
  });
});

//post로 받을땐 app.post
app.post("/create_process", (req, res) => {
  // var body = "";
  // req.on("data", function (data) {
  //   body = body + data;
  // });
  // req.on("end", function () {
  //   var post = qs.parse(body);
  //   var title = post.title;
  //   var description = post.description;
  //   fs.writeFile(`data/${title}`, description, "utf8", function (err) {
  //     res.writeHead(302, { Location: `/page/${title}` });
  //     res.end();
  //   });
  // });

  //body-parser로 req에 body라는 속성이 생김
  var post = req.body;
  var title = post.title;
  var description = post.description;
  fs.writeFile(`data/${title}`, description, "utf8", function (err) {
    res.writeHead(302, { Location: `/page/${title}` });
    res.end();
  });
});

app.get("/update/:pageId", (req, res) => {
  fs.readdir("./data", function (error, filelist) {
    fs.readFile(
      `data/${req.params.pageId}`,
      "utf8",
      function (err, description) {
        var title = req.params.pageId;
        var list = template.list(filelist);
        var html = template.HTML(
          title,
          list,
          `
        <form action="/update" method="post">
          <input type="hidden" name="id" value="${title}">
          <p><input type="text" name="title" placeholder="title" value="${title}"></p>
          <p>
            <textarea name="description" placeholder="description">${description}</textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
        `,
          `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
        );
        res.send(html);
      }
    );
  });
});

app.post("/update", (req, res) => {
  let body = ``;
  req.on("data", (data) => {
    body += data;
  });

  req.on("end", () => {
    const post = qs.parse(body);
    const title = post.title;
    const description = post.description;
    const id = post.id;

    fs.rename(`data/${id}`, `data/${title}`, function (error) {
      fs.writeFile(`./data/${title}`, description, "utf8", (err) => {
        res.redirect(`/page/${title}`);
      });
    });
  });
});

app.post("/delete_process", (req, res) => {
  parse = req.body;
  fs.unlink(`./data/${parse.id}`, (err) => {
    res.redirect("/");
  });
});

// 리슨 메소드가 실행되면 서버가 실행된거. port에 리슨을 함.
// next err도 에러띄우는거임
// 404처리부분
app.use((req, res, next) => {
  res.status(404).send("sorry cant find that!");
});

//인자가 4개인 미들웨어는 에러 핸들링임
app.use((err, req, res, next) => {
  res.status(500).send("something broke!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
