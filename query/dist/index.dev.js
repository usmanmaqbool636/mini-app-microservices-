"use strict";

var express = require("express");

var bodyParser = require("body-parser");

var cors = require("cors");

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.get("/posts", function (req, res) {});
app.post("/events", function (req, res) {});
app.listen(4002, function () {
  console.log("listning on port 4002");
});