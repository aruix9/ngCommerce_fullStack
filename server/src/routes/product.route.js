const express = require('express')
const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require('../utils/validators/product.validator')

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  resizeProductImages,
} = require('../controllers/product.controller')

const {
    isLoggedIn,
    accessRouteAs
} = require("../middlewares/auth.middleware")

const reviewsRoute = require('./review.route')

const router = express.Router()


router.use('/:productId/reviews', reviewsRoute)

router
  .route('/')
  .get(getProducts)
  .post(
    isLoggedIn,
    accessRouteAs('admin', 'manager'),
    uploadProductImages,
    resizeProductImages,
    createProductValidator,
    createProduct
  )
router
  .route('/:id')
  .get(getProductValidator, getProduct)
  .put(
    isLoggedIn,
    accessRouteAs('admin', 'manager'),
    uploadProductImages,
    resizeProductImages,
    updateProductValidator,
    updateProduct
  )
  .delete(
    isLoggedIn,
    accessRouteAs('admin'),
    deleteProductValidator,
    deleteProduct
  )

module.exports = router