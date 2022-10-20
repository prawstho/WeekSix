// Add logging to the CLI project by using eventLogging
// load the logEvents module
const logEvents = require('./logEvents');

// define/extend an EventEmitter class
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {};
// initialize an new emitter object
const myEmitter = new MyEmitter();
// add the listener for the logEvent
myEmitter.on('log', (event, level, msg) => logEvents(event, level, msg));

// Node.js common core global modules
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const myArgs = process.argv.slice(2);

function displayConfig() {
    if(DEBUG) console.log('config.displayConfig()');
    fs.readFile(__dirname + "/json/config.json", (error, data) => {
        if(error) throw error;         
        console.log(JSON.parse(data));
    });
    myEmitter.emit('log', 'config.displayConfig()', 'INFO', 'config.json displayed');
}

function configApp() {
    if(DEBUG) console.log('configApp()');
    myEmitter.emit('log', 'config.configApp()', 'INFO', 'config option was called by CLI');

    switch (myArgs[1]) {
    case '--show':
        if(DEBUG) console.log('--show');
        displayConfig();
        break;
    case '--reset':
        if(DEBUG) console.log('--reset');
        //resetConfig();
        break;
    case '--set':
        if(DEBUG) console.log('--set');
        //setConfig();
        break;
    case '--help':
    case '--h':
    default:
        fs.readFile(__dirname + "/views/config.txt", (error, data) => {
            if(error) throw error;              
            console.log(data.toString());
        });
        myEmitter.emit('log', 'config.configApp()', 'INFO', 'invalid CLI option, usage displayed');
    }
}

module.exports = {
    configApp,
  }