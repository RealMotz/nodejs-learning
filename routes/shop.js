const path = require("path")

const express = require('express');
const controller = require('../controllers/shopController');
const router = express.Router();

router.get('/', controller.getIndex);
router.get('/cart', controller.getCart);
router.get('/checkout', controller.getCheckoutView);
router.get('/orders', controller.getOrders);
router.get('/products', controller.getProducts);
router.get('/products/:productId', controller.getProduct);

router.post('/cart', controller.addItemToCart)
router.post('/cart-delete-item', controller.deleteCartItem);
module.exports = router;
