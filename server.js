const express = require('express');
const bodyParser = require('body-parser');
//const session = require('express-session');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const next = require('next');
const pathMatch = require('path-match');
const app = next({ dev });
const handle = app.getRequestHandler();
const { parse } = require('url');

const apiRoutes = require('./routes/apiRoutes.js');

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());

  server.use('/api', apiRoutes);

  // Server-side
  const route = pathMatch();

  server.get('/test', (req, res) => {
    console.log("in 1");
    return app.render(req, res, '/test');
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  /* eslint-disable no-console */
  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('Server ready on http://localhost:3000');
  });
});
