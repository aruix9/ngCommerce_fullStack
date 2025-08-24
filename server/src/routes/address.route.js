const express = require('express');

const {
    isLoggedIn,
    accessRouteAs
} = require('../middlewares/auth.middleware');

const {
  addAddress,
  removeAddress,
  getLoggedUserAddresses,
} = require('../controllers/address.controller');

const router = express.Router();

router.use(isLoggedIn, accessRouteAs('user'));

router.route('/').post(addAddress).get(getLoggedUserAddresses);

router.delete('/:addressId', removeAddress);

module.exports = router;