"use strict";

var Express = require("express");

var bodyParser = require("body-parser");

var axios = require("axios");

var app = Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.post("/events", function (req, res) {
  var event = req.body;
  axios.post("http://localhost:4000/events", event);
  axios.post("http://localhost:4001/events", event);
  axios.post("http://localhost:4002/events", event);
  return res.send({
    status: "Ok"
  });
});
app.listen(4005, function () {
  console.log("listning on port 4005");
});