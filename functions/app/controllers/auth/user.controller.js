"use strict";

var mongoose = require("mongoose"),
  jwt = require("jsonwebtoken"),
  bcrypt = require("bcrypt"),
  User = mongoose.model("User");

// * REGISTER
exports.register = function(req, res) {
  var newUser = new User(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);

  newUser.save(function(err, user) {
    if (err) {
      return res.status(400).send({
        message: err
      });
    } else {
      user.hash_password = undefined;
      return res.json({
        user: user
      });
    }
  });
};

// * AUTH
// Login a User.
exports.signIn = function(req, res) {
  User.findOne({ email: req.body.email }, function(err, user) {
    if (err) throw err;
    if (!user || !user.comparePassword(req.body.password)) {
      return res.status(401).json({
        message: "Authentication failed. Invalid user or password."
      });
    }

    // Generate and set User's auth token.
    const userToken = jwt.sign(
      { _id: user._id, email: user.email, settings: user.settings },
      "list-lessAPI"
    );

    user.token = userToken;

    // Save User's auth token to server.
    user.save(function(err) {
      if (err) {
        return res.status(400).send({
          message: err
        });
      }
    });

    // Return the User metadata and their respective token.
    return res.json({
      token: userToken,
      user: {
        _id: user._id,
        email: user.email,
        settings: user.settings
      }
    });
  });
};

// Logout a User.
exports.logout = function(req, res) {
  User.findOne({ _id: req.body._id }, function(err, user) {
    if (err) throw err;
    if (!user) {
      return res.status(401).json({
        message: `Error. Could not find a User with ${req._id}`
      });
    }

    user.token = null;

    // Save User's auth token to server.
    user.save(function(err) {
      if (err) {
        return res.status(400).send({
          message: err
        });
      }
    });

    // Return the User metadata and their respective token.
    return res.json({
      isLoggedOut: true,
      user: {
        _id: user._id,
        email: user.email,
        settings: user.settings
      }
    });
  });
};

// * LISTS
// ? GETs
// Get all User's Lists.
exports.getAllUserLists = function(req, res) {
  const userId = req.body._id;

  User.findOne({ _id: userId }, function(err, user) {
    if (err) throw err;
    if (!user) {
      return res.status(401).json({
        message: `Error. Could not locate User with ${req.body._id}`
      });
    }

    const userLists = user.profile.lists;
    const count = userLists.length;

    const response = {
      count: count,
      lists: userLists,
      status: 200
    };

    return res.json(response);
  });
};

// Get all User's ARCHIVED Lists.
exports.getAllUserArchivedLists = function(req, res) {
  const userId = req.body._id;

  User.findOne({ _id: userId }, function(err, user) {
    if (err) throw err;
    if (!user) {
      return res.status(401).json({
        message: `Error. Could not locate User with ${req.body._id}`
      });
    }

    const userArchivedLists = user.profile.archived_lists;
    const count = userArchivedLists.length;

    // Prepare response.
    const response = {
      count: count,
      archivedLists: userArchivedLists,
      status: 200
    };

    return res.json(response);
  });
};

// Get User's ARCHIVED Lists by request Category Index.
exports.getUserArchivedListsByCategory = function(req, res) {
  const userId = req.body._id;
  const categoryIndex = req.body.categoryIndex;

  User.findOne({ _id: userId }, function(err, user) {
    if (err) throw err;
    if (!user) {
      return res.status(401).json({
        message: `Error. Could not locate User with id ${req.body._id}`
      });
    }

    const archivedListsByCategoryIndex = [];
    user.profile.archived_lists.forEach(element => {
      if (element.category.index === categoryIndex) {
        archivedListsByCategoryIndex.unshift(element);
      }
    });

    const count = archivedListsByCategoryIndex.length;

    // Prepare response.
    const response = {
      count: count,
      archivedListsByCategoryIndex: archivedListsByCategoryIndex,
      status: 200
    };

    return res.json(response);
  });
};

// ? UPDATEs
// Update all User's Lists.
exports.updateUserLists = function(req, res) {
  if (!req.body) {
    return res.status(400).send({
      message: "User lists to update can not be empty!"
    });
  }

  const id = req.body._id;
  const lists = req.body.lists;

  User.findByIdAndUpdate(
    id,
    { $set: { "profile.lists": lists } },
    {
      useFindAndModify: false
    }
  )
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User's Lists with id=${id}. Maybe User was not found!`,
          status: 404
        });
      } else
        res.status(200).send({
          message: "User's Lists was updated successfully.",
          status: 200
        });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User's Lists with id=" + id,
        error: err,
        status: 500
      });
    });
};

// Update all User's ARCHIVED Lists
exports.updateUserArchivedLists = function(req, res) {
  if (!req.body) {
    return res.status(400).send({
      message: "User archivedLists to update can not be empty!"
    });
  }

  const id = req.body._id;
  const archivedLists = req.body.archivedLists;

  User.findByIdAndUpdate(
    id,
    { $set: { "profile.archived_lists": archivedLists } },
    {
      useFindAndModify: false
    }
  )
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User's archivedLists with id=${id}. Maybe User was not found!`,
          status: 404
        });
      } else
        res.status(200).send({
          message: "User's archivedLists was updated successfully.",
          status: 200
        });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User's archivedLists with id=" + id,
        error: err,
        status: 500
      });
    });
};

// * EXTRAS
exports.loginRequired = function(req, res, next) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized user!" });
  }
};

exports.user = function(req, res, next) {
  if (req.user) {
    res.send(req.user);
    next();
  } else {
    return res.status(401).json({ message: "Invalid token" });
  }
};
