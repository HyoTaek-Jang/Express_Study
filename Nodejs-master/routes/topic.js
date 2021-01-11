//라우터 분리
let express = require("express");
let router = express.Router();

var path = require("path");
var sanitizeHtml = require("sanitize-html");
var template = require("../lib/template.js");
var fs = require("fs");

//라우터 분리
// pageId 위치에 들어오는 파라미터를 req.parmas로 들어옴
router.get("/:pageId", (req, res) => {
  console.log("123");
  fs.readdir("./data", function (error, filelist) {
    var filteredId = path.parse(req.params.pageId).base;
    fs.readFile(`data/${filteredId}`, "utf8", function (err, description) {
      var title = req.params.pageId;
      var sanitizedTitle = sanitizeHtml(title);
      var sanitizedDescription = sanitizeHtml(description, {
        allowedTags: ["h1"],
      });
      var list = template.list(filelist);
      var html = template.HTML(
        sanitizedTitle,
        list,
        `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
        ` <a href="/create">create</a>
            <a href="/update/${sanitizedTitle}">update</a>
            <form action="/delete_process" method="post">
              <input type="hidden" name="id" value="${sanitizedTitle}">
              <input type="submit" value="delete">
            </form>`
      );
      res.send(html);
    });
  });
});

//라우터 분리
module.exports = router;
