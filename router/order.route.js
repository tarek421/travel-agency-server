const express = require('express');
const { getAllOrder, creatOrder, getOrderByEmail, orderStatus } = require('../controller/order.controller');
const router = express.Router();
var admin = require("firebase-admin");

const verifyToken = async (req, res, next) => {
    if (req.headers?.authorization?.startsWith("Bearer ")) {
        const token = req.headers.authorization.split(" ")[1];
        try {
            const decodedUser = await admin.auth().verifyIdToken(token);
            req.decodedEmail = decodedUser.email;
            next();
        } catch { }
    }

};


router.get('/', getAllOrder);
router.get('/:email', getOrderByEmail);
router.post('/', creatOrder);
router.put('/status', verifyToken, orderStatus);

module.exports = router;