const Task = require("../models/taskModel")

class TaskService {

	static async createTask(title,description,status,userId) {
		const newTask = await Task.create({
			title,
			description,
			status,
			userId
		})

		return newTask;
	}

	static async updateTask(taskId, updatedData){
		const task = await Task.findByPk(taskId);
		await task.update(updatedData);
	}

	static async deleteTask(taskId){
		const task = await Task.findByPk(taskId);
		await task.destroy();
	}
}
