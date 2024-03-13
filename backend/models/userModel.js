const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name can't be blank"]
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter an email"
        ]
    },
    password: {
        type: String,
        required: [true, "Password can't be blank"],
        minLength: [6, "Enter atleast 6 characters"],
        //maxLength: [25, "Enter maximum of 25 characters"]
    },
    photo: {
        type: String,
        required: [true, "Add a photo"],
        default: "https://i.ibb.co/4pDNDk1/avatar.png"
    },
    phone: {
        type: String,
        default: "+260"
    },
    bio: {
        type: String,
        maxLength: [250, "Enter maximum of 250 characters"],
        default: "bio"
    }
}, {
    timestamps: true,
})

const User = mongoose.model("User", userSchema)
module.exports = User