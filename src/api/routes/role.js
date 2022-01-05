const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");

const roleController = require("../controllers/role");

router.get("/", checkAuth, roleController.get_all);

router.post("/", checkAuth, roleController.create_metric);

router.get("/:teamId", checkAuth, roleController.get_role);

router.patch("/:teamId", checkAuth, roleController.update_role);

router.delete("/:teamId", checkAuth, roleController.delete_role);

router.delete("/deleteall", checkAuth, roleController.delete_all_records);

module.exports = router;
