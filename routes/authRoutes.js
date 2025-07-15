const express = require('express');
const { register, logout } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', register);
router.post('/signin');
router.post('/logout', logout);