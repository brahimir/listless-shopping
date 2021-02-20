"use strict";

var mongoose = require("mongoose"),
  bcrypt = require("bcrypt"),
  Schema = mongoose.Schema;

/**
 * User Schema
 */
var UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true
    },
    hash_password: {
      type: String
    },
    settings: {
      type: Object,
      required: true
    },
    profile: {
      type: Object,
      required: true
    }
  },
  { timestamps: true }
);

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.hash_password);
};

mongoose.model("User", UserSchema);
