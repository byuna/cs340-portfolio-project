/*
    SETUP
*/
// Express
var express = require('express');   // We are using the express library for the web server.
var app = express();                // We need to instantiate an express object to interact with the server in our code.
PORT = 32147                        // Set a port number at the top so it's easy to change in the future.

// Database
var db = require('./db-connector');

/* 
    ROUTES
 */

app.get('/', function(req, res){
    // Define our queries
    query4 = 'DESCRIBE Customers';

    db.pool.query(query4, function(err, results, fields){

      // Send the results to browser
      let base = "<h1>MySQL Results<h1>"
      res.send(base + JSON.stringify(results))
    });
  });

/*
    LISTENER
 */
app.listen(PORT, function() {   // This is the basic syntax for what is called the 'listener' which recieves incoming requests on the specified PORT.
  console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.');
})