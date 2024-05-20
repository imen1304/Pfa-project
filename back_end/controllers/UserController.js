const User = require("../models/User");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.Register = async (req, res) => {
  const { email, password, name, role, application } = req.body;

  const testUser = await User.findOne({ email: email });

  console.log("user exists ");

  if (testUser) {
    res.send({ message: "user already registred" });
  } else {
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      // Store hash in your password DB.
      const newUser = new User();
      newUser.email = email;
      newUser.name = name;
      newUser.application = application;
      newUser.role = role;

      newUser.password = hash;
      await newUser.save().then((userSaved) => {
        res.send({ message: "Success", "new User ": userSaved });
      });
    });
  }
};

exports.singIn = async (req, res) => {
  const { email, password } = req.body;

  const userFound = await User.findOne({
    email: email,
    account_status: "accepted",
  });

  if (userFound) {
    bcrypt.compare(password, userFound.password, function (err, result) {
      // if res == true, password matched
      // else wrong password
      if (result) {
        res.status(200).json({
          success: true,
          user: userFound,
        });
      } else {
        res.status(200).json({
          success: false,
          message: "Password is incorrect.",
        });
      }
    });
  } else {
    res.status(200).send({ message: "user not found" });
  }
};

exports.getUsers = async (req, res) => {
  const users = await User.find({ role: { $ne: "admin" } }).sort({
    createdAt: -1,
  });

  res.send({ users });
};

exports.VerifyUser = async (req, res) => {
  const userId = req.body.userId;
  const accepted = req.body.accepted; // boolean

  if (accepted) {
    await User.updateOne(
      { _id: userId },
      {
        $set: {
          account_status: "accepted",
        },
      }
    );
  } else {
    await User.updateOne(
      { _id: userFound._id },
      {
        $set: {
          account_status: "rejected",
        },
      }
    );
  }

  res.send({ message: "Profile updated" });
};

exports.Delteuser = async (req, res) => {
  const userId = req.body.userId;

  const delteUser = await User.deleteOne({ _id: userId });
  console.log("delte user ", delteUser);

  res.send({ message: "user deleted" });
};
