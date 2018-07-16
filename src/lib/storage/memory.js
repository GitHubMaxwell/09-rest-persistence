'use strict';


const storage = module.exports = {};

// We create a simple object to store our notes in memory
const database = {};

// This use a straight "Promise.resolve"
// When you do this, you don't have to do the whole promise wiring.
// Rather, JS just returns a promise and immediately resolves it for you
storage.getAll = () => {
  // console.log('GOT TO MEM GET ALL');
  return Promise.resolve(database);
};

// To get a single note, check for it in the database, and resolve with it
storage.get = (id) => {
  // console.log('GOT TO MEM GET');
  return new Promise( (resolve,reject) => {
    if ( database[id] ) { resolve(database[id]); }
    else { reject(`${id} not found`); }
  });
};

// For saving, we just add the data into the "database", keyed by the note's id.
storage.save = (data) => {
  // console.log('GOT TO MEM SAVE');
  // console.log('SAVE DATA ID', data.id);
  return new Promise( (resolve,reject) => {
    if ( data.id ) {
      database[data.id] = data;
      // console.log('DATABASE ID', database[data.id]);
      resolve(database[data.id]);
    }
    else {
      reject('Invalid Data (No ID)');
    }
  });
};

storage.deleteOne = id => {
  // console.log('GOT TO MEM DELETE', id);
  return new Promise( (resolve,reject) => {

    if ( database[id] ) {
      // console.log('inside delete IF resolve');
      // console.log('db info before delete', database[id]);
      // delete database[id].content;
      // why not deleting the entire entry?
      delete database[id];
      // jeeze im trying to return the damn entry i just deleted
      // resolve(database[id]);
      resolve(`${id} was deleted`);
    }

    else {
      // console.log('inside delete IF reject');

      reject('Invalid Data (No ID)');
    }
  });
};