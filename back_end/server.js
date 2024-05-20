const express = require("express");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const config = require("./config/DB.js");

const app = express();

const port = 5000;

const UserRouter = require("./routes/User.js");

const ProductRouter = require("./routes/Products.js");

const InsuranceRouter = require("./routes/Insurances.js");

const purchaseRouter = require("./routes/purchases.js");

const claimRouter = require("./routes/Claims.js");

var path = require("path");
// node modules

app.use(bodyParser.json());

app.use("/users", UserRouter);

app.use("/products", ProductRouter);

app.use("/insurance", InsuranceRouter);

app.use("/purchase", purchaseRouter);

app.use("/claim", claimRouter);
mongoose.Promise = global.Promise;

app.use(express.static(path.join(__dirname, "/uploads")));
app.use("/uploads", express.static("./uploads"));

mongoose.connect(config.DB, {}).then(
  (x) => {
    console.log("Database is connected");
  },
  (err) => {
    console.log("Can not connect to the database " + err);
  }
);

app.get("/", (req, res) => {
  res.send("welcome to my server project pfa ");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
