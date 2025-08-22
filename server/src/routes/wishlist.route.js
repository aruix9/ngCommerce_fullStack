// const express = require('express');

// const authService = require('../controllers/auth.controller');

// const {
//   addProductToWishlist,
//   removeProductFromWishlist,
//   getLoggedUserWishlist,
// } = require('../controllers/wishlist.controller');

// const router = express.Router();

// router.use(authService.protect, authService.allowedTo('user'));

// router.route('/').post(addProductToWishlist).get(getLoggedUserWishlist);

// router.delete('/:productId', removeProductFromWishlist);

// module.exports = router;