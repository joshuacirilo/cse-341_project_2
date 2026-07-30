const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const router = express.Router();

router.use('/', (req, res, next) => {
  swaggerDocument.host = req.get('host');
  swaggerDocument.schemes = [req.protocol];
  req.swaggerDoc = swaggerDocument;
  next();
});

router.use('/', swaggerUi.serve, swaggerUi.setup());

module.exports = router;
