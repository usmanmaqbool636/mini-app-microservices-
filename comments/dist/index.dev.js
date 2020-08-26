"use strict";

var Express = require("express");

var app = Express();

var bodyParser = require("body-parser");

var _require = require("crypto"),
    randomBytes = _require.randomBytes;

var cors = require("cors");

var axios = require("axios");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
var commentsByPostId = {};
app.get("/posts/:id/comments", function (req, res) {
  return res.status(200).json(commentsByPostId[req.params.id] || []);
});
app.post("/posts/:id/comments", function _callee(req, res) {
  var id, content, comments;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          id = randomBytes(4).toString("hex");
          content = req.body.content;
          comments = commentsByPostId[req.params.id] || [];
          comments.push({
            id: id,
            content: content
          });
          commentsByPostId[req.params.id] = comments;
          _context.next = 7;
          return regeneratorRuntime.awrap(axios.post("http://localhost:4005/events", {
            type: "CommentCreated",
            data: {
              id: id,
              content: content,
              postId: req.params.id
            }
          }));

        case 7:
          return _context.abrupt("return", res.status(201).json(comments));

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.post("/events", function (req, res) {
  console.log("received Event =>", req.body.type);
  res.send({});
});
var PORT = process.env.PORT || 4001;
app.listen(PORT, function () {
  console.log("server is runnig o port ".concat(PORT));
});