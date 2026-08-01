const express = require('express');
const projectsController = require('../controllers/projectsController');
const { isAuthenticated } = require('../middleware/auth');
const {
  validateObjectIdParam,
  validateProjectBody,
} = require('../middleware/validation');

const router = express.Router();

router.use(isAuthenticated);

router.get('/', projectsController.getAllProjects);
// #swagger.tags = ['Projects']
// #swagger.summary = 'Get all projects'
// #swagger.security = [{ "sessionAuth": [] }]
// #swagger.responses[200] = { description: 'Projects returned successfully', schema: [{ $ref: '#/definitions/Project' }] }
// #swagger.responses[401] = { description: 'Authentication required' }

router.get(
  '/:id',
  validateObjectIdParam('id', 'project'),
  projectsController.getProjectById
);
// #swagger.tags = ['Projects']
// #swagger.summary = 'Get a project by id'
// #swagger.security = [{ "sessionAuth": [] }]
// #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
// #swagger.responses[200] = { description: 'Project returned successfully', schema: { $ref: '#/definitions/Project' } }
// #swagger.responses[400] = { description: 'Invalid project id' }
// #swagger.responses[404] = { description: 'Project not found' }
// #swagger.responses[401] = { description: 'Authentication required' }

router.post('/', validateProjectBody, projectsController.createProject);
// #swagger.tags = ['Projects']
// #swagger.summary = 'Create a project'
// #swagger.security = [{ "sessionAuth": [] }]
// #swagger.parameters['body'] = { in: 'body', required: true, schema: { $ref: '#/definitions/ProjectInput' } }
// #swagger.responses[201] = { description: 'Project created successfully' }
// #swagger.responses[400] = { description: 'Missing required project fields' }
// #swagger.responses[401] = { description: 'Authentication required' }

router.put(
  '/:id',
  validateObjectIdParam('id', 'project'),
  validateProjectBody,
  projectsController.updateProject
);
// #swagger.tags = ['Projects']
// #swagger.summary = 'Update a project'
// #swagger.security = [{ "sessionAuth": [] }]
// #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
// #swagger.parameters['body'] = { in: 'body', required: true, schema: { $ref: '#/definitions/ProjectInput' } }
// #swagger.responses[204] = { description: 'Project updated successfully' }
// #swagger.responses[400] = { description: 'Invalid project id or missing required fields' }
// #swagger.responses[404] = { description: 'Project not found' }
// #swagger.responses[401] = { description: 'Authentication required' }

router.delete(
  '/:id',
  validateObjectIdParam('id', 'project'),
  projectsController.deleteProject
);
// #swagger.tags = ['Projects']
// #swagger.summary = 'Delete a project'
// #swagger.security = [{ "sessionAuth": [] }]
// #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
// #swagger.responses[204] = { description: 'Project deleted successfully' }
// #swagger.responses[400] = { description: 'Invalid project id' }
// #swagger.responses[404] = { description: 'Project not found' }
// #swagger.responses[401] = { description: 'Authentication required' }

module.exports = router;
