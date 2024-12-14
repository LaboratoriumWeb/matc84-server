const Task = require("../models/taskModel");
const User = require("../models/userModel")
const TaskService = require("../services/taskService");

class TaskController{

    static async create(req, res){
        try{
            const { title, description, status, userId } = req.query;
            if (!((title || description || status) && userId)) {
                throw "userId is required and at least one of the following items are required: title, description, status";
            }

            //Considerando que userId é um email e não o Id do banco de dados
            const user = await User.findOne({where: {userId}});
            if (!user) {
                return res.status(404).json({ error: "Usuário não encontrado." });
            } else {
                userId = user.id
            }

//            const newTask = await Task.create({
//                title: title,
//                description: description,
//                status: status,
//                userId: userId
//            })

            const newTask = await taskService.createTask(title,description,status,userId);

            return res.status(201).json({message: "Task created"}, newTask);
        }catch(error){
            return error;
        }
    }

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
	    const taskId = req.params.id;
            const task = await Task.findByPk(taskId);
            if (!task) {
                res.status(404).json({ error: "Task not found" });
	    }

	    await TaskService.updateTask(taskId, req.body);
            //await task.update(req.body);//Comment - Felipe: Se o usuário quiser definir status, title e corpo como vazio talvez seja interessante excluir a task
            res.status(200).json(task);
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
	    const taskId = req.params.id;
            const task = await Task.findByPk(taskId);
            if (!task) {
                res.status(404).json({ error: "Task not found" });
            }
		await TaskService.deleteTask(taskId);
                res.status(204).json();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = TaskController;
