const User = require('../models/user');


exports.postAddUser= async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const phonenumber = req.body.number;
    // console.log(phonenumber);

    const data = await User.create({
      name: name,
      email: email,
      phonnumber: phonenumber,
    });
    res.status(201).json({
      newUserDetail: data,
    });
  } catch (err) {
    console.log("error in creating user", err);
    res.status(500).json({
      error: "user creation failed",
    });
  }
};

exports.getUser= async (req, res, next) => {
  const users = await User.findAll();
  res.status(200).json({ allUsers: users });
};

exports.deleteUser = async (req, res, next) => {
  try {
    if (!req.params.id) {
      console.log("id is missing");
      res.status(400).json({ err: "Id is missing" });
    }
    // console.log('id is',req.params.id);
    const uId = req.params.id;
    console.log("uID is this", uId);
    await User.destroy({ where: { id: uId } });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "user deletion failed" });
  }
};
