# Petite URL

URL shortener in Node.js - because we can!

## Setup

1. Install [Node.js v6+](https://github.com/creationix/nvm#install-script) (run `nvm install 6` if using nvm)
2. Clone the repo
3. `cd petite-url && npm install`
4. `npm start`

The API should be accessible at `http://localhost:3000`.

## Test

To run the tests, simply run `npm test`.

## API Documentation

### GET /links

Find out the original url from a short url.

Example:
```
GET http://localhost:3000/links?shortUrl=http%3A%2F%2Fpetite.url%2Ffoo123
```
Response:
```
{
  "id": "foo123",
  "shortUrl": "http://petite.url/foo123",
  "longUrl": "http://boundless.co"
}
```

### POST /links

Generate a short url for a given url.

Example:
```
POST http://localhost:3000/links
{
  "longUrl": "http://boundless.co"
}
```
Response:
```
{
  "id": "foo123",
  "shortUrl": "http://petite.url/foo123",
  "longUrl": "http://boundless.co"
}
```
You may also provide a custom ID for the URL (min 6 char), such as:
```
POST http://localhost:3000/links
{
  "longUrl": "http://boundless.co",
  "customId": "pretty-id"
}
```
Response:
```
{
  "id": "pretty-id",
  "shortUrl": "http://petite.url/pretty-id",
  "longUrl": "http://boundless.co"
}
```
