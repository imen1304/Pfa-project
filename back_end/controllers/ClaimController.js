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

exports.getClaims = async (req, res) => {
  const claims = await claimModel.find();

  res.send({ claims });
};

exports.updateClaim = async (req, res) => {
  const status = req.body.status;
  const claimId = req.body.claimId;
  const claims = await claimModel.updateOne(
    { _id: claimId },
    {
      $set: {
        status: status,
      },
    }
  );

  res.send({ success: true });
};
