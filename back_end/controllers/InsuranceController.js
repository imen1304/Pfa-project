const InsuranceModel = require("../models/Insurance");

exports.create = async (req, res) => {
  const insurance = new InsuranceModel(req.body);

  await insurance.save();

  res.send({ message: "saved", insurance: insurance, success: true });
};

exports.getAll = async (req, res) => {
  const insurances = await InsuranceModel.find();

  res.send({ insurances });
};

exports.updateOne = async (req, res) => {
  const insuranceId = req.body.insuranceId;

  const { title, price, description, theft_protection } = req.body;

  const updatedInsurance = await InsuranceModel.updateOne(
    { _id: insuranceId },
    {
      $set: {
        title: title,
        price: price,
        description: description,
        theft_protection: theft_protection,
      },
    }
  );

  console.log("updated ", updatedInsurance);

  res.send({ message: "insurance updated", success: true });
};

exports.deleteOne = async (req, res) => {
  const insuranceId = req.body.insuranceId;

  const insuranceDeleted = await InsuranceModel.deleteOne({ _id: insuranceId });
  console.log("delte insirance ", insuranceDeleted);

  res.send({ message: "insurance deleted" });
};
