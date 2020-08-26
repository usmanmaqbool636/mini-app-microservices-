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

var posts = {};
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get("/posts", function (req, res) {
  return res.status(200).json(posts);
});
app.post("/posts", function _callee(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          id = randomBytes(4).toString("hex");
          posts[id] = {
            id: id,
            title: req.body.title
          };
          _context.next = 4;
          return regeneratorRuntime.awrap(axios.post("http://localhost:4005/events", {
            type: "PostCreated",
            data: _objectSpread({}, posts[id])
          }));

        case 4:
          return _context.abrupt("return", res.status(201).json(posts[id]));

        case 5:
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
var PORT = process.env.PORT || 4000;
app.listen(PORT, function () {
  console.log("server is runnig o port ".concat(PORT));
});