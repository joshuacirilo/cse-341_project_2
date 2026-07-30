const express = require('express');
const routes = require('./routes');
const mongodb = require('./data/database');

const app = express();
const port = process.env.PORT || 3000;

app.set('trust proxy', true);
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  return next();
});
app.use('/', routes);

mongodb.initDB((err) => {
  if (err) {
    console.error('Could not connect to MongoDB.');
    console.error(err);
    process.exit(1);
  }

  app.listen(port, () => {
    console.log(`Database connected. Server running on http://localhost:${port}`);
  });
});
