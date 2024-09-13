const express = require("express");

const path = require("./util/path");

const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();

const sequelize = require("./util/database");

const dbManagementRoute = require("./routes/dbManagement");

const errorController = require("./controllers/error");

app.use(bodyParser.json());

app.use(cors());

app.use("/dbManagement", dbManagementRoute);


app.use(errorController.get404);

sequelize
  .sync()
  .then((res) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });


