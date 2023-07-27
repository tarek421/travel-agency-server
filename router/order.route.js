const express = require('express');
const { getAllOrder, creatOrder, getOrderByEmail, orderStatus } = require('../controller/order.controller');
const router = express.Router();



router.get('/', getAllOrder);
router.get('/:email', getOrderByEmail);
router.post('/', creatOrder);
router.put('/status', orderStatus);

module.exports = router;