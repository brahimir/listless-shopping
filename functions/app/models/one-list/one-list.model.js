"use strict";

var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

/**
 * OneList Schema
 */
var OneListSchema = new Schema(
  {
    name: {
      type: String,
      lowercase: true,
      trim: true,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
  { timestamps: true }
);

mongoose.model("OneList", OneListSchema);
