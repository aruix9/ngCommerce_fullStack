const express = require('express');
const {signupValidator, loginValidator} = require("../utils/validators/auth.validator")

const {
    login,
    signup,
    resetPassword,
    forgotPassword,
    verifyPassResetCode
} = require('../controllers/auth.controller');

const router = express.Router();

router.post('/signup', signupValidator, signup);
router.post('/login', loginValidator, login);
router.post('/forgotPassword', forgotPassword);
router.post('/verifyResetCode', verifyPassResetCode);
router.put('/resetPassword', resetPassword);

module.exports = router;