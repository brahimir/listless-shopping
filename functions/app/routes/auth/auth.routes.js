"use strict";
module.exports = function(app) {
  const userHandlers = require("../../controllers/auth/user.controller");

  app.route("/tasks").post(userHandlers.loginRequired, userHandlers.user);

  // * AUTH Routes
  app.route("/auth/register").post(userHandlers.register);
  app.route("/auth/sign_in").post(userHandlers.signIn);
  app.route("/auth/logout").post(userHandlers.logout);

  // Get User from JWT token
  app.route("/auth/from_token").post(userHandlers.user);

  // * LIST Routes
  // Get all User's Lists
  app.route("/auth/user/lists/get").post(userHandlers.getAllUserLists);

  // Get all User's ARCHIVED Lists
  app.route("/auth/user/lists/archived/get").post(userHandlers.getAllUserArchivedLists);

  // Get User's Active Lists
  app.route("/auth/user/lists/get/active").post(userHandlers.getActiveUserList);

  // Update All User's Lists
  app.route("/auth/user/lists/update").put(userHandlers.updateUserLists);

  // Update All User's ARCHIVED Lists
  app.route("/auth/user/lists/archived/update").put(userHandlers.updateUserArchivedLists);
};
