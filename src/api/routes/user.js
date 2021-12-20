const express = require("express");
const router = express.Router();
//const checkAuth = require('../middleware/check-auth');
const UserController = require("../controllers/user");

router.post("/signup", UserController.user_signup);

router.post("/login", UserController.user_login);

router.get("/", UserController.users_get_all);

router.patch("/:userId", /*checkAuth,*/ UserController.update_change_password);

router.delete("/:userId", UserController.user_delete);

router.post("/token", UserController.user_refresh_session);

module.exports = router;
