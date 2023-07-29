const express = require('express');
const router = express.Router();
const { getAllDestination, getDestinationByTitle, createDestination, deleteDestination } = require('../controller/destination.controller');
var admin = require("firebase-admin");

router.get("/", getAllDestination);
router.get("/:title", getDestinationByTitle);
router.post("/", createDestination);
router.delete("/delete", deleteDestination);


module.exports = router;