var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect();

var db = mongoose.connection;
db.on('error', () => console.log("Error in connecting to database"));
db.once('open', () => console.log("Connected to database"));

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Signup route
app.post("/sign_up", async (req, res) => {
    console.log(req.body); // Log the request body

    var { name, email, gender, password } = req.body;

    try {
        const newUser = new User({
            name,
            email,
            gender,
            password
        });
        await newUser.save();
        console.log("User created successfully!");
        return res.redirect('/home.html');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating user");
    }
});

// Login route
app.post("/login", async (req, res) => {
    var { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password });
        if (user) {
            console.log("User logged in successfully!");
            return res.redirect('/home.html'); // Redirect to home after successful login
        } else {
            console.log("Invalid email or password");
            return res.status(400).send("Invalid email or password");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error logging in");
    }
});

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    });
    return res.redirect('index.html');
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
