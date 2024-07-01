const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// User Schema and Model
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// Middleware to check if the user is authenticated
function checkAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/index.html');
    }
}

// Create User
router.post("/sign_up", async (req, res) => {
    console.log(req.body);
    const { name, email, gender, password } = req.body;
    try {
        const newUser = new User({ name, email, gender, password });
        await newUser.save();
        console.log("User created successfully!");
        req.session.user = newUser; // Automatically log in the user
        return res.redirect('/home.html');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating user");
    }
});

// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (user) {
            console.log("User logged in successfully!");
            req.session.user = user;
            return res.redirect('/home.html');
        } else {
            console.log("Invalid email or password");
            return res.status(400).send("Invalid email or password");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error logging in");
    }
});

// Logout
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect('/index.html');
});

// Protect routes
router.get('/home.html', checkAuthenticated);
router.get('/teachers.html', checkAuthenticated);
router.get('/reports.html', checkAuthenticated);
router.get('/add.html', checkAuthenticated);

module.exports = router;
