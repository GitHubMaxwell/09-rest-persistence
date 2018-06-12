let superagent = require('superagent');
let app = require('../../../src/app.js');

describe('API Module', () => {
  beforeAll(() => {
    app.start(3000);
  });

  afterAll(() => {
    app.stop();
  });

  it('POST FAIL test', () => {
    let obj = {
      content:'max',
      title: 'maxtitle',
    };
    
    superagent.post('http://localhost:3000/api/v1/notes')
      .send(obj)
      .then(data => Promise.reject(data))
      .catch(data => {
        expect(data.body.content).toEqual('max');
      });
  });

  it('POST PASS test', () => {
    let obj = {
      content:'max',
      title:'maxtitle',
    };
    return superagent.post('http://localhost:3000/api/v1/notes')
      .send(obj)
      .then(data => {
        console.log('DATA BODY CONTENT', data.body.content);
        expect(data.body.content).toEqual('max');
      });
    // .catch(err => {
    //   return err;
    // });
    // done();
  });

  it('POST GET test', (done) => {
    let obj = {
      content:'postget_CONTENT',
      title: 'postget_TITLE'};

    superagent.post('http://localhost:3000/api/v1/notes')
      .send(obj)
      .then(data => {
        // console.log(' POST GET DATA BODY', data.body);

        superagent.get(`http://localhost:3000/api/v1/notes`)
          .query({ id: `${data.body.id}` })
          .then(res => {
            // console.log('STATUS CODE', res.statusCode);
            // expect(res.statusCode).toEqual(400);
            expect(res.statusCode).toEqual(200);
            done();
            // expect(res).toEqual(204);
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