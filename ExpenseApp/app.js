const express = require("express");

const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();

const sequelize = require("./util/database");

const errorController = require("./controllers/error");

const expenseRoute=require("./routes/expense");

app.use(bodyParser.json());

app.use(cors());

app.use("/expense",expenseRoute);

app.use(errorController.get404);

sequelize
  .sync()
  .then((res) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
