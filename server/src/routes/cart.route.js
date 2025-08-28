const express = require('express')

const {
  addProductToCart,
  getLoggedUserCart,
  removeSpecificCartItem,
  clearCart,
  updateCartItemQuantity,
  applyCoupon,
} = require('../controllers/cart.controller')

const {
    isLoggedIn,
    accessRouteAs
} = require("../middlewares/auth.middleware")

const router = express.Router()

router.use(isLoggedIn, accessRouteAs('user'))
router
  .route('/')
  .post(addProductToCart)
  .get(getLoggedUserCart)
  .delete(clearCart)

router.put('/applyCoupon', applyCoupon)

router
  .route('/:itemId')
  .put(updateCartItemQuantity)
  .delete(removeSpecificCartItem)

module.exports = router