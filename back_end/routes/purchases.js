const express = require("express");

const router = express.Router();

const PurchaseController = require("../controllers/PurchaseController");

router.post("/create", PurchaseController.create);

module.exports = router;
