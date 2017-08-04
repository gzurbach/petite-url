const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');

const BOUNDLESS_ID = 'foo123';
const BOUNDLESS_SHORT_URL = 'http://petite.url/foo123';
const BOUNDLESS_LONG_URL = 'http://boundless.co';
const BOUNDLESS_ENCODED_SHORT_URL = encodeURI(BOUNDLESS_SHORT_URL);

const GOOGLE_LONG_URL = 'http://google.com';

describe('GET /links', function() {

  describe('given a valid shortUrl query param', function() {
    it('should return 200', function(done) {
      request(app)
        .get(`/links?shortUrl=${BOUNDLESS_ENCODED_SHORT_URL}`)
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
    it('should return the id', function(done) {
      request(app)
        .get(`/links?shortUrl=${BOUNDLESS_ENCODED_SHORT_URL}`)
        .end(function(err, res) {
          expect(res.body.id).to.equal(BOUNDLESS_ID);
          done();
        });
    });
    it('should return the shortUrl', function(done) {
      request(app)
        .get(`/links?shortUrl=${BOUNDLESS_ENCODED_SHORT_URL}`)
        .end(function(err, res) {
          expect(res.body.shortUrl).to.equal(BOUNDLESS_SHORT_URL);
          done();
        });
    });
    it('should return the longUrl', function(done) {
      request(app)
        .get(`/links?shortUrl=${BOUNDLESS_ENCODED_SHORT_URL}`)
        .end(function(err, res) {
          expect(res.body.longUrl).to.equal(BOUNDLESS_LONG_URL);
          done();
        });
    });
  });

  describe('given no shortUrl query param', function() {
    it('should return 400', function(done) {
      request(app)
        .get(`/links`)
        .expect('Content-Type', /json/)
        .expect(400, done);
    });
  });

  describe('given an invalid shortUrl query param', function() {
    it('should return 400', function(done) {
      request(app)
        .get(`/links?shortUrl=http://bad.url`)
        .expect('Content-Type', /json/)
        .expect(400, done);
    });
  });

  describe('given a shortUrl query param that does not exist', function() {
    it('should return 404', function(done) {
      request(app)
        .get(`/links?shortUrl=http://petite.url/sadpanda`)
        .expect('Content-Type', /json/)
        .expect(404, done);
    });
  });
});

describe('POST /links', function() {

  describe('given a body with a valid longUrl property', function() {
    it('should return 200', function(done) {
      request(app)
        .post(`/links`)
        .send({
          longUrl: GOOGLE_LONG_URL
        })
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
    it('should return an id', function(done) {
      request(app)
        .post(`/links`)
        .send({
          longUrl: GOOGLE_LONG_URL
        })
        .end(function(err, res) {
          expect(res.body.id).to.exist;
          done();
        });
    });
    it('should return the shortUrl', function(done) {
      request(app)
        .post(`/links`)
        .send({
          longUrl: GOOGLE_LONG_URL
        })
        .end(function(err, res) {
          expect(res.body.shortUrl).to.equal(`http://petite.url/${res.body.id}`);
          done();
        });
    });
    it('should return the longUrl', function(done) {
      request(app)
        .post(`/links`)
        .send({
          longUrl: GOOGLE_LONG_URL
        })
        .end(function(err, res) {
          expect(res.body.longUrl).to.equal(GOOGLE_LONG_URL);
          done();
        });
    });
  });
  describe('given a body with a valid longUrl property and a valid customId property', function() {
    it('should use the provided customId', function(done) {
      request(app)
        .post(`/links`)
        .send({
          longUrl: GOOGLE_LONG_URL,
          customId: 'google'
        })
        .end(function(err, res) {
          expect(res.body.shortUrl).to.equal('http://petite.url/google');
          done();
        });
    });
  });
  describe('given a body with no longUrl', function() {
    it('should return 400', function(done) {
      request(app)
        .post(`/links`)
        .expect(400, done);
    });
  });
  describe('given a body with an invalid URL', function() {
    it('should return 400', function(done) {
      request(app)
        .post(`/links`)
        .send({
          longUrl: 'not-a-url',
        })
        .expect(400, done);
    });
  });
  describe('given a body with a valid longUrl property and an invalid customId property', function() {
    it('should return 400', function(done) {
      request(app)
        .post(`/links`)
        .send({
          longUrl: GOOGLE_LONG_URL,
          customId: 'short'
        })
        .expect(400, done);
    });
  });
});
