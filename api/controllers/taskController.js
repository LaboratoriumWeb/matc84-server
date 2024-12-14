const Task = require("../models/taskModel");

class TaskController {
    async create(req, res) {
        try {
            const { title, description, status, userId } = req.body;
            const newTask = await Task.create({ title, description, status, userId });
            return res.status(201).json({ message: "Task created", task: newTask });
        } catch (error) {
            return res.status(500).json({ message: "Error creating task", error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const task = await Task.findByPk(req.params.id);
            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }
            return res.status(200).json(task);
        } catch (error) {
            return res.status(500).json({ message: "Error getting task", error: error.message });
        }
    }

    async getAllByUser(req, res) {
        try {
            const tasks = await Task.findAll({ where: { userId: req.params.userId } });
            return res.status(200).json(tasks);
        } catch (error) {
            return res.status(500).json({ message: "Error getting tasks", error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const tasks = await Task.findAll();
            return res.status(200).json(tasks);
        } catch (error) {
            return res.status(500).json({ message: "Error getting tasks", error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { title, description, status } = req.body;
            const task = await Task.findByPk(req.params.id);
            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }
            await task.update({ title, description, status });
            return res.status(200).json({ message: "Task updated", task });
        } catch (error) {
            return res.status(500).json({ message: "Error updating task", error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const task = await Task.findByPk(req.params.id);
            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }
            await task.destroy();
            return res.status(200).json({ message: "Task deleted" });
        } catch (error) {
            return res.status(500).json({ message: "Error deleting task", error: error.message });
        }
    }
}

module.exports = new TaskController();