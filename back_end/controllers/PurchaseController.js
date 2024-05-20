const Purchase = require("../models/Purchase");
const purchaseModel = require("../models/Purchase");

const insuranceModel = require("../models/Insurance");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const userModel = require("../models/User");

exports.create = async (req, res) => {
  //const insuranceId = req.body.insuranceId;

  const { insuranceId, name, email, begin_date, end_date, price, productId } =
    req.body;

  // check if email exists

  const testUser = await userModel.findOne({ email: email });

  if (testUser) {
    res.send({ message: "user already registred" });
  } else {
    const insurance = await insuranceModel.findById(insuranceId);

    const password = "azerty";

    bcrypt.hash(password, saltRounds, async function (err, hash) {
      // Store hash in your password DB.
      const newUser = new userModel();
      newUser.email = email;
      newUser.name = name;
      newUser.application = "N/A";
      newUser.role = "customer";
      newUser.account_status = "accepted";

      newUser.password = hash;
      await newUser.save();
      const purchase = new purchaseModel();

      purchase.insurance = insurance;
      purchase.begin_date = new Date(begin_date);
      purchase.end_date = new Date(end_date);
      purchase.price = price;
      purchase.user = newUser;
      purchase.product = productId;

      await purchase.save();

      res.send({
        success: true,
        purchase: purchase,
        password: password,
        email: email,
      });
    });
  }
};
