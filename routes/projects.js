const express = require('express');
const projectsController = require('../controllers/projectsController');

const router = express.Router();

router.get('/', projectsController.getAllProjects);
router.get('/:id', projectsController.getProjectById);
router.post('/', projectsController.createProject);

module.exports = router;
