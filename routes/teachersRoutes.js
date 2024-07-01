const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

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

// Create Teacher
router.post("/add_teacher", checkAuthenticated, async (req, res) => {
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
router.get("/api/teacher-count", checkAuthenticated, async (req, res) => {
    try {
        const count = await Teacher.countDocuments();
        res.json({ count });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching teacher count");
    }
});

// Get teacher count by gender
router.get("/api/teacher-gender-count", checkAuthenticated, async (req, res) => {
    try {
        const maleCount = await Teacher.countDocuments({ gender: 'Male' });
        const femaleCount = await Teacher.countDocuments({ gender: 'Female' });
        res.json({ male: maleCount, female: femaleCount });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching teacher gender count");
    }
});

// Get all teachers
router.get("/api/teachers", checkAuthenticated, async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.json(teachers);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching teachers");
    }
});

module.exports = router;
