const express = require('express');
const {
    isLoggedIn,
    accessRouteAs
} = require("../middlewares/auth.middleware")
const {
} = require("../middlewares/uploadImage.middleware")
const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require('../utils/validators/brand.validator');

const {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
  uploadBrandImage,
  resizeImage
} = require('../controllers/brand.controller');

const router = express.Router();

// Admin
router
  .route('/')
  .post(
      isLoggedIn,
      accessRouteAs('admin', 'manager'),
      uploadBrandImage,
      resizeImage,
      createBrandValidator,
      createBrand
    )
    .get(getBrands)

router
  .route('/:id')
  .get(getBrandValidator, getBrand)
  .put(
    isLoggedIn,
    accessRouteAs('admin', 'manager'),
    uploadBrandImage,
    resizeImage,
    updateBrandValidator,
    updateBrand
  )
  .delete(
    isLoggedIn,
    accessRouteAs('admin'),
    deleteBrandValidator,
    deleteBrand
  );

module.exports = router;