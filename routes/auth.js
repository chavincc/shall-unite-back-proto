const express = require("express");
const router = express.Router();

const {
  loginController,
  logoutController,
  getAuthController,
} = require("../controllers/auth");

router.post("/login", loginController);
router.get("/logout", logoutController);
router.get("/", getAuthController);

module.exports = router;
