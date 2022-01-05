const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const userController = require("../controllers/user");

router.post("/signup", checkAuth, userController.user_signup);

router.post("/login", userController.user_login);

router.get("/", checkAuth, userController.users_get_all);

router.patch("/:userId", checkAuth, userController.update_change_password);

router.delete("/:userId", checkAuth, userController.user_delete);

router.post("/token", checkAuth, userController.user_refresh_session);

module.exports = router;
