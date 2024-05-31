const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect('mongodb+srv://smchibwe:smchibwe@cluster0.zl18dpk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/scholarvault', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', () => console.log("Error in connecting to database"));
db.once('open', () => console.log("Connected to database"));

// Session setup
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: '' }),
    cookie: { maxAge: 24 * 60 * 60 * 1000 } 
}));

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// User Schema and Model
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// Item Schema and Model
const itemSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    serialNumber: { type: String, required: false },
    productDetails: { type: String, required: true },
    productPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
    productImage: { type: String, required: false }
});
const Item = mongoose.model('Item', itemSchema);

// Teacher Schema and Model
const teacherSchema = new mongoose.Schema({
    surname: { type: String, required: true },
    firstName: { type: String, required: true },
    tsNumber: { type: Number, required: false },
    gender: { type: String, required: true },
    qualification: { type: String, required: false },
    specialization: { type: String, required: true }
});
const Teacher = mongoose.model('Teacher', teacherSchema);

// Middleware to check if the user is authenticated
function checkAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/index.html');
    }
}

// Create User
app.post("/sign_up", async (req, res) => {
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
app.post("/login", async (req, res) => {
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
app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect('/index.html');
});

// Protect routes
app.get('/home.html', checkAuthenticated);
app.get('/teachers.html', checkAuthenticated);
app.get('/reports.html', checkAuthenticated);
app.get('/add.html', checkAuthenticated);

// Create Item
app.post("/add", checkAuthenticated, upload.single('productImage'), async (req, res) => {
    console.log(req.body);
    const { productName, serialNumber, productDetails, productPrice, quantity } = req.body;
    const productImage = req.file ? '/uploads/' + req.file.filename : null;
    try {
        const newItem = new Item({ productName, serialNumber, productDetails, productPrice, quantity, productImage });
        await newItem.save();
        console.log("Item created successfully!");
        return res.redirect('/add.html');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating item");
    }
});

// Create Teacher
app.post("/add_teacher", checkAuthenticated, async (req, res) => {
    console.log(req.body);
    const { surname, firstName, tsNumber, gender, qualification, specialization } = req.body;
    try {
        const newTeacher = new Teacher({ surname, firstName, tsNumber, gender, qualification, specialization });
        await newTeacher.save();
        console.log("Teacher created successfully!");
        return res.redirect('/teachers.html');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating teacher");
    }
});

// Get teacher count
app.get("/api/teacher-count", checkAuthenticated, async (req, res) => {
    try {
        const count = await Teacher.countDocuments();
        res.json({ count });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching teacher count");
    }
});

// Get teacher count by gender
app.get("/api/teacher-gender-count", checkAuthenticated, async (req, res) => {
    try {
        const maleCount = await Teacher.countDocuments({ gender: 'Male' });
        const femaleCount = await Teacher.countDocuments({ gender: 'Female' });
        res.json({ male: maleCount, female: femaleCount });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching teacher gender count");
    }
});

// Get item count
app.get("/api/item-count", checkAuthenticated, async (req, res) => {
    try {
        const count = await Item.countDocuments();
        res.json({ count });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching item count");
    }
});

// Get all teachers
app.get("/api/teachers", checkAuthenticated, async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.json(teachers);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching teachers");
    }
});

// Get all items
app.get("/api/items", checkAuthenticated, async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching items");
    }
});

// Serve the main page
app.get("/", (req, res) => {
    res.set({ "Allow-access-Allow-Origin": '*' });
    return res.redirect('index.html');
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
