'use strict';

const router = require('../lib/router.js');
const Notes = require('../models/notes.js');

let deleteReq = (res,data) => {
  res.statusCode = 204;
  res.statusMessage = 'OK';
  // res.setHeader('Content-Type', 'application/json');
  res.write(`ID: ${data.body.id} was requested`);
  res.end();
};

let serverErr = (res,err) => {
  // console.log('serverErr in api.js');
  let error = { error: err };
  res.statusCode = 404;
  res.statusMessage = 'Not Found';
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify(error) );
  res.end();
};

let sendJSON = (res,data) => {
  // console.log('SendJSON');
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify(data) );
  res.end();
};

let getError = (res,err) => {
  let error = { error:err };
  // console.log('GetERROR');
  // console.log('getError in api.js', error);
  res.statusCode = 404;
  res.statusMessage = 'Not Found';
  // res.setHeader('Content-Type', 'application/text');
  // this set header is causing the json problem??? its expecting json?
  // res.write( 'Not Found' );
  // throws: Error [ERR_STREAM_WRITE_AFTER_END]: write after end
  // because its hitting the sendJSON above first, erroring there
  res.end();
};

router.get('/', (req,res)=>{
  res.statusCode = 200;
  res.statusMessage = 'ok';
  let name = req.query.name || '';
  res.write(`Hello ${name}`);
  res.end();
});

router.get('/api/v1/notes', (req,res) => {
  
  // console.log('GET QUERY ID',req.query.id);
  if ( !req.query.id ) {
    res.statusCode=400;
    res.statusMessage='Bad Request';
    res.end();
  }

  // instead of 2 separate ifs can the below if jsut be an else

  if ( req.query.id ) {
    // console.log('GET QUERY ID',req.query.id);

    Notes.findOne(req.query.id)
      .then( data => {
        // console.log('GET findOine THEN ',req.query.id);
        sendJSON(res,data);
      })
      .catch( err => {
        // console.log('GET findOne CATCH ',req.query.id);
        getError(res,err);
      });
  }
  else {

    Notes.fetchAll()
      .then( data => {
        // console.log('RESPONSE: ',data);
        sendJSON(res,data);
      })
      .catch( err => {
        console.log('Error: ',err);
        getError(res,err);
      });
    //this catch is where its throwing the res.write before end error
  }
});

router.delete('/api/v1/notes', (req,res) => {

  if ( req.query.id ) {
    // console.log('REQ QUERY ID DELETE',req.query.id);
    Notes.deleteOne(req.query.id)
      .then( success => {
        let data = {id:req.query.id,deleted:success};
        deleteReq(res,data);
      })
      .catch(console.error);
  } else {
    res.statusCode=400;
    res.statusMessage='Bad Request';
    res.end();
  }
});

router.post('/api/v1/notes', (req,res) => {

  let newNote = new Notes(req.body);

  newNote.save()
    .then(data => sendJSON(res,data))
    .catch(err => serverErr(res, err));

});

module.exports = {};





// router.get('/api/v1/notes', (req,res) => {
//   // if (!req.query.id) {
//   //   getError(res);
//   // }
//   //this if is trying to handle a proper request but no found id
//   if ( !req.query.id ) {
//     console.log('INSIDE no QUERY',res.query);
//     getError(res);

//   } else if ( req.query.id ) {
//     Notes.findOne(req.query.id)
//     //in models > notes.js if success > then / if failure > catch
//       .then( data => {
//         console.log('GET Note Pass Then');
//         sendJSON(res,data);
//       })
//       .catch( err => {
//         console.log('GET Note Error catch');
//         getError(res,err);
//       });
//   }
//   // else {
//   //   Notes.fetchAll()
//   //     .then( data => sendJSON(res,data) )
//   //     .catch( err => getError(res,err) );
//   // }
// });



// router.post('/api/v1/notes', (req,res) => {
//   console.log('INSIDE POST',req.query.id);

//   if ( req.body ) {
//     let record = new Notes(req.body);
//     // console.log('POST req',req);
//     record.save()
//       .then(data => sendJSON(res,data))
//       //need to change this error?
//       .catch(err => noBody(err));
//   }

//   noBody(res);
// });