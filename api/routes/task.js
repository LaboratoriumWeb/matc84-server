const express = require("express");
const taskController = require("../controllers/taskController");
const router = express.Router();

router.post("/task",taskController.create);
router.get("/task/:id",taskController.getById);
router.get("/allUserTasks/:userId",taskController.getAllByUser);
router.get("/allTasks",taskController.getAll);
router.post("/updateTask/:id",taskController.update);
router.delete("/deleteTask/:id",taskController.delete);

module.exports = router;
