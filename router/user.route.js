
const { GetAllUser, CreateUser, GetOneUser, DeleteUser, UpdateUser, createAdmin, updateAdmin, adminList, checkAdmin, removeAdmin } = require('../controller/user.controller');
const express = require('express');
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

router.get('/', GetAllUser);
router.get('/:id', GetOneUser);
router.post('/', CreateUser);
router.put('/', UpdateUser);
router.delete('/:id', verifyToken, DeleteUser);
router.get('/admin', adminList);
router.put('/admin', createAdmin);
router.put('/admin', verifyToken, updateAdmin);
router.get('/admin/:email', checkAdmin);

module.exports = router;