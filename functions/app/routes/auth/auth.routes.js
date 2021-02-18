"use strict";
module.exports = function(app) {
  var userHandlers = require("../../controllers/auth/user.controller");

  app.route("/tasks").post(userHandlers.loginRequired, userHandlers.user);

  // Auth Routes
  app.route("/auth/register").post(userHandlers.register);
  app.route("/auth/sign_in").post(userHandlers.sign_in);

  // Get User from JWT token
  app.route("/auth/user").post(userHandlers.user);
};
