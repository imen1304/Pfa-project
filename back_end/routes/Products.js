const express = require("express");

const router = express.Router();

const ProductController = require("../controllers/ProductController");

router.post("/create", ProductController.CreateProduct);

router.get("/", ProductController.getProducts);

router.post("/deleteone", ProductController.delteProduct);

module.exports = router;
