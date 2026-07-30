const express = require('express');
const projectsController = require('../controllers/projectsController');

const router = express.Router();

router.get('/', projectsController.getAllProjects);
// #swagger.tags = ['Projects']
// #swagger.summary = 'Get all projects'
// #swagger.responses[200] = { description: 'Projects returned successfully', schema: [{ $ref: '#/definitions/Project' }] }

router.get('/:id', projectsController.getProjectById);
// #swagger.tags = ['Projects']
// #swagger.summary = 'Get a project by id'
// #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
// #swagger.responses[200] = { description: 'Project returned successfully', schema: { $ref: '#/definitions/Project' } }
// #swagger.responses[400] = { description: 'Invalid project id' }
// #swagger.responses[404] = { description: 'Project not found' }

router.post('/', projectsController.createProject);
// #swagger.tags = ['Projects']
// #swagger.summary = 'Create a project'
// #swagger.parameters['body'] = { in: 'body', required: true, schema: { $ref: '#/definitions/ProjectInput' } }
// #swagger.responses[201] = { description: 'Project created successfully' }
// #swagger.responses[400] = { description: 'Missing required project fields' }

router.put('/:id', projectsController.updateProject);
// #swagger.tags = ['Projects']
// #swagger.summary = 'Update a project'
// #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
// #swagger.parameters['body'] = { in: 'body', required: true, schema: { $ref: '#/definitions/ProjectInput' } }
// #swagger.responses[204] = { description: 'Project updated successfully' }
// #swagger.responses[400] = { description: 'Invalid project id or missing required fields' }
// #swagger.responses[404] = { description: 'Project not found' }

router.delete('/:id', projectsController.deleteProject);
// #swagger.tags = ['Projects']
// #swagger.summary = 'Delete a project'
// #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
// #swagger.responses[204] = { description: 'Project deleted successfully' }
// #swagger.responses[400] = { description: 'Invalid project id' }
// #swagger.responses[404] = { description: 'Project not found' }

module.exports = router;
