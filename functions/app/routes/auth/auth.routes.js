"use strict";
module.exports = function(app) {
  const userHandlers = require("../../controllers/auth/user.controller");

  app.route("/tasks").post(userHandlers.loginRequired, userHandlers.user);

  // * AUTH Routes
  app.route("/auth/register").post(userHandlers.register);
  app.route("/auth/sign_in").post(userHandlers.signIn);
  app.route("/auth/logout").post(userHandlers.logout);

  // Get User from JWT token
  app.route("/auth/user/from_token").post(userHandlers.user);

  // * LIST Routes
  // Get User's Lists
  app.route("/auth/user/lists/get").post(userHandlers.getAllUserLists);

  // Get User's Active Lists
  app.route("/auth/user/lists/get/active").post(userHandlers.getActiveUserList);
};
