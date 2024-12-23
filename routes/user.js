const express = require('express');
const { createUser, userLogin } = require('../controllers/userController');

const router = express.Router();

// signup
router.post('/', createUser);

// login
router.post('/login', userLogin);


module.exports = router;