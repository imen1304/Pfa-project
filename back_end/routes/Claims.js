const express = require("express");

const router = express.Router();

const ClaimController = require("../controllers/ClaimController");

router.post("/create", ClaimController.create);

module.exports = router;
