const express = require('express');
const randomstring = require('randomstring');
const validUrl = require('valid-url');

let router = express.Router();

// Add Boundless URL by default for the sake of the demo
let mockDatabase = {
  'foo123': 'http://boundless.co'
};

/**
 * Find out the original url from a short url.
 */
router.get('/', function(req, res, next) {

  let shortUrl = req.query.shortUrl;
  if (!shortUrl) {
    return next({ status: 400, message: 'The \'shortUrl\' query parameter is required' });
  }

  let tokens = shortUrl.split('/');
  if (tokens.length !== 4) {
    return next({ status: 400, message: 'The provided short URL is not valid' });
  }

  let id = tokens[3];
  let longUrl = mockDatabase[id];
  if (!longUrl) {
    return next({ status: 404, message: 'The provided short URL was not found' });
  }

  res.send({
    id,
    shortUrl,
    longUrl
  });
});

/**
 * Generate a short url for a given url.
 */
router.post('/', function(req, res, next) {

  let longUrl = req.body.longUrl;
  if (!longUrl) {
    return next({ status: 400, message: 'The \'longUrl\' body property is required' });
  }

  if (!validUrl.isUri(longUrl)) {
    return next({ status: 400, message: 'The \'longUrl\' body property is not a valid URI' });
  }

  let customId = req.body.customId;
  if (customId && customId.length < 6) {
    return next({ status: 400, message: 'The \'customId\' body property must be at least 6 characters' });
  }

  let id = customId || randomstring.generate(6);
  let shortUrl = `http://petite.url/${id}`;

  // "Save" the link in the database
  mockDatabase[id] = longUrl;

  res.send({
    id,
    shortUrl,
    longUrl
  });
});

module.exports = router;
