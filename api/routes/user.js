const express = require("express");
const { create, } = require("../controllers/userController");
const router = express.Router();

router.post("/register", create);

module.exports = router;
