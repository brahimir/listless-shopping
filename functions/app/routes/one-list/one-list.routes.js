module.exports = (app) => {
  const OneList = require("../../controllers/one-list/one-list.controller.js");

  var router = require("express").Router();

  // * CRUD
  // Create a new OneList
  router.post("/create", OneList.create);

  // Retrieve all OneLists
  router.get("/get/all", OneList.findAll);

  // UPDATE a OneList by ID
  router.put("/update/:id", OneList.update);

  // Retrieve OneList by ID
  router.get("/get/:id", OneList.findOne);

  // Delete OneList with id
  router.delete("/:id", OneList.delete);

  app.use("/api/one-list", router);
};
