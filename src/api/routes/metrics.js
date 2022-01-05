const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");

const metricsController = require("../controllers/metrics");

router.get("/", checkAuth, metricsController.get_all);

router.post("/", checkAuth, metricsController.create_metric);

router.get("/:metricId", checkAuth, metricsController.get_metric);

router.patch("/:metricId", checkAuth, metricsController.update_metric);

router.delete("/:metricId", checkAuth, metricsController.delete_metric);

router.delete("/deleteall", checkAuth, metricsController.delete_all_records);

module.exports = router;
