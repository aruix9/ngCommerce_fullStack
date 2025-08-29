const express = require('express');
const {
  createCashOrder,
  findAllOrders,
  findSpecificOrder,
  filterOrderForLoggedUser,
  updateOrderToPaid,
  updateOrderToDelivered,
  checkoutSession,
} = require('../controllers/order.controller');

const {
    isLoggedIn,
    accessRouteAs
} = require("../middlewares/auth.middleware")

const router = express.Router();

router.use(isLoggedIn);

router.get(
  '/checkout-session/:cartId',
  accessRouteAs('user'),
  checkoutSession
);

router.route('/:cartId').post(accessRouteAs('user'), createCashOrder);
router.get(
  '/',
  accessRouteAs('user', 'admin', 'manager'),
  filterOrderForLoggedUser,
  findAllOrders
);
router.get('/:id', findSpecificOrder);

router.put(
  '/:id/pay',
  accessRouteAs('admin', 'manager'),
  updateOrderToPaid
);
router.put(
  '/:id/deliver',
  accessRouteAs('admin', 'manager'),
  updateOrderToDelivered
);

module.exports = router;