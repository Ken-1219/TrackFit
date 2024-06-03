const express = require('express');
//controller function
const { loginUser, signupUser } = require('../controllers/userController');

const router = express.Router();

//login route -->Post request
router.post('/login', loginUser);


//signup route -->Post request
router.post('/signup', signupUser);


module.exports = router;