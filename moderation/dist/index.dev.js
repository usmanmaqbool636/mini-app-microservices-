"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require("express");

var bodyParser = require("body-parser");

var axios = require("axios");

var app = express();
app.use(bodyParser.json());
app.post("/events", function _callee(req, res) {
  var _req$body, type, data, status;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, type = _req$body.type, data = _req$body.data;

          if (!(type === "CommentCreated")) {
            _context.next = 5;
            break;
          }

          status = data.content.includes("orange") ? "rejected" : "approved";
          _context.next = 5;
          return regeneratorRuntime.awrap(axios.post("http://localhost:4005/events", {
            type: "CommentModerated",
            data: _objectSpread({}, data, {
              status: status
            })
          }));

        case 5:
          return _context.abrupt("return", res.send({}));

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.listen(4003, function () {
  console.log("listning on port 4003");
});