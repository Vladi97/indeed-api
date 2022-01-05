const Team = require("../models/team");
const mongoose = require("mongoose");

/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns all the information in this collection
 */
exports.get_all = (req, res, next) => {
  Team.find()
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        team: docs.map((doc) => {
          return {
            _id: doc._id,
            name: doc.name,
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * Creates a group in the database if all the information is correct
 */
exports.create_metric = (req, res, next) => {
  const team = new Metrics({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
  });
  team
    .save()
    .then((result) => {
      res.status(201).json({
        message: "team created",
        createdTeam: {
          _id: result._id,
          name: result.name,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns a group if the Id belong to an object in the database
 */
exports.get_team = (req, res, next) => {
  const id = req.params.teamId;
  Team.findById(id)
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          team: doc.data,
        });
      } else {
        res.status(404).json({ message: "No valid entry for provided ID" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * If the information is valid then it will update the group
 */
exports.update_team = (req, res, next) => {
  const id = req.params.teamId;
  if (mongoose.Types.ObjectId.isValid(id)) {
    Team.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: req.body,
      },
      {
        new: true,
      },
      function (err) {
        if (err) {
          res.status(400);
          res.send("Something went wrong when updating data!");
        }
        res.status(200);
        res.send("Updated");
      }
    );
  }
};
/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * Delete a group if the id is valid
 */
exports.delete_team = (req, res, next) => {
  const id = req.params.teamId;
  Team.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * Deletes all the records from this collection
 */
exports.delete_all_records = (req, res, next) => {
  Team.deleteMany()
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
