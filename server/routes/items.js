/*GET	/api/items	Gets all the items in the DB*/

var express = require("express");
var router = express.Router();
const ItemModel = require("../models/Item");

/*GET	/api/items	Gets all the items in the DB*/
router.get("/", (req, res, next) => {
  ItemModel.find().then((itemDocuments) => {
    res.status(200).json(itemDocuments);
  });
});

//GET	/api/items/:id	Get one item in the DB

router.get("/:id", (req, res, next) => {
  ItemModel.findById(req.params.id).then((itemDocuments) => {
    res.status(200).json(itemDocuments);
  });
});

//POST	/api/items	Create an item in the DB	Requires auth.

router.post("/", (req, res, next) => {
  ItemModel.create(req.body).then((itemDocuments) => {
    res.status(201).json(itemDocuments);
  });
});

//PATCH	/api/items/:id	Update an item	Requires auth.

router.patch("/:id", (req, res, next) => {
  ItemModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((itemDocuments) => {
      res.status(200).json(itemDocuments);
    })
    .catch((error) => {
      next(error);
    });
});

//DELETE	/api/items/:id	Deletes an item	Requires auth.
router.delete("/:id", (req, res, next) => {
  ItemModel.findByIdAndRemove(req.params.id).then((itemDocuments) => {
    res.status(200).json(itemDocuments);
  });
});

module.exports = router;
