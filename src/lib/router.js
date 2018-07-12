'use strict';

const parser = require('./parser.js');

const router = module.exports = {};

router.routes = {};

const methods = ['GET','PUT','PATCH','POST','DELETE'];

methods.forEach( (method) => {
  router.routes[method] = {};
  router[method.toLowerCase()] = function(path, callback) {
    router.routes[method][path] = callback;
  };
});


router.route = (req,res) => {

  return parser(req)
    .then(req => {
      // Determine which of the things in the routing table matches us
      // i.e. if the request is for http://localhost/foo
      // We would look for this:  router.routes.GET['/foo'] and then run the function that's assigned
      // console.log('router.js parser',req.method);
      // console.log('router.js parser',req.parsed.pathname);

      let handler = router.routes[req.method][req.parsed.pathname];
      // If we have one, run the function contained within
      if (handler) {
        return handler(req,res);
      }
    })
    // Otherwise, bug out with an error
    .catch(err => {
      // console.log('NOT_FOUND router.route catch', req.parsed.pathname);
      // console.log(err.status);
      res.statusCode = 400;
      res.statusMessage = 'Not Found';
      res.write(`bad request`);
      res.end();
    });

};