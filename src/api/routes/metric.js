const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");

const metricController = require("../controllers/metric");

router.get("/", checkAuth, metricController.get_all);

router.post("/", checkAuth, metricController.create_metric);

router.get("/:metricId", checkAuth, metricController.get_metric);

router.patch("/:metricId", checkAuth, metricController.update_metric);

router.delete("/:metricId", checkAuth, metricController.delete_metric);

router.delete("/deleteall", checkAuth, metricController.delete_all_records);

module.exports = router;
