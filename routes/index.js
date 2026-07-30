const express = require('express');
const helloController = require('../controllers/helloController');

const router = express.Router();

router.get('/', helloController.sayHello);
router.use('/api-docs', require('./swagger'));
router.use('/projects', require('./projects'));
router.use('/tasks', require('./tasks'));

module.exports = router;
