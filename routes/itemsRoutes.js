const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

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

// Middleware to check if the user is authenticated
function checkAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/index.html');
    }
}

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

// Create Item
router.post("/add", checkAuthenticated, upload.single('productImage'), async (req, res) => {
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

// Get item count
router.get("/api/item-count", checkAuthenticated, async (req, res) => {
    try {
        const count = await Item.countDocuments();
        res.json({ count });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching item count");
    }
});

// Get all items
router.get("/api/items", checkAuthenticated, async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching items");
    }
});

module.exports = router;
