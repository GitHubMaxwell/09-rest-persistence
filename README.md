![cf](https://i.imgur.com/7v5ASc8.png) Lab 09: Vanilla REST API w/ Persistence [![Build Status](https://travis-ci.com/GitHubMaxwell/09-rest-persistence.svg?branch=master)](https://travis-ci.com/GitHubMaxwell/09-rest-persistence)

* TRAVIS: https://travis-ci.com/GitHubMaxwell/09-rest-persistence
* HEROKU: https://lab09-httpserver-persistence.herokuapp.com/ 
* GITHUB PR: 

## Heroku Testing

* GET: fail 404, it should respond with 'not found' for valid requests made with an id that was not found
-- `https://lab09-httpserver-persistence.herokuapp.com/api/v1/notes?id=wrongid`

* GET: fail 400, it should respond with 'bad request' if no id was provided in the request
-- `https://lab09-httpserver-persistence.herokuapp.com/api/v1/notes`

* GET: success 200, it should contain a response body for a request made with a valid id
-- do a post first and copy the _id and paste it in the id value of the query string (like below) `?id=<_id>`
-- `https://lab09-httpserver-persistence.herokuapp.com/api/v1/notes?id=18f3dde0-8895-11e8-9c87-adca78fc36b5`

* POST: fail 400, it should respond with 'bad request' if no request body was provided or the body was invalid
-- `https://lab09-httpserver-persistence.herokuapp.com/api/v1/notes`
-- (in body tab > raw / JSON(application/json))    `{"content":"maxcontent","title":"maxtitle"}`

* POST: pass 200, it should respond with the body content for a post request with a valid body
-- `https://lab09-httpserver-persistence.herokuapp.com/api/v1/notes`
-- dont put anything in the body tag


## EXTRA - DELETE Routes

* DELETE pass 200, should return `ID: max was deleted`
-- `https://lab09-httpserver-persistence.herokuapp.com/api/v1/notes?id=max`

* DELETE fail 404, should return `no ID provided`
-- `https://lab09-httpserver-persistence.herokuapp.com/api/v1/notes`