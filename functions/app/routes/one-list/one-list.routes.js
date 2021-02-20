"use strict";

module.exports = function(app) {
  const oneListHandlers = require("../../controllers/one-list/one-list.controller");

  // Create OneList
  app.route("/one_list/create").post(oneListHandlers.create);

  // Get OneList by ID
  app.route("/one_list/get/:id").get(oneListHandlers.findOne);

  // Update OneList by ID
  app.route("/one_list/update/:id").put(oneListHandlers.update);
};
