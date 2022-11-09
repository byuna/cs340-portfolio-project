/*
    SETUP
*/

// Express setup
var express = require('express');   // We are using the express library for the web server.
var app = express();                // We need to instantiate an express object to interact with the server in our code.
app.use(express.json())
app.use(express.urlencoded({extended: true}))
PORT = 32147                        // Set a port number at the top so it's easy to change in the future.

// Handlebars setup
const { engine } = require('express-handlebars');   // What does this do?
var exphbs = require('express-handlebars');         // Import express-handlebars.
app.engine('.hbs', engine({extname: ".hbs"}));      // Create an instance of the handlebars engine to process templates.
app.set('view engine', '.hbs');                     // Tell express to use the handlebars engine whenever it encounters a *.hbs file.
app.use(express.static(__dirname + '/public'));

// Database
var db = require('./db/db-connector');

/*  ROUTES */
app.get('/', function(req, res) {
  res.render('index');
});

/* Customers page route */
app.get('/customers', function(req, res) {
  let queryCustomers = "SELECT customer_id AS 'Customer ID', customer_first_name AS 'First Name', customer_last_name AS 'Last Name', customer_phone AS 'Phone Number', customer_email AS 'Email Address' FROM Customers;"

  db.pool.query(queryCustomers, function(error, rows, fields) {
    res.render('customers', {data: rows});
  })
});


app.post('/add-customer', function(req, res) {
  let data = req.body;

  queryInsertCustomer = `INSERT INTO Customers (customer_first_name, customer_last_name, customer_phone, customer_email) VALUES ('${data.customer_first_name}', '${data.customer_last_name}', '${data.customer_phone}', '${data.customer_email}')`;
  db.pool.query(queryInsertCustomer, function(error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400);
    } else {
      let query1 = 'SELECT * FROM Customers;';
      db.pool.query(query1, function(error, rows, fields) {
        if (error) {
          console.log(error);
          res.sendStatus(400);
        } else {

          res.send(rows);
        }
      })
    }
  })
});


// Items page route
app.get('/items', function(req, res) {
  
  let queryItems = "SELECT item_id AS 'Item ID', item_description AS 'Description', item_cost AS 'Cost', pc_format AS 'Format', pc_purpose AS 'Purpose' FROM Items;"

  db.pool.query(queryItems, function(error, rows, fields) {
    res.render('items', {data: rows});
  })
});


// Employees page routes
app.get('/employees', function(req, res) {
  
  let queryEmployees = "SELECT employee_id AS 'Employee ID', employee_first_name AS 'First Name', employee_last_name AS 'Last Name', employee_phone AS 'Phone Number', employee_email AS 'Email Address' FROM Employees;"

  db.pool.query(queryEmployees, function(error, rows, fields) {
    res.render('employees', {data: rows});
  })
});


app.post('/add-employee-ajax', function(req, res) {
  let data = req.body;
  query1 = `INSERT INTO Employees (employee_first_name, employee_last_name, employee_phone, employee_email) VALUES ('${data.employee_first_name}', '${data.employee_last_name}', ${data.employee_phone}', ${data.employee_email}')`;
  db.pool.query(query1, function(error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      query2 = `SELECT * FROM Employees;`;
      db.pool.query(query2, function(error, rows, fields) {
        if (error) {
          console.log(error);
          res.sendStatus(400);
        } else {
          res.send(rows);
        }
      })
    }
  })
});

app.get('/pc-orders', function(req, res) {
  
  let queryPcorders = "SELECT pc_order_id AS 'Order ID', order_date AS 'Order Date', cost AS 'Cost', employee_id AS 'Employee ID', customer_id AS 'Customer ID' FROM Pc_orders;"

  db.pool.query(queryPcorders, function(error, rows, fields) {
    res.render('pc-orders', {data: rows});
  })
});

app.get('/pc-orders-has-items', function(req, res) {
  
  let queryPcorders = "SELECT sub_order_id AS 'Sub ID', pc_order_id AS 'Order ID', item_id AS 'Item ID', quantity AS 'Quantity' FROM Pc_orders_has_items;"

  db.pool.query(queryPcorders, function(error, rows, fields) {
    res.render('pc-orders-has-items', {data: rows});
  })
});


// LISTENER
app.listen(PORT, function() {   // This is the basic syntax for what is called the 'listener' which recieves incoming requests on the specified PORT.
  console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.');
})
