const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var randtoken = require("rand-token");
//const btoa = require("btoa");

const User = require("../models/user");

const refreshTokens = {};
/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns all the information in this collection
 */
exports.users_get_all = (req, res, next) => {
  User.find()
    .exec()
    .then((docs) => {
      res.status(200).json({
        count: docs.length,
        users: docs.map((doc) => {
          return {
            _id: doc._id,
            name: doc.name,
            lastName: doc.lastName,
            username: doc.username,
            role: doc.role,
            request: {
              type: "GET",
            },
          };
        }),
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "User not found",
        error: err,
      });
    });
};
/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns errors or creates a new user
 */
exports.user_signup = (req, res, next) => {
  User.find({ userName: req.body.userName })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "User is already registered in the system",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              name: req.body.name,
              lastName: req.body.lastName,
              userName: req.body.userName,
              password: hash,
              role: req.body.role,
            });
            const userEmail = user;
            return user
              .save()
              .then((result) => {
                res.status(201).json({
                  message: "User created",
                  userCreated: result,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
};
/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns a new token
 */
exports.user_refresh_session = (req, res, next) => {
  User.find({ userName: req.body.userName })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      var userName = req.body.userName;
      var refreshToken = req.body.refreshToken;
      if (
        refreshToken in refreshTokens &&
        refreshTokens[refreshToken] == userName
      ) {
        const token = jwt.sign(
          {
            userId: user[0]._id,
            name: user[0].name,
            lastName: user[0].lastName,
            userName: user[0].userName,
            userRole: user[0].role,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "3600",
          }
        );
        const refreshToken = randtoken.uid(256);
        return res.status(200).json({
          message: "Auth successful",
          token: token,
          refreshToken: refreshToken,
          expiresIn: "3600",
        });
      } else {
        res.status(401).json({
          message: "Auth failed",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * This method only updates the password of an user
 */
exports.update_change_password = (req, res, next) => {
  const id = req.params.userId;

  if (req.body.password == req.body.verPassword) {
    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      } else {
        User.update({ _id: id }, { $set: { password: hash } })
          .exec()
          .then((result) => {
            res.status(200).json(result);
          })
          .catch((err) => {
            res.status(500).json({ err: err });
          });
      }
    });
  } else {
    res.status(400).json({ err: "Passwords are different!" });
  }
};
/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * This method validates the credential and give access to each user
 */
exports.user_login = (req, res, next) => {
  User.find({ userName: req.body.userName })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              userId: user[0]._id,
              name: user[0].name,
              lastName: user[0].lastName,
              userName: user[0].userName,
              userRole: user[0].role,
            },
            process.env.prod.JWT_KEY,
            {
              expiresIn: "2h",
            }
          );
          const refreshToken = randtoken.uid(256);
          refreshTokens[refreshToken] = user[0].email;
          return res.status(200).json({
            message: "Auth successful",
            token: token,
            refreshToken: refreshToken,
            expiresIn: "3600",
          });
        }
        res.status(401).json({
          message: "Auth failed",
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * Deletes an user if it exists
 */
exports.user_delete = (req, res, next) => {
  User.deleteOne({ _id: req.params.userId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * Deletes all the records from this collection
 */
exports.delete_all_records = (req, res, next) => {
  User.deleteMany()
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
