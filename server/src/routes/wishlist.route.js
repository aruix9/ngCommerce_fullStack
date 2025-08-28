const express = require('express');

const {
    isLoggedIn,
    accessRouteAs
} = require("../middlewares/auth.middleware")

const {
  addProductToWishlist,
  removeProductFromWishlist,
  getLoggedUserWishlist,
} = require('../controllers/wishlist.controller');

const router = express.Router();

router.use(isLoggedIn, accessRouteAs('user'));

router.route('/').post(addProductToWishlist).get(getLoggedUserWishlist);

router.delete('/:productId', removeProductFromWishlist);

module.exports = router;