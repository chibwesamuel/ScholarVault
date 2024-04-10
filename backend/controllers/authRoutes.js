import { Router } from 'express'
const router = Router()
import { registerUser, loginUser, logout, getUser, loginStatus, updateUser, changePassword, forgotPassword, resetPassword } from '../controllers/userControllers'

// Register User
router.post('/register', registerUser)

// Login User
router.post('/login', loginUser)

// Logout User
router.get('/logout', logout)

// Get User Data
router.get('/user', getUser)

// Check Login Status
router.get('/loginStatus', loginStatus)

// Update User
router.put('/user', updateUser)

// Change Password
router.put('/changePassword', changePassword)

// Forgot Password
router.post('/forgotPassword', forgotPassword)

// Reset Password
router.put('/resetPassword/:resetToken', resetPassword)

export default router
