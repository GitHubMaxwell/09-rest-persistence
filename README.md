![cf](https://i.imgur.com/7v5ASc8.png) Lab 09: Vanilla REST API w/ Persistence [![Build Status](https://travis-ci.com/GitHubMaxwell/09-rest-persistence.svg?branch=master)](https://travis-ci.com/GitHubMaxwell/09-rest-persistence)

* TRAVIS: https://travis-ci.com/GitHubMaxwell/09-rest-persistence
* HEROKU: https://lab09-httpserver-persistence.herokuapp.com/ 
* GITHUB PR: https://github.com/GitHubMaxwell/09-rest-persistence/pull/3

## Heroku Testing

* GET: fail 404, it should respond with 'not found' for valid requests made with an id that was not found
-- `https://lab08-rest-httpserver.herokuapp.com/api/v1/max?id=unknown`

* GET: fail 400, it should respond with 'bad request' if no id was provided in the request
-- `https://lab08-rest-httpserver.herokuapp.com/api/v1/max`

* GET: success 200, it should contain a response body for a request made with a valid id
-- `https://lab08-rest-httpserver.herokuapp.com/api/v1/max?id=max`

* POST: fail 400, it should respond with 'bad request' if no request body was provided or the body was invalid
-- `https://lab08-rest-httpserver.herokuapp.com/api/v1/max?id=max`
-- (in body tab > raw / JSON(application/json))    `{"stuff":"other stuff"}`

* POST: pass 200, it should respond with the body content for a post request with a valid body
-- `https://lab08-rest-httpserver.herokuapp.com/api/v1/max?id=max`
-- dont put anything in the body tag


## EXTRA - DELETE Routes

* DELETE pass 200, should return `ID: max was deleted`
-- `https://lab08-rest-httpserver.herokuapp.com/api/v1/max?id=max`

* DELETE fail 404, should return `no ID provided`
-- `https://lab08-rest-httpserver.herokuapp.com/api/v1/max`