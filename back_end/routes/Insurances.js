const express = require("express");

const router = express.Router();

const InsuranceController = require("../controllers/InsuranceController");

router.post("/create", InsuranceController.create);

router.post("/delteone", InsuranceController.deleteOne);

router.post("/updateone", InsuranceController.updateOne);

router.get("/", InsuranceController.getAll);

module.exports = router;
