const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema(
  {
    product: {
      type: String,
      default: "product ID",
    },
    user: {
      type: Object,
    },
    insurance: {
      type: Object,
    },
    price: {
      type: String,
      default: 0,
    },
    begin_date: {
      type: Date,
    },
    end_date: {
      type: Date,
    },
  },
  {
    timestamps: {
      currentTime: () => Date.now(),
    },
  }
);

module.exports = mongoose.model("Purchase", PurchaseSchema);
