const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      default: "email.gmail.com",
      require: true,
    },
    password: {
      type: String,
      default: "blabla",
      require: true,
    },
    name: {
      type: String,
      default: "foulan el foulani",
    },
    role: {
      type: String,
      default: "role",
    },
    account_status: {
      type: String,
      default: "pending",
    },
    application: {
      type: String,
      default: "application",
    },
  },
  {
    timestamps: {
      currentTime: () => Date.now(),
    },
  }
);

module.exports = mongoose.model("User", UserSchema);
