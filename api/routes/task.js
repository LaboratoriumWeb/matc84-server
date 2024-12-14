const express = require("express");
const taskController = require("../controllers/taskController");
const router = express.Router();

router.post("/",taskController.create);
router.get("/:id",taskController.getById);
router.get("/user/all/:userId",taskController.getAllByUser);
router.get("/all",taskController.getAll);
router.post("/update/:id",taskController.update);
router.delete("/delete/:id",taskController.delete);

module.exports = router;
