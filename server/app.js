/*
  Title: app.js
  Author: Soliman Abdelmalak
  Date 27 October 2021
  Description: Server module for NodeBucket Application .
*/

/**
 * Require statements
 */
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');                        
const path = require('path');
const mongoose = require('mongoose');
const EmployeeApi = require('./routes/employee-api');

/**
 * App configurations
 */
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist/nodebucket')));
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')));

/**
 * Variables
 */
 const port = process.env.PORT || 3000; // server port

/**
 * MongoDB Atlas connection string
 */

 const conn = 'mongodb+srv://Soliman:Abdelmalak_@cluster0.rpzcn.mongodb.net/NodeBucket?retryWrites=true&w=majority';

/**
 * Database connection
 */
mongoose.connect(conn, {
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => {
  console.debug(`Connection to the database instance was successful`);
}).catch(err => {
  console.log(`MongoDB Error: ${err.message}`)
}); // end mongoose connection

/**
 * API(s) go here...
 */
 
 app.use('/api/employees', EmployeeApi);
// localhost:3000/api/employees 


/**
 * Create and start server
 */
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`)
}); // end http create server function