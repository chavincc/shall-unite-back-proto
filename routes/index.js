const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Shall Unite prototype server").status(200);
});

module.exports = router;
