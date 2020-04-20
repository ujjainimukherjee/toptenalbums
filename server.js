const express = require('express');
const bodyParser = require('body-parser');

const dev = process.env.NODE_ENV !== 'production';
const next = require('next');
const app = next({ dev });
const handle = app.getRequestHandler();

const apiRoutes = require('./routes/apiRoutes.js');

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());

  server.use('/api', apiRoutes);

  // Server-side
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  /* eslint-disable no-console */
  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('Server ready on http://localhost:3000');
  });
});
