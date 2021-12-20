const express = require("express");
const router = express.Router();
//const checkAuth = require('../middleware/check-auth');
const userController = require("../controllers/user");

router.post("/signup", userController.user_signup);

router.post("/login", userController.user_login);

router.get("/", userController.users_get_all);

router.patch("/:userId", /*checkAuth,*/ userController.update_change_password);

router.delete("/:userId", userController.user_delete);

router.post("/token", userController.user_refresh_session);

module.exports = router;
