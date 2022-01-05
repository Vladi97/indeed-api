const Metrics = require("../models/metric");
const mongoose = require("mongoose");

/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns all the information in this collection
 */
exports.get_all = (req, res, next) => {
  Metrics.find()
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        metrics: docs.map((doc) => {
          return {
            _id: doc._id,
            workedTickets: doc.workedTickets,
            workedHours: doc.workedHours,
            year: doc.year,
            month: doc.month,
            team: doc.team,
            weekEndingDay: doc.weekEndingDay,
            availableTime: doc.availableTime,
            verifiedTickets: doc.verifiedTickets,
            rejectedTickets: doc.rejectedTickets,
            user: doc.user,
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
  const metric = new Metrics({
    _id: new mongoose.Types.ObjectId(),
    workedTickets: req.body.workedTickets,
    workedHours: req.body.workedHours,
    year: req.body.year,
    month: req.body.month,
    team: req.body.team,
    weekEndingDay: req.body.weekEndingDay,
    availableTime: req.body.availableTime,
    verifiedTickets: req.body.verifiedTickets,
    rejectedTickets: req.body.rejectedTickets,
    user: req.body.user,
  });
  metric
    .save()
    .then((result) => {
      res.status(201).json({
        message: "metric created",
        createdDepartment: {
          _id: result._id,
          workedTickets: result.workedTickets,
          workedHours: result.workedHours,
          year: result.year,
          month: result.month,
          team: result.team,
          weekEndingDay: result.weekEndingDay,
          availableTime: result.availableTime,
          verifiedTickets: result.verifiedTickets,
          rejectedTickets: result.rejectedTickets,
          user: result.user,
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
exports.get_metric = (req, res, next) => {
  const id = req.params.metricId;
  Metrics.findById(id)
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          metric: doc.data,
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
exports.update_metric = (req, res, next) => {
  const id = req.params.metricId;
  if (mongoose.Types.ObjectId.isValid(id)) {
    Metrics.findOneAndUpdate(
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
exports.delete_metric = (req, res, next) => {
  const id = req.params.metricId;
  Metrics.deleteOne({ _id: id })
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
  Metrics.deleteMany()
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
