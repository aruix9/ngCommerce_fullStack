const express = require('express');

const {
  createReviewValidator,
  updateReviewValidator,
  getReviewValidator,
  deleteReviewValidator,
} = require('../utils/validators/review.validator');

const {
  getReview,
  getReviews,
  createReview,
  updateReview,
  deleteReview,
  createFilterObj,
  setProductIdAndUserIdToBody,
} = require('../controllers/review.controller');

const {
    isLoggedIn,
    accessRouteAs
} = require("../middlewares/auth.middleware")

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(createFilterObj, getReviews)
  .post(
    isLoggedIn,
    accessRouteAs('user'),
    setProductIdAndUserIdToBody,
    createReviewValidator,
    createReview
  );
router
  .route('/:id')
  .get(getReviewValidator, getReview)
  .put(
    isLoggedIn,
    accessRouteAs('user'),
    updateReviewValidator,
    updateReview
  )
  .delete(
    isLoggedIn,
    accessRouteAs('user', 'manager', 'admin'),
    deleteReviewValidator,
    deleteReview
  );

module.exports = router;