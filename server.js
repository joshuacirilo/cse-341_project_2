const express = require('express');
const routes = require('./routes');
const mongodb = require('./data/database');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
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
