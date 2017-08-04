# Petite URL

URL shortener in Node.js - because we can!

## API Documentation

### GET /links

Find out the original url from a short url.

Example:
```
GET http://localhost:3000/links?shortUrl=http%3A%2F%2Fpetite.url%2Ffoo123
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
It is also possible to pass a custom ID (min 6 char), such as:
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
