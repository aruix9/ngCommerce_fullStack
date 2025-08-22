// const express = require('express')
// const {
//   getProductValidator,
//   createProductValidator,
//   updateProductValidator,
//   deleteProductValidator,
// } = require('../utils/validators/product.validator')

// const {
//   getProducts,
//   getProduct,
//   createProduct,
//   updateProduct,
//   deleteProduct,
//   uploadProductImages,
//   resizeProductImages,
// } = require('../controllers/product.controller')
// const authService = require('../controllers/auth.controller')
// const reviewsRoute = require('./reviewRoute')

// const router = express.Router()


// router.use('/:productId/reviews', reviewsRoute)

// router
//   .route('/')
//   .get(getProducts)
//   .post(
//     authService.protect,
//     authService.allowedTo('admin', 'manager'),
//     uploadProductImages,
//     resizeProductImages,
//     createProductValidator,
//     createProduct
//   )
// router
//   .route('/:id')
//   .get(getProductValidator, getProduct)
//   .put(
//     authService.protect,
//     authService.allowedTo('admin', 'manager'),
//     uploadProductImages,
//     resizeProductImages,
//     updateProductValidator,
//     updateProduct
//   )
//   .delete(
//     authService.protect,
//     authService.allowedTo('admin'),
//     deleteProductValidator,
//     deleteProduct
//   )

// module.exports = router