"use strict";

// ! Firebase functions
const functions = require("firebase-functions");

var express = require("express"),
  app = express(),
  port = process.env.PORT || 8082,
  bodyParser = require("body-parser"),
  jsonwebtoken = require("jsonwebtoken");

// Parsers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// * Mongoose Models
require("./app/models/auth/user.model");

const mongoose = require("mongoose");
const option = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
  reconnectTries: 30000
};

const mongoURI = require("./app/config/db.config.js");
mongoose.connect(mongoURI.url, option).then(
  function() {
    //connected successfully
    console.log("SUCCESSFULLY CONNECTED TO MONGODB DATABASE.");
  },
  function(err) {
    //err handle
    console.log(err);
  }
);

app.use(function(req, res, next) {
  // Check for JWT token in header.
  if (req.headers && req.headers.authorization && req.headers.authorization.split(" ")[0] === "JWT") {
    jsonwebtoken.verify(req.headers.authorization.split(" ")[1], "list-lessAPI", function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

// * Routes
var routes = require("./app/routes/auth/auth.routes");
routes(app);

app.listen(port);

console.log(" list-less API server started on: " + port);

module.exports = app;

// ! Firebase exports
exports.app = functions.https.onRequest(app);
