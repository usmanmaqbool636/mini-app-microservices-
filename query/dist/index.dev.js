"use strict";

var express = require("express");

var bodyParser = require("body-parser");

var cors = require("cors");

var app = express();

var axios = require("axios");

app.use(cors());
app.use(bodyParser.json());
var posts = {};

var handleEvents = function handleEvents(type, data) {
  if (type === "PostCreated") {
    var id = data.id,
        title = data.title;
    posts[id] = {
      id: id,
      title: title,
      comments: []
    };
  }

  if (type === "CommentCreated") {
    var _id = data.id,
        content = data.content,
        postId = data.postId,
        status = data.status;
    var post = posts[postId];
    post.comments.push({
      id: _id,
      content: content,
      status: status
    });
  }

  if (type === "CommentUpdated") {
    var _id2 = data.id,
        _content = data.content,
        _postId = data.postId,
        _status = data.status;
    var _post = posts[_postId];

    var comment = _post.comments.find(function (comment) {
      return comment.id === _id2;
    });

    comment.status = _status;
    comment.content = _content;
  }
};

app.get("/posts", function (req, res) {
  res.send(posts);
});
app.post("/events", function (req, res) {
  var _req$body = req.body,
      type = _req$body.type,
      data = _req$body.data;
  handleEvents(type, data);
  res.send({});
});
app.listen(4002, function _callee() {
  var res, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, event;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log("listning on port 4002");
          _context.next = 3;
          return regeneratorRuntime.awrap(axios.get("http://localhost:4005/events"));

        case 3:
          res = _context.sent;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 7;

          for (_iterator = res.data[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            event = _step.value;
            console.log("Processing event", event.type);
            handleEvents(event.type, event.data);
          }

          _context.next = 15;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](7);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 15:
          _context.prev = 15;
          _context.prev = 16;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 18:
          _context.prev = 18;

          if (!_didIteratorError) {
            _context.next = 21;
            break;
          }

          throw _iteratorError;

        case 21:
          return _context.finish(18);

        case 22:
          return _context.finish(15);

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[7, 11, 15, 23], [16,, 18, 22]]);
});