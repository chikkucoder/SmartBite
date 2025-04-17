const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "MynameisEndtoEndyoutubechannel1$#"
//const { JsonWebTokenError } = require('jsonwebtoken');

router.post("/creatuser", [
  body('email').isEmail(),
  body('name').isLength({ min: 5 }),
  body('password', 'Incorrect Password').isLength({ min: 5 })]

  , async (req, res) => {
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
//hash password genrate
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt)

    try {
      await User.create({
        name: req.body.name,
        password: secPassword,   // save in mongo secpassword
        email: req.body.email,
        location: req.body.location
      }).then(res.json({ success: true }));

    } catch (error) {

      console.log(error)
      res.json({ success: false });

    }
  })

// for login


router.post(
  "/loginuser",
  [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").isLength({ min: 5 }).withMessage("Password must be at least 5 characters long"),
  ],
  async (req, res) => {
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });

      if (!userData) {
        return res.status(400).json({ errors: [{ msg: "Invalid email or password" }] });
      }

      // Compare passwords
      const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
      if (!pwdCompare) {
        return res.status(400).json({ errors: [{ msg: "Invalid email or password" }] });
      }

      // Generate JWT token
      const data = {
        user: {
          id: userData.id,
        },
      };

      const authToken = jwt.sign(data, jwtSecret, { expiresIn: "1h" });

      return res.json({ success: true, authToken });
    } catch (error) {
      console.error("Login Error:", error);
      return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

module.exports = router;
