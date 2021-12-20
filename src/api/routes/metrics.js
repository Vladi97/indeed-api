const express = require("express");
const router = express.Router();
//const checkAuth = require('../middleware/check-auth');

const metricsController = require("../controllers/metrics");

router.get("/", metricsController.get_all);

router.post("/", metricsController.create_metric);

router.get("/:departmentId", metricsController.get_metric);

router.patch("/:departmentId", metricsController.update_metric);

router.delete("/:departmentId", metricsController.delete_metric);

router.delete("/deleteall", metricsController.delete_all_records);

module.exports = router;
