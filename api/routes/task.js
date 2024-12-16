const express = require("express");
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const router = express.Router();
require("../swagger/task");

router.post("/", authMiddleware, taskController.create);

router.get("/all", authMiddleware, adminMiddleware, taskController.getAll);
router.get("/user/all/:userId", authMiddleware, taskController.getAllByUser);
router.get("/:id", authMiddleware, taskController.getById);
router.delete("/delete/:id", authMiddleware, taskController.delete);
router.post("/update/:id", authMiddleware, taskController.update);

module.exports = router;