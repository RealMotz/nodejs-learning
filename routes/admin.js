const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.addProductView);
// router.get('/edit-product', adminController.editProductView);
router.get('/edit-product/:productId', adminController.editProductView);
router.get('/product-list', adminController.productListView);

// /admin/add-product => POST
router.post('/add-product', adminController.addProduct);
router.post('/delete-product', adminController.deleteProduct);
router.post('/edit-product', adminController.editProduct);

module.exports = router;