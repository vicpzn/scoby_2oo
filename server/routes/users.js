const express = require("express");
const router = express.Router();
const UserModel = require("./../models/User");

router.get("/me", async (req, res, next) => {
  try {
    const currentUser = await UserModel.findById(req.session.currentUser);
    console.log(currentUser);
  } catch (error) {
    next(error);
  }
});

router.patch("/me", async (req, res, next) => {
  try {
    const currentUser = await UserModel.findByIdAndUpdate(
      req.session.currentUser,
      req.body
    );
    console.log(currentUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
