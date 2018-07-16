'use strict';

// Pull in all of our possible storage modules
const memoryStorage = require('./memory.js');
const fileStorage = require('./filesystem.js');
require('dotenv').config();

let dataStorageModule = {};

// Based on an entry in our .env file (or really any other mechanism you want)
// Switch this module to export THAT storage mechanism
// This allows this application to dynamically switch out storage systems based
// on any logic you choose
// console.log('data-store.js storage type: ',process.env.STORAGE);

switch( process.env.STORAGE ) {

case 'filesystem':
  dataStorageModule = fileStorage;
  // console.log('storage type: FILESYSTEM');
  break;

default:
  dataStorageModule = memoryStorage;
  // console.log('storage type: MEMORY');
  // break;
}

module.exports = dataStorageModule;