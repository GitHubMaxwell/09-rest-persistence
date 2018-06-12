'use strict';

const router = require('../lib/router.js');
const Notes = require('../models/notes.js');

/*
GET: test 404, it should respond with 'not found' for valid requests made with an id that was not found

GET: test 400, it should respond with 'bad request' if no id was provided in the request

GET: test 200, it should contain a response body for a request made with a valid id

POST: test 400, it should respond with 'bad request' if no request body was provided or the body was invalid

POST: test 200, it should respond with the body content for a post request with a valid body
*/
/**
 * Simple method to send a JSON response (all of the API methods will use this)
 * @param res
 * @param data
 */
let sendJSON = (res,data) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify(data) );
  res.end();
};

let deleteReq = (res,data) => {
  res.statusCode = 204;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.write(`ID: ${data.body.id} was requested`);
  res.end();
};

let serverError = (res,err) => {
  // if(req.query.id)
  let error = { error:err };
  res.statusCode = 500;
  res.statusMessage = 'Server Error';
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify(error) );
  res.end();
};

let getError = (res,err) => {
  let error = { error:err };
  res.statusCode = 404;
  res.statusMessage = 'not found';
  res.setHeader('Content-Type', 'application/json');
  res.write( 'not found' );
  res.end();
};


router.get('/api/v1/notes', (req,res) => {
  // if (!req.query.id) {
  //   getError(res);
  // }
  //this if is trying to handle a proper request but no found id
  if ( req.query.id ) {
    Notes.findOne(req.query.id)
      .then( data => sendJSON(res,data) )
      .catch( err => serverError(res,err) );
  }
  else {
    Notes.fetchAll()
      .then( data => sendJSON(res,data) )
      .catch( err => serverError(res,err) );
  }
});

router.delete('/api/v1/notes', (req,res) => {
  if ( req.query.id ) {
    console.log('REQ QUERY ID DELETE',req.query.id);
    Notes.deleteOne(req.query.id)
      .then( success => {
        let data = {id:req.query.id,deleted:success};
        deleteReq(res,data);
      })
      .catch(console.error);
  }
});

router.post('/api/v1/notes', (req,res) => {

  let record = new Notes(req.body);
  // console.log('POST req',req);
  record.save()
    .then(data => sendJSON(res,data))
    .catch(console.error);
});

module.exports = {};