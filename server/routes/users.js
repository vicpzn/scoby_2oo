const express = require("express");
const router = express.Router();

router.patch("/me", function (req, res, next) {
  console.log(req.session.currentUser);
});

router.get("/me", function (req, res, next) {
  console.log("hello");
});

module.exports = router;
