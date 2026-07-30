const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const router = express.Router();

router.use('/', (req, res, next) => {
  const protocol = req.get('x-forwarded-proto') || req.protocol || 'https';

  req.swaggerDoc = {
    ...swaggerDocument,
    host: req.get('host'),
    schemes: [protocol],
  };

  next();
});

router.use('/', swaggerUi.serve, swaggerUi.setup(null, { swaggerOptions: {} }));

module.exports = router;
