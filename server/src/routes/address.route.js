// const express = require('express');

// const authService = require('../controllers/auth.controller');

// const {
//   addAddress,
//   removeAddress,
//   getLoggedUserAddresses,
// } = require('../controllers/address.controller');

// const router = express.Router();

// router.use(authService.protect, authService.allowedTo('user'));

// router.route('/').post(addAddress).get(getLoggedUserAddresses);

// router.delete('/:addressId', removeAddress);

// module.exports = router;