const express = require("express");

const router = express.Router();

const ClaimController = require("../controllers/ClaimController");

router.post("/create", ClaimController.create);

router.get("/", ClaimController.getClaims);

router.post("/updateone", ClaimController.updateClaim);

module.exports = router;
