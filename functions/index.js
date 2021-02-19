"use strict";

// ! Firebase functions
const functions = require("firebase-functions");

var express = require("express"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  port = 8082,
  jsonwebtoken = require("jsonwebtoken");

// ! Cors
var corsOptions = {
  origin: ["https://list-less.ca", "https://www.list-less.ca", "http://localhost:1901"]
};

const app = express();

// CORs
app.use(cors(corsOptions));

// Parsers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// * Mongoose
// Models
require("./app/models/auth/user.model");
require("./app/models/one-list/one-list.model");

// DB Connection
const mongoURI = require("./app/config/db.config.js");

const mongoose = require("mongoose");
const option = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
  reconnectTries: 30000
};

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

// Check for JWT token in header.
app.use(function(req, res, next) {
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
// Auth
require("./app/routes/auth/auth.routes")(app);

// OneList
require("./app/routes/one-list/one-list.routes")(app);

// routes(app);
app.listen(port);
console.log(" list-less API server listening on port: " + port);

// ! Firebase exports

exports.app = functions.https.onRequest(app);
