const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const upload = require('../middleware/upload');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const cookie = require("cookie-parser")


// router.post('/signup', upload.single('profilePic'), async (req, res) => {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     try {
//         const user = new User({
//             userName: req.body.userName,
//             email: req.body.email,
//             password: hashedPassword,
//             profilePic: req.file.filename
//         })
        
//         const response = await user.save();
//         if (response) {
//             res.status(200).json({ message: 'User registered successfully' });
//         } else {
//             res.status(500).json({ error: 'Failed to register user' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// })

// Login

router.post('/login', upload.none(), async (req, res) => {
    console.log("Incoming request body:", req.body); // Log request body
    
    try {
        if (!req.body.email || !req.body.password) {
            console.log("Missing email or password in request body.");
            return res.status(400).json("Credentials not filled");
        }

        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            console.log("User not found for email:", req.body.email);
            return res.status(404).json('User not found');
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (validPassword && user) {
            console.log("Login Successful");
          const token =  jwt.sign({id: user._id}, process.env.SecrectKey,{expiresIn:"1d"})
          const tenMinutes = 10 * 60 * 1000;
          res.cookie("token", token, { maxAge: tenMinutes, httpOnly: true });
          
          return res.status(200).json({
            message: 'Login Successful',
            userId: user._id
        });
        } else {
            console.log("Invalid credentials");
            return res.status(401).json('Invalid credentials');
        }
    } catch (error) {
        console.error("Error in login:", error);
        return res.status(500).json("Server Error" );
    }
});

// Logout
router.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json("Logged out Successfully");
  });

  // Admin Page work

router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("userName profilePic");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // ✅ Ensure full image URL is sent
        const BASE_URL = "http://localhost:5000";
        res.json({
            userName: user.userName,
            profilePic: user.profilePic ? `${BASE_URL}/uploads/${user.profilePic}` : null,
        });
      
    } catch (error) {
        console.error(error);
        res.status(500).json("Server Error");
    }
});



module.exports = router;