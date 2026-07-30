const express = require('express');
const tasksController = require('../controllers/tasksController');
const {
  validateObjectIdParam,
  validateTaskBody,
} = require('../middleware/validation');

const router = express.Router();

router.get('/', tasksController.getAllTasks);
// #swagger.tags = ['Tasks']
// #swagger.summary = 'Get all tasks'
// #swagger.responses[200] = { description: 'Tasks returned successfully', schema: [{ $ref: '#/definitions/Task' }] }

router.get(
  '/:id',
  validateObjectIdParam('id', 'task'),
  tasksController.getTaskById
);
// #swagger.tags = ['Tasks']
// #swagger.summary = 'Get a task by id'
// #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
// #swagger.responses[200] = { description: 'Task returned successfully', schema: { $ref: '#/definitions/Task' } }
// #swagger.responses[400] = { description: 'Invalid task id' }
// #swagger.responses[404] = { description: 'Task not found' }

router.post('/', validateTaskBody, tasksController.createTask);
// #swagger.tags = ['Tasks']
// #swagger.summary = 'Create a task'
// #swagger.parameters['body'] = { in: 'body', required: true, schema: { $ref: '#/definitions/TaskInput' } }
// #swagger.responses[201] = { description: 'Task created successfully' }
// #swagger.responses[400] = { description: 'Invalid project id or missing required task fields' }

router.put(
  '/:id',
  validateObjectIdParam('id', 'task'),
  validateTaskBody,
  tasksController.updateTask
);
// #swagger.tags = ['Tasks']
// #swagger.summary = 'Update a task'
// #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
// #swagger.parameters['body'] = { in: 'body', required: true, schema: { $ref: '#/definitions/TaskInput' } }
// #swagger.responses[204] = { description: 'Task updated successfully' }
// #swagger.responses[400] = { description: 'Invalid task id, invalid project id, or missing required fields' }
// #swagger.responses[404] = { description: 'Task not found' }

router.delete(
  '/:id',
  validateObjectIdParam('id', 'task'),
  tasksController.deleteTask
);
// #swagger.tags = ['Tasks']
// #swagger.summary = 'Delete a task'
// #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
// #swagger.responses[204] = { description: 'Task deleted successfully' }
// #swagger.responses[400] = { description: 'Invalid task id' }
// #swagger.responses[404] = { description: 'Task not found' }

module.exports = router;
