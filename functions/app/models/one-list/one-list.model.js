"use strict";

var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

/**
 * OneList Schema
 */
var OneListSchema = new Schema({
  name: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true
  },
  items: {
    type: Array,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model("OneList", OneListSchema);
