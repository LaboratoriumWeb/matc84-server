/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *               userId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Task created successfully
 *       500:
 *         description: Error creating task
 */

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get task by ID
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task found
 *       404:
 *         description: Task not found
 *       500:
 *         description: Error getting task
 */

/**
 * @swagger
 * /tasks/user/all/{userId}:
 *   get:
 *     summary: Get all tasks by user ID
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of tasks
 *       500:
 *         description: Error getting tasks
 */

/**
 * @swagger
 * /tasks/all:
 *   get:
 *     summary: Get all tasks
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all tasks
 *       500:
 *         description: Error getting tasks
 */

/**
 * @swagger
 * /tasks/update/{id}:
 *   post:
 *     summary: Update task by ID
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Error updating task
 */

/**
 * @swagger
 * /tasks/delete/{id}:
 *   delete:
 *     summary: Delete task by ID
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Error deleting task
 */