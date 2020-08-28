"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
            content: content,
            status: "pending"
          });
          commentsByPostId[req.params.id] = comments;
          _context.next = 7;
          return regeneratorRuntime.awrap(axios.post("http://localhost:4005/events", {
            type: "CommentCreated",
            data: {
              id: id,
              content: content,
              postId: req.params.id,
              status: "pending"
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
app.post("/events", function _callee2(req, res) {
  var _req$body, type, data, postId, id, status, content, comments, comment;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, type = _req$body.type, data = _req$body.data;
          console.log("received Event =>", type);

          if (!(type === "CommentModerated")) {
            _context2.next = 11;
            break;
          }

          postId = data.postId, id = data.id, status = data.status, content = data.content;
          comments = commentsByPostId[postId];
          comment = comments.find(function (comment) {
            return comment.id === id;
          });
          comment.status = status;
          comment.postId = postId;
          console.log("comment==>>", comment);
          _context2.next = 11;
          return regeneratorRuntime.awrap(axios.post("http://localhost:4005/events", {
            type: "CommentUpdated",
            data: _objectSpread({}, comment)
          }));

        case 11:
          res.send({});

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  });
});
var PORT = process.env.PORT || 4001;
app.listen(PORT, function () {
  console.log("server is runnig o port ".concat(PORT));
});