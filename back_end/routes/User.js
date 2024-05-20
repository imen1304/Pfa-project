const express = require("express");

const router = express.Router();

const UserController = require("../controllers/UserController");

router.post("/register", UserController.Register);

router.post("/verifyUser", UserController.VerifyUser);

router.post("/singin", UserController.singIn);

router.post("/delteOne", UserController.Delteuser);

router.get("/", UserController.getUsers);

module.exports = router;
