const express = require("express");
const { getAllRivew, createRivew } = require("../controller/rivew.controller");
const router = express.Router();

router.get("/", getAllRivew);
router.post("/", createRivew);

module.exports = router;