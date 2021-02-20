"use strict";

var mongoose = require("mongoose"),
  OneList = mongoose.model("OneList");

exports.create = (req, res) => {
  // ! start:: Validate request
  // todo:: Validate other fields:

  if (!req.body.name) {
    res.status(400).send({
      message: "name can not be empty!"
    });
    return;
  }

  if (!req.body.items) {
    res.status(400).send({
      message: "items can not be empty!"
    });
    return;
  }
  // ! end:: Validate request

  // Create a new OneList
  const newOneList = new OneList({
    name: req.body.name,
    items: req.body.items
  });

  // Save OneList in the database
  newOneList
    .save(newOneList)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the newOneList."
      });
    });
};

// Retrieve all OneLists from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? {
        title: {
          $regex: new RegExp(title),
          $options: "i"
        }
      }
    : {};

  OneList.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving OneLists."
      });
    });
};

// Find a single OneList with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  OneList.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({
          message: "Not found OneList with id " + id
        });
      else res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        error: err,
        message: "Error retrieving OneList with id=" + id
      });
    });
};

// Update a OneList by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  OneList.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false
  })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update OneList with id=${id}. Maybe OneList was not found!`
        });
      } else
        res.send({
          message: "OneList was updated successfully."
        });
    })
    .catch(err => {
      res.status(500).send({
        error: err,
        message: "Error updating OneList with id=" + id
      });
    });
};

// Delete a OneList with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  OneList.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete OneList with id=${id}. Maybe OneList was not found!`
        });
      } else {
        res.send({
          message: "OneList was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        error: err,
        message: "Could not delete OneList with id=" + id
      });
    });
};
