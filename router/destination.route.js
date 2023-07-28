const express = require('express');
const router = express.Router();
const { getAllDestination, getDestinationByTitle, createDestination, deleteDestination } = require('../controller/destination.controller');
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

router.get("/", getAllDestination);
router.get("/:title", getDestinationByTitle);
router.post("/", createDestination);
router.delete("/delete", verifyToken, deleteDestination);


module.exports = router;