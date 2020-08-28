"use strict";

var Express = require("express");

var bodyParser = require("body-parser");

var axios = require("axios");

var app = Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
var events = [];
app.post("/events", function (req, res) {
  var event = req.body;
  events.push(event);
  console.log("event", event);
  axios.post("http://localhost:4000/events", event);
  axios.post("http://localhost:4001/events", event);
  axios.post("http://localhost:4002/events", event);
  axios.post("http://localhost:4003/events", event);
  return res.send({
    status: "Ok"
  });
});
app.get("/events", function (req, res) {
  return res.send(events);
});
app.listen(4005, function () {
  console.log("listning on port 4005");
});