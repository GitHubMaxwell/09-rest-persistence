'use strict';

// First Party Modules
const url = require('url');
const queryString = require('querystring');

module.exports = (req) => {

  return new Promise( (resolve,reject) => {
    // console.log('parser.js BEFORE If');

    if( !(req || req.url) ) { 
      // console.log('parser.js in reject');

      reject('Invalid Request Object. Cannot Parse'); 
    }

    // req.url = http://localhost:3000/api/v1/notes?id=12345
    req.parsed = url.parse(req.url);
    // console.log('DELETE parsed url: ', req.parsed);
    /*
        req.parsed = {
          pathname: '/api/vi/notes',
          query: '?id=12345&name=John',
        }
       */

    req.query = queryString.parse(req.parsed.query);
    // console.log('DELETE query url: ', req.query);

    /*
        req.query = {
          id:12345,
          name:'John'
        }
       */

    if(! req.method.match(/POST|PUT|PATCH/) ) {
      //was forgetting to put the DELETE in the match
      // console.log('DELETE in parser.js');
      resolve(req);
    }

    let text = '';

    req.on('data', (buffer) => {
      text += buffer.toString();
    });

    req.on('end', () => {
      try{
        // console.log('parser.js JSON.parse');
        req.body = JSON.parse(text);
        resolve(req);
      }
      catch(err) { 
        // console.log('parser.js try catch ERR');
        // console.log('parser.js try catch ERR: ', err);
        reject(err); 
      }

    });

    req.on('err', reject);

  });

};