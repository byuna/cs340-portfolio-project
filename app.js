/*
    SETUP
*/

// Express setup
var express = require('express');   // We are using the express library for the web server.
var app = express();                // We need to instantiate an express object to interact with the server in our code.
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
PORT = 32147                        // Set a port number at the top so it's easy to change in the future.

// Handlebars setup
const { engine } = require('express-handlebars');   // What does this do?
var exphbs = require('express-handlebars');         // Import express-handlebars.
app.engine('.hbs', engine({ extname: ".hbs" }));      // Create an instance of the handlebars engine to process templates.
app.set('view engine', '.hbs');                     // Tell express to use the handlebars engine whenever it encounters a *.hbs file.
app.use(express.static(__dirname + '/public'));

// DATABASE
var db = require('./db/db-connector');

// ROUTES
app.get('/', function(req, res) {
  res.render('index');
});

// CUSTOMERS PAGE ROUTE
app.get('/customers', function(req, res) {
  let queryCustomers = "SELECT customer_id AS 'Customer ID', customer_first_name AS 'First Name', customer_last_name AS 'Last Name', customer_phone AS 'Phone Number', customer_email AS 'Email Address' FROM Customers;"

  db.pool.query(queryCustomers, function (error, rows, fields) {
    res.render('customers', { data: rows });
  })
});

app.post('/add-customer', function (req, res) {
  let data = req.body;

  queryInsertCustomer = `INSERT INTO Customers (customer_first_name, customer_last_name, customer_phone, customer_email) VALUES ('${data.customer_first_name}', '${data.customer_last_name}', '${data.customer_phone}', '${data.customer_email}')`;
  db.pool.query(queryInsertCustomer, function (error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400);
    } else {
      let query1 = 'SELECT * FROM Customers;';
      db.pool.query(query1, function (error, rows, fields) {
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


// ITEMS PAGE ROUTE
app.get('/items', function(req, res) {
  
  let queryItems = "SELECT item_id AS 'Item ID', item_description AS 'Description', item_cost AS 'Cost', pc_format AS 'Format', pc_purpose AS 'Purpose' FROM Items;"

  db.pool.query(queryItems, function (error, rows, fields) {
    res.render('items', { data: rows });
  })
});

app.post('/add-item-ajax', function (req, res) {
  let data = req.body;

  let cost = parseFloat(data.item_cost);
  if (isNaN(cost)) {
    console.log("Invalid parameter for float type.")
    res.sendStatus(400);
  }

  query1 = `INSERT INTO Items (item_description, item_cost, pc_format, pc_purpose) VALUES ('${data.item_description}', '${data.item_cost}', '${data.pc_format}', '${data.pc_purpose}')`;
  db.pool.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      allItemsQuery = `SELECT * FROM Items;`;
      db.pool.query(allItemsQuery, function (error, rows, fields) {
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


// EMPLOYEES PAGE ROUTE
app.get('/employees', function(req, res) {
  let query1;
  // If there is no query string, we just perform a basic SELECT.
  if (req.query.lname === undefined) {
    query1 = "SELECT employee_id AS 'Employee ID', employee_first_name AS 'First Name', employee_last_name AS 'Last Name', employee_phone AS 'Phone Number', employee_email AS 'Email Address' FROM Employees;"
  } else {
    query1 = `SELECT employee_id AS 'Employee ID', employee_first_name AS 'First Name', employee_last_name AS 'Last Name', employee_phone AS 'Phone Number', employee_email AS 'Email Address' FROM Employees WHERE employee_last_name LIKE "${req.query.lname}%";`
  }

  db.pool.query(query1, function(error, rows, fields) {
    res.render('employees', {data: rows});
  })
});

app.post('/add-employee', function(req, res) {
  let data = req.body;
  queryInsertEmployee = `INSERT INTO Employees (employee_first_name, employee_last_name, employee_phone, employee_email) VALUES ('${data.employee_first_name}', '${data.employee_last_name}', '${data.employee_phone}', '${data.employee_email}')`;
  db.pool.query(queryInsertEmployee, function(error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      query2 = `SELECT * FROM Employees;`;
      db.pool.query(query2, function (error, rows, fields) {
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

app.delete('/delete-employee-ajax/', function (req, res) {
  let data = req.body;
  let employeeID = parseInt(data.id);
  let deleteEmployee_EmployeeTable = `DELETE FROM Employees WHERE employee_id = ?`;
  // Run the 1st query
  db.pool.query(deleteEmployee_EmployeeTable, [employeeID], function (error, rows, fields) {
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    }
    else {
      // Since we are just deleting 1 row and don't need to send back any 
      // new data we will send back a status of 204 (No Content) common 
      // for PUT or DELETE.
      res.sendStatus(204);
    }

  })
});

app.put('/put-employee', function(req, res) {
  let data = req.body;

  let phone = data.employee_phone;
  let employee = parseInt(data.fullName);

  let queryUpdatePhone = `UPDATE Employees SET employee_phone = ? where Employees.employee_id = ?`;
  let querySelectAllEmployees = `SELECT * FROM Employees;`
  db.pool.query(queryUpdatePhone, [phone, employee], function(error, rows, fields) {

    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      db.pool.query(querySelectAllEmployees, function(error, rows, fields) {
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


// PC_ORDERS PAGE ROUTES
app.get('/pc-orders', function (req, res) {

  let queryPcorders =   `SELECT Pc_orders.pc_order_id AS 'Order ID', DATE(Pc_orders.order_date) AS 'Purchase Date', CONCAT(
    Customers.customer_first_name,
    ' ',
    Customers.customer_last_name
) AS 'Customer',
CONCAT(
    Employees.employee_first_name,
    ' ',
    Employees.employee_last_name
) AS 'Helped By',
CONCAT(Items.pc_purpose, ' ', Items.pc_format) AS 'Product',
Pc_orders_has_items.quantity AS 'Quantity',
CONCAT(
    '$ ',
    Pc_orders_has_items.quantity * Items.item_cost
) AS 'Sub-Total'
FROM Pc_orders
Join Pc_orders_has_items using (pc_order_id)
Join Customers using (customer_id)
Join Employees using (employee_id)
Join Items using (item_id);`

  db.pool.query(queryPcorders, function (error, rows, fields) {
    res.render('pc-orders', { data: rows });
  })
});

// Pc_orders_has_items page routes
app.get('/pc-orders-has-items', function (req, res) {

  let queryPcorders = "SELECT sub_order_id AS 'Sub ID', pc_order_id AS 'Order ID', item_id AS 'Item ID', quantity AS 'Quantity' FROM Pc_orders_has_items;"

  db.pool.query(queryPcorders, function (error, rows, fields) {
    res.render('pc-orders-has-items', { data: rows });
  })
});


// LISTENER
app.listen(PORT, function () {   // This is the basic syntax for what is called the 'listener' which recieves incoming requests on the specified PORT.
  console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.');
})
