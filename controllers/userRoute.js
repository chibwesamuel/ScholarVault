const router = require('express').Router();
const { registerUser, loginUser, logout, getUser, loginStatus, updateUser, changePassword, forgotPassword, resetPassword } = require('./userController');
const protect = require('../middleWare/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logout);
router.get('/getuser', protect, getUser);
router.get('/loggedin', loginStatus);
router.patch('/updateuser', protect, updateUser);
router.patch('/changepassword', protect, changePassword);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resetToken', resetPassword);

module.exports = router;
