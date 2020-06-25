const express = require("express");
const router = express.Router();

const { loginController, logoutController } = require("../controllers/auth");

router.post("/login", loginController);
router.get("/logout", logoutController);

module.exports = router;
