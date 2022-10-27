/*
    SETUP
*/

// Express setup
var express = require('express');   // We are using the express library for the web server.
var app = express();                // We need to instantiate an express object to interact with the server in our code.
app.use(express.json());
app.use(express.urlencoded({extended: true}));
PORT = 32147                        // Set a port number at the top so it's easy to change in the future.

// Handlebars setup
const { engine } = require('express-handlebars');   // What does this do?
var exphbs = require('express-handlebars');         // Import express-handlebars.
app.engine('.hbs', engine({extname: ".hbs"}));      // Create an instance of the handlebars engine to process templates.
app.set('view engine', '.hbs');                     // Tell express to use the handlebars engine whenever it encounters a *.hbs file.
const path = require('path')


// Database
var db = require('./database/db-connector');

/* 
    ROUTES
 */

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/customers', function(req, res) {
  
  let queryCustomers = "SELECT * FROM Customers;"

  db.pool.query(queryCustomers, function(error, rows, fields) {
    res.render('customers', {data: rows});
  })
});

app.get('/items', function(req, res) {
  
  let queryItems = "SELECT * FROM Items;"

  db.pool.query(queryItems, function(error, rows, fields) {
    res.render('items', {data: rows});
  })
});

app.get('/employees', function(req, res) {
  
  let queryEmployees = "SELECT * FROM Employees;"

  db.pool.query(queryEmployees, function(error, rows, fields) {
    res.render('employees', {data: rows});
  })
});

app.get('/pc-orders', function(req, res) {
  
  let queryPcorders = "SELECT * FROM Pc_orders;"

  db.pool.query(queryPcorders, function(error, rows, fields) {
    res.render('pc-orders', {data: rows});
  })
});

app.get('/pc-orders-has-items', function(req, res) {
  
  let queryPcorders = "SELECT * FROM Pc_orders_has_items;"

  db.pool.query(queryPcorders, function(error, rows, fields) {
    res.render('pc-orders-has-items', {data: rows});
  })
});


/*
    LISTENER
 */
app.listen(PORT, function() {   // This is the basic syntax for what is called the 'listener' which recieves incoming requests on the specified PORT.
  console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.');
})