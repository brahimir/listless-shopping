const dbConfig = require("../config/db.config.js");

// Mongoose
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

// ! MongoDB url
db.url = dbConfig.url;

// * Models
// Auth
db.User = require("./auth/user.model");
// OneList
db.OneList = require("./one-list/one-list.model")(mongoose);

module.exports = db;
