const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");

const teamsController = require("../controllers/team");

router.get("/", checkAuth, teamsController.get_all);

router.post("/", checkAuth, teamsController.create_metric);

router.get("/:teamId", checkAuth, teamsController.get_team);

router.patch("/:teamId", checkAuth, teamsController.update_team);

router.delete("/:teamId", checkAuth, teamsController.delete_team);

router.delete("/deleteall", checkAuth, teamsController.delete_all_records);

module.exports = router;
