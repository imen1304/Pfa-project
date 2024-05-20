const mongoose = require("mongoose");

const InsuranceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "title",
    },
    price: {
      type: String,
      default: "",
      require: true,
    },
    description: {
      type: String,
      default: "role",
    },
    theft_protection: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      currentTime: () => Date.now(),
    },
  }
);

module.exports = mongoose.model("Insurance", InsuranceSchema);
