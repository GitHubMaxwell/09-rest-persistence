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
      // .then(data => {
      //   console.log('THEN BODY:', data.body);
      //   expect(true).toEqual(false);
      // })
      .catch(data => {
        // console.log('DATA BODY:', data.status);
        console.log('DATA BODY:', data);

        // console.log('DATA BODY:', data.response.text);
        // expect(true).toEqual(false);
        expect(data.status).toEqual(400);
        expect(data.response.text).toEqual('bad request');

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
        expect(data.body.content).toEqual('max');
        expect(data.status).toEqual(200);

        done();
      });
    // .catch(err => {
    //   expect(err.status).toEqual(200);

    //   done();
    // });
  });

  it('GET: test 200, it should contain a response body for a request made with a valid id', (done) => {
    let obj = {
      content:'postget_CONTENT',
      title: 'postget_TITLE'};

    superagent.post('http://localhost:8000/api/v1/notes')
      .send(obj)
      .then(data => {
        console.log(' POST GET DATA BODY', data.body);

        superagent.get(`http://localhost:8000/api/v1/notes`)
          .query({ id: `${data.body.id}` })
          .then(res => {
            // console.log('STATUS CODE', res.statusCode);
            // expect(res.statusCode).toEqual(400);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toBeDefined();
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
      .then( data => {
        let dataId = JSON.parse(data.text);
        console.log(' POST GET DATA BODY', dataId.id);

        superagent.get(`http://localhost:8000/api/v1/notes?id=${dataId.id}`)
          // .query({ id: `${fakeId}` })
          // .query({ id: `${dataId.id}` })

          // ressearch Jest .query method
          // what if i change the key from id to something else
          .then(res => {
            console.log('THEEEN CODE 404', res.statusCode);
            // expect(res.statusCode).toEqual(400);
            // expect(res.statusCode).toEqual(404);
            // search document for JSON.parse in a catch or error where its assign res values
            expect(res.text).toEqual('not found');
            done();
            // expect(res).toEqual(204);
          })
          .catch(res => {
            // console.log('CAaaaTCH res',res);

            console.log('CAaaaTCH STATUS',res.status);
            console.log('CAaaaaTCH MESSAGE',res.message);
            expect(res.status).toEqual(404);
            expect(res.message).toEqual('Not Found');

            done();
          });
        done();

      })
      .catch(err => {
        console.log(err);
        done();
      });
  });

  xit('GET: test 400, it should respond with "bad request" if no id was provided in the request', (done) => {
    let obj = {
      content:'postget_CONTENT',
      title: 'postget_TITLE'};

    superagent.post('http://localhost:8000/api/v1/notes')
      .send(obj)
      .then(data => {
        // console.log(' POST GET DATA BODY', data.body);

        superagent.get(`http://localhost:8000/api/v1/notes`)
          // .query({ id: `${data.body}` })
          // shouldnt be any query
          //getting no id makes it pass - check route it may be hitting the fetchall in the else
          .then(res => {
            console.log('STATUS CODE', res.statusCode);
            console.log('DATA',res.text);
            console.log(res.statusMessage);
            expect(res.statusCode).toEqual(400);
            expect(res.statusMessage).toEqual('bad request');
            done();
          })
          .catch(res => {
            console.log('CATCH STATUS',res);
            console.log('CATCH MESSAGE',res.text);
            expect(res.status).toEqual(400);
            expect(res.statusMessage).toEqual('bad request');
            done();
          });
      })
      .catch(err => {
        return err;
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
});//closing the describe