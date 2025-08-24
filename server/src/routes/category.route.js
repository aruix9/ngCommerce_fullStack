const express = require('express');

const {
    getCategoryValidator,
    createCategoryValidator,
    updateCategoryValidator,
    deleteCategoryValidator,
} = require('../utils/validators/category.validator');

const {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    uploadCategoryImage,
    resizeImage
} = require('../controllers/category.controller');

const {
    isLoggedIn,
    accessRouteAs
} = require("../middlewares/auth.middleware")

const subcategoriesRoute = require('./subCategory.route');

const router = express.Router();

// Nested route
router.use('/:categoryId/subcategories', subcategoriesRoute);

router
    .route('/')
    .get(getCategories)
    .post(
        isLoggedIn,
        accessRouteAs('admin', 'manager'),
        uploadCategoryImage,
        resizeImage,
        createCategoryValidator,
        createCategory
    );
router
  .route('/:id')
  .get(getCategoryValidator, getCategory)
  .put(
    isLoggedIn,
    accessRouteAs('admin', 'manager'),
    uploadCategoryImage,
    resizeImage,
    updateCategoryValidator,
    updateCategory
  )
  .delete(
    isLoggedIn,
    accessRouteAs('admin'),
    deleteCategoryValidator,
    deleteCategory
  );

module.exports = router;