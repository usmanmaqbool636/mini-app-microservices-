"use strict";

var express = require("express");

var bodyParser = require("body-parser");

var cors = require("cors");

var app = express();
app.use(cors());
app.use(bodyParser.json());
var posts = {};
app.get("/posts", function (req, res) {
  res.send(posts);
});
app.post("/events", function (req, res) {
  var _req$body = req.body,
      type = _req$body.type,
      data = _req$body.data;

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

  res.send({});
});
app.listen(4002, function () {
  console.log("listning on port 4002");
});