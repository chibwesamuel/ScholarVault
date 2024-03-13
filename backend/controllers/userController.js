const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");


const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"})
}

// register user
const registerUser = asyncHandler( async (req, res) => {
    const {name, email, password} = req.body

    // Validation
    if(!name || !email || !password) {
        res.status(400)
        throw new Error("Please fill in all required fields")
    }
    if (password.length < 6) {
        res.status(400)
        throw new Error("Enter a minimum of 6 characters")
    }

    // Check if user email exists
    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400)
        throw new Error("This email has already been registered")
    }

    // Create new user
    const user = await User.create({
        name,
        email,
        password,
    })

        // Generate token
        const token = generateToken(user._id);

        // Send HTTP-only cookies
        res.cookie("token", token, {
            path: "/",
            httpOnl: true,
            expires: new Date(Date.now() + 1000 * 86400), //1 day
            sameSite: "none",
            secure: true
        })

    if (user) {
        const { _id, name, email, photo, phone, bio} = user;
        res.status(201).json({
            _id,
            name,
            email,
            photo,
            phone,
            bio,
            token
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }
});

// Login user
const loginUser = asyncHandler (async (req, res) => {
    res.send("Login user")
});

module.exports = {
    registerUser,
    loginUser,
}