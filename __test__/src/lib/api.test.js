let superagent = require('superagent');
let app = require('../../../src/app.js');

describe('API Module', () => {

  beforeAll(() => {
    app.start(3001);
  });

  afterAll(() => {
    app.stop();
  });

  it('POST: test 400, it should respond with "bad request" if no request body was provided or the body was invalid', () => {

    return superagent.post('http://localhost:3001/api/v1/notes')

      .catch(data => {
        // console.log('status',data.status);
        // console.log('message',data.message);
        expect(data.status).toEqual(400);
        expect(data.message).toEqual('Bad Request');
        // done();
      });
  });

  it('POST: test 200, it should respond with the body content for a post request with a valid body', () => {
    let obj = {
      content:'max',
      title:'maxtitle',
    };
    return superagent.post('http://localhost:3001/api/v1/notes')
      .send(obj)
      .then(data => {
        // console.log('DATA BODY CONTENT', data);
        // expect(data.body.content).toEqual('max');
        let response = JSON.parse(data.res.text).content;
        // console.log('status',data.status);
        // console.log('message',data.res.text);
        expect(response).toEqual('max');
        //this might be data.res.text.content
        expect(data.status).toEqual(200);
        // done();
      });
    // .catch( data => {
    //   console.log('status',data.status);
    //   console.log('message',data.message);
    //   expect(true).toBe(false);
    // });
  });

  it('GET: test 200, it should contain a response body for a request made with a valid id', () => {
    let obj = {
      content:'postget_CONTENT',
      title: 'postget_TITLE'};

    return superagent.post('http://localhost:3001/api/v1/notes')
      .send(obj)
      .then(data => {
        // console.log(' POST GET DATA BODY', data.body);

        return superagent.get(`http://localhost:3001/api/v1/notes`)
          .query({ id: `${data.body.id}` })
          .then(res => {
            // console.log('STATUS CODE', res.status);
            // console.log('STATUS body', res.body);

            // expect(res.statusCode).toEqual(400);
            expect(res.status).toEqual(200);
            expect(res.body).toBeDefined();
            //this will be in like res.res.text
            // done();
            // expect(res).toEqual(204);
          });
        // .catch( err => {
        //   console.log('status',err.status);
        //   console.log('message',err.message);
        //   expect(true).toBe(false);
        // });

      });
  });


  it('GET: test 404, it should respond with "not found" for valid requests made with an id that was not found', () => {
    let obj = {
      content:'postget_CONTENT',
      title: 'postget_TITLE'};

    let fakeId = 'poop';

    return superagent.post('http://localhost:3001/api/v1/notes')
      .send(obj)
      .then( () => {
        // let dataId = JSON.parse(data.text);
        // console.log(' POST GET DATA BODY', dataId.id);

        // superagent.get(`http://localhost:3001/api/v1/notes?id=${dataId.id}`)
        //above is the correct query string id
        return superagent.get(`http://localhost:3001/api/v1/notes?id=${fakeId}`)

        // .query({ id: `${fakeId}` })
        // .query({ id: `${dataId.id}` })
          // .then(res => {
          //   console.log(res.status);
          //   done();
          // })
          .catch(res => {
            // console.log('CATCH STATUS',res.status);
            // console.log('CATCH MESSAGE',res.message);
            expect(res.status).toEqual(404);
            expect(res.message).toEqual('Not Found');
            // done();
          });
      });
  });

  it('GET: test 400, it should respond with "bad request" if no id was provided in the request', () => {

    return superagent.get(`http://localhost:3001/api/v1/notes`)

    // superagent.get(`http://localhost:3001/api/v1/notes?id=`)
    //query string was ?= instead of ?id=
    // also this test or route isnt right because 
      .catch(err => {
        // console.log(err.status);
        // console.log(err.message);

        expect(err.status).toEqual(400);
        expect(err.message).toEqual('Bad Request');
      });
  });

  it('DELETE: test 204', () => {

    let obj = {
      content:'max',
      title: 'maxtitle',
    };

    // console.log('run Delete');

    return superagent.post('http://localhost:3001/api/v1/notes')
      .send(obj)
      .then(data => {
        // console.log('DATA BODY ID', data.body.id);

        // return superagent.delete(`http://localhost:3000/api/v1/notes`)
        return superagent.delete(`http://localhost:3001/api/v1/notes?id=${data.body.id}`)
          // .query({ id: `${data.body.id}` })
          .then((res) => {
            // console.log('DELETE then', res.status);
            expect(res.statusCode).toEqual(204);
            // done();
          });
      });
  });

  it('DELETE: test 400', () => {

    return superagent.delete(`http://localhost:3001/api/v1/notes?id=`)
      .catch( res => {
        // console.log('DELETE catch', res.status);
        expect(res.status).toEqual(400);
        // done();
      });
  });


});