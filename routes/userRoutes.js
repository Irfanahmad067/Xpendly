const express = require('express')
const router = express.Router()
const User = require('../models/User')


router.post('/login', async (req, res) => {
    console.log("req.body", req.body)
    try{
        const result = await User.findOne({email: req.body.email});
        if (result && result.password === req.body.password) {
            res.send(result)
        } else {
          res.status(500).json({ message: "Invalid Credentials" });
        }
    } catch (error) {
        console.log("error111", error)
        res.status(500).json(error)
    }

})

router.post("/register", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
   const newUser = new User(req.body);
   await newUser.save();
   res.send('User Registered Successfully');
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;