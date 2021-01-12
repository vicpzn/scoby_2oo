const express = require("express");
const router = express.Router();
const UserModel = require("./../models/User");

router.get("me/:id", (req, res, next) => {
  UserModel.findById(req.params.id)
    .then((userDocument) => {
      res.status(200).json(userDocument);
    })
    .catch((error) => {
      next(error);
    });
});
router.patch("/me/:id", async (req, res, next) => {
  UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((userDocument) => {
      res.status(200).json(userDocument);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
