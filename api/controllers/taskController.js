const Task = require("../models/taskModel");

class TaskController{

    async getAllByUser(req, res) {
        try {
            const tasks = await Task.findAll({ where: { userId: req.params.userId } });
            res.status(200).json(tasks);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const tasks = await Task.findAll();
            res.status(200).json(tasks);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const task = await Task.findByPk(req.params.id);
            if (task) {
                res.status(200).json(task);
            } else {
                res.status(404).json({ error: "Task not found" });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const task = await Task.findByPk(req.params.id);
            if (task) {
                await task.update(req.body);
                res.status(200).json(task);
            } else {
                res.status(404).json({ error: "Task not found" });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const task = await Task.findByPk(req.params.id);
            if (task) {
                await task.destroy();
                res.status(204).json();
            } else {
                res.status(404).json({ error: "Task not found" });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = TaskController;