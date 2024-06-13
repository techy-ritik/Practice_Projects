const express = require("express");

const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const sequelize = require("./util/database");

// const User = require("./models/user");

var cors = require("cors");

const app = express();

const userRoutes=require('./routes/user');

app.use(cors());

app.use(bodyParser.json());

app.use('/user',userRoutes);

// app.post("/user/add-user", async (req, res, next) => {
//   try {
//     const name = req.body.name;
//     const email = req.body.email;
//     const phonenumber = req.body.number;
//     // console.log(phonenumber);

//     const data = await User.create({
//       name: name,
//       email: email,
//       phonnumber: phonenumber,
//     });
//     res.status(201).json({
//       newUserDetail: data,
//     });
//   } catch (err) {
//     console.log("error in creating user", err);
//     res.status(500).json({
//       error: "user creation failed",
//     });
//   }
// });

// app.get("/user/add-user", async (req, res, next) => {
//   const users = await User.findAll();
//   res.status(200).json({ allUsers: users });
// });

// app.delete("/user/delete-user/:id", async (req, res, next) => {
//   try {

//     if(!req.params.id){
//         console.log('id is missing')
//         res.status(400).json({err:'Id is missing'})
//     }
//     // console.log('id is',req.params.id);
//     const uId = req.params.id;
//     console.log("uID is this",uId);
//     await User.destroy({ where: { id: uId } });
//     res.sendStatus(200);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "user deletion failed" });
//   }
// });



app.use(errorController.get404);

sequelize
  .sync()
  .then((res) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
