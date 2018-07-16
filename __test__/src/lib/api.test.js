let superagent = require('superagent');
let app = require('../../../src/app.js');

describe('API Module', () => {

  beforeAll(() => {
    app.start(8000);
  });

  afterAll(() => {
    app.stop();
  });

  xit('POST: test 400, it should respond with "bad request" if no request body was provided or the body was invalid', (done) => {
    // let obj = {
    //   content:'max',
    //   title: 'maxtitle',
    // };
    superagent.post('http://localhost:8000/api/v1/notes')
      // .send(obj)
      // .then(data => Promise.reject(data))
      .catch(data => {
        expect(data.status).toEqual(400);
        expect(data.message).toEqual('Bad Request');
        done();
      });
  });

  xit('POST: test 200, it should respond with the body content for a post request with a valid body', (done) => {
    let obj = {
      content:'max',
      title:'maxtitle',
    };
    return superagent.post('http://localhost:8000/api/v1/notes')
      .send(obj)
      .then(data => {
        // console.log('DATA BODY CONTENT', data);
        // expect(data.body.content).toEqual('max');
        let response = JSON.parse(data.res.text).content;
        expect(response).toEqual('max');
        //this might be data.res.text.content
        expect(data.status).toEqual(200);
        done();
      });
  });

  xit('GET: test 200, it should contain a response body for a request made with a valid id', (done) => {
    let obj = {
      content:'postget_CONTENT',
      title: 'postget_TITLE'};

    superagent.post('http://localhost:8000/api/v1/notes')
      .send(obj)
      .then(data => {
        // console.log(' POST GET DATA BODY', data.body);

        superagent.get(`http://localhost:8000/api/v1/notes`)
          .query({ id: `${data.body.id}` })
          .then(res => {
            // console.log('STATUS CODE', res.statusCode);
            // expect(res.statusCode).toEqual(400);
            expect(res.status).toEqual(200);
            expect(res.body).toBeDefined();
            //this will be in like res.res.text
            done();
            // expect(res).toEqual(204);
          });
      });
  });


  it('GET: test 404, it should respond with "not found" for valid requests made with an id that was not found', (done) => {
    let obj = {
      content:'postget_CONTENT',
      title: 'postget_TITLE'};

    let fakeId = 'poop';

    superagent.post('http://localhost:8000/api/v1/notes')
      .send(obj)
      .then( () => {
        // let dataId = JSON.parse(data.text);
        // console.log(' POST GET DATA BODY', dataId.id);

        // superagent.get(`http://localhost:8000/api/v1/notes?id=${dataId.id}`)
        //above is the correct query string id
        superagent.get(`http://localhost:8000/api/v1/notes?id=${fakeId}`)

        // .query({ id: `${fakeId}` })
        // .query({ id: `${dataId.id}` })
          // .then(res => {
          //   console.log(res.status);
          //   done();
          // })
          .catch(res => {
            // console.log('CAaaaTCH res',res);

            // console.log('CAaaaTCH STATUS',res.status);
            // console.log('CAaaaaTCH MESSAGE',res.message);
            expect(res.status).toEqual(404);
            expect(res.message).toEqual('Not Found');
            done();
          });
      });
  });

  it('GET: test 400, it should respond with "bad request" if no id was provided in the request', (done) => {

    superagent.get(`http://localhost:8000/api/v1/notes`)

    // superagent.get(`http://localhost:8000/api/v1/notes?id=`)
    //query string was ?= instead of ?id=
    // also this test or route isnt right because 
      .catch(err => {
        // console.log(err);
        expect(err.status).toEqual(400);
        expect(err.message).toEqual('Bad Request');

        done();
      });

  });

});

//   it('DELETE test', () => {
//     let obj = {
//       content:'max',
//       title: 'maxtitle',
//     };
//     console.log('run Delete');

//     return superagent.post('/api/v1/notes')
//       .send(obj)
//       .then(data => {
//         console.log('DATA BODY ID', data.body.id);

//         return superagent.delete(`http://localhost:3000/api/v1/notes`)
//           .query({ id: `${data.body.id}` })
//           .then((res) => {
//             console.log('DELETE after POST', res.statusCode);
//             expect(res.statusCode).toEqual(204);
//           });
//       })
//       .catch(err => {
//         return err;
//       });
//   });
// });//closing the describe