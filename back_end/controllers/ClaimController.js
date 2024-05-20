const claimModel = require("../models/Claim");

const UserModel = require("../models/User");

exports.create = async (req, res) => {
  const userId = req.body.userId;
  const purchaseId = req.body.purchaseId;

  const user = await UserModel.findOne({ _id: userId });

  const newClaim = new claimModel();

  newClaim.description = req.body.description;
  newClaim.theft = req.body.theft;
  newClaim.user = user;
  newClaim.ansurance_contract = purchaseId;

  await newClaim.save();

  res.send({ success: true, claim: newClaim });
};
