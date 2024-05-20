const mongoose = require("mongoose");

const ClaimSchema = new mongoose.Schema(
  {
    user: {
      type: Object,
    },
    description: {
      type: String,
      default: "role",
    },
    theft: {
      type: Boolean,
      default: false,
    },
    purchase_id: {
      type: String,
    },
  },
  {
    timestamps: {
      currentTime: () => Date.now(),
    },
  }
);

module.exports = mongoose.model("Claim", ClaimSchema);
