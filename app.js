const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const links = require('./routes/links');

let app = express();

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/links', links);

// Error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
