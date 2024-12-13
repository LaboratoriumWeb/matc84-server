const express = require("express");
const { create, } = require("../controllers/taskController");
const router = express.Router();

router.post("/createTask", create);

module.exports = router;
