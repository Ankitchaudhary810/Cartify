const User = require('../models/user');
const jwtToken = require('jsonwebtoken');
const { expressjwt: jwt } = require("express-jwt");
const bcrypt = require('bcrypt');
SECRET1 = "LAJSF@#$%23#$%^#";

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout success"
  });
};

exports.signup = async (req, res) => {
  const { name, lastname, email, encry_password } = req.body;
  console.log(req.body);

  try {
    const saltRounds = 10;
    const hashed_password = await bcrypt.hash(encry_password, saltRounds);

    const user = new User({
      name,
      lastname,
      email,
      encry_password: hashed_password,
    });

    const savedUser = await user.save();
    res.status(200).json({
      user: savedUser,
      msg: 'User is saved',
    });
  } catch (error) {
    JSON.stringify(error);
    if (error.code === 11000) {
      return res.json({
        msg: "User is already in the database"
      });
    }
  }
};

exports.signin = async (req, res) => {
  const { email, encry_password } = req.body;
  const user = await User.findOne({ email }).lean();

  try {
    if (user == null) {
      return res.json({
        msg: "User is not found"
      });
    } else {
      if (await bcrypt.compare(encry_password, user.encry_password)) {
        // Create token
        const Token = jwtToken.sign({ _id: user._id }, process.env.SECRET);
        // Put token in the cookie
        res.cookie("token", Token, { expire: new Date() + 9999 });
        // Send response to front end
        const { _id, name, email, role } = user;
        return res.json({
          msg: "User found",
          num: 11,
          Token,
          user: {
            _id,
            name,
            email,
            role,
          },
        });
      } else {
        return res.json({
          msg: "Password is incorrect"
        });
      }
    }
  } catch (err) {
    return res.json({
      msg: err
    });
  }
};

// Protected routes
exports.isSignedIn = jwt({
  secret: SECRET1,
  algorithms: ["HS256"],
  userProperty: "auth",  
}
);

// Custom middleware
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  console.log("req.profile: in isAuthenticated ", req.profile);
  console.log("req.auth: ", req.auth);
  if (!checker) {
    return res.status(403).json({
      msg: "Access Denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role == 0) {
    return res.status(403).json({
      msg: "You are not an admin. Access denied"
    });
  }
  next();
};
