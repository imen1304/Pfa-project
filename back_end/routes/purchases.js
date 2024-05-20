const express = require("express");

const router = express.Router();

const PurchaseController = require("../controllers/PurchaseController");

router.post("/create", PurchaseController.create);

router.post("/getbyuserid", PurchaseController.getPurchaseByUserId);

module.exports = router;
