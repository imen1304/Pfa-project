const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    price: {
      type: String,
      default: "email.gmail.com",
      require: true,
    },
    image: {
      type: String,
      default: "foulan el foulani",
    },
    description: {
      type: String,
      default: "role",
    },
    inStock: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "color",
    },
    title: {
      type: String,
      default: "title",
    },
    category: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: {
      currentTime: () => Date.now(),
    },
  }
);

module.exports = mongoose.model("Product", ProductSchema);
