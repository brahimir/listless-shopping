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
exports.getAllUserLists = function(req, res) {
  User.findOne({ _id: req.body._id }, function(err, user) {
    if (err) throw err;
    if (!user) {
      return res.status(401).json({
        message: `Error. Could not locate User with ${req.body._id}`
      });
    }

    const userLists = user.profile.lists;
    const response = {
      lists: userLists
    };

    return res.json(response);
  });
};

exports.getActiveUserList = function(req, res) {
  User.findOne({ _id: req.body._id }, function(err, user) {
    if (err) throw err;
    if (!user) {
      return res.status(401).json({
        message: `Error. Could not locate User with ${req.body._id}`
      });
    }

    const userLists = user.profile.lists;

    let activeList;
    userLists.forEach(element => {
      if (element.isActive) {
        activeList = element;
      }
    });

    const response = {
      activeList: activeList
    };

    return res.json(response);
  });
};

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
