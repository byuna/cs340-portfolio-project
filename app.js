/*
    SETUP
*/

// Express setup
var express = require('express');   // We are using the express library for the web server.
var app = express();                // We need to instantiate an express object to interact with the server in our code.
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
PORT = 32147

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

// #region Customers Page Routes
app.get('/customers', function(req, res) {
  let queryCustomers;

  if (req.query.searchName === undefined) {
    queryCustomers = "SELECT customer_id AS 'Customer ID', customer_first_name AS 'First Name', customer_last_name AS 'Last Name', customer_phone AS 'Phone Number', customer_email AS 'Email Address' FROM Customers;"
  } else {
    queryCustomers = `SELECT customer_id AS 'Customer ID', customer_first_name AS 'First Name', customer_last_name AS 'Last Name', customer_phone AS 'Phone Number', customer_email AS 'Email Address' FROM Customers WHERE customer_last_name LIKE "%${req.query.searchName}%" OR customer_first_name LIKE "%${req.query.searchName}%";`
  }
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

app.delete('/delete-customer-ajax/', function(req, res, next) {
  let data = req.body;
  let customerId = parseInt(data.id);
  let deleteCustomer = `DELETE FROM Customers WHERE customer_id = ?`;

  db.pool.query(deleteCustomer, [customerId], function(error, rows, fields) {
    if (error) {
      console.log(error);
      console.log("almost there");
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }
  })
});

app.put('/put-customer', function(req, res) {
  let data = req.body;

  let phone = data.customer_phone;
  let customer = parseInt(data.fullName);

  let queryUpdatePhone = `UPDATE Customers SET customer_phone = ? where Customers.customer_id = ?`;
  let querySelectAllCustomers = `SELECT * FROM Customers WHERE customer_id = ?;`
  db.pool.query(queryUpdatePhone, [phone, customer], function(error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      db.pool.query(querySelectAllCustomers, [customer], function(error, rows, fields) {
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

//#endregion


// #region ITEMS PAGE ROUTE
app.get('/items', function(req, res) {
  
  let queryItems = `SELECT item_id AS 'Item ID', 
  item_description AS 'Description', 
  CONCAT('$', FORMAT(item_cost, '2')) AS 'Cost', 
  pc_format AS 'Format', 
  pc_purpose AS 'Purpose' 
  FROM Items;`

  db.pool.query(queryItems, function (error, rows, fields) {
    res.render('items', { data: rows });
  })
});

app.post('/add-item-ajax', function (req, res) {
  let data = req.body;

  let cost = parseFloat(data.item_cost);
  if (isNaN(cost)) {
    cost = NULL
  }
  console.log(cost)
  if (data.item_description == '') {
    data.item_description = NULL
  }

  if (data.pc_format == "") {
    data.pc_format = NULL
  }

  if (data.pc_purpose == "") {
    data.pc_purpose = NULL
  }

  query1 = `INSERT INTO Items (item_description, item_cost, pc_format, pc_purpose) 
  VALUES ('${data.item_description}', '${data.item_cost}', '${data.pc_format}', '${data.pc_purpose}')`;

  db.pool.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {

      allItemsQuery = `SELECT item_id,
      item_description,
      CONCAT('$', FORMAT(item_cost, '2')) AS 'item_cost', 
      pc_format,
      pc_purpose
      FROM Items;`;

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

app.delete('/delete-item-ajax/', function(req, res, next) {
  let data = req.body;
  let itemId = parseInt(data.id);
  let deleteItem = `DELETE FROM Items WHERE item_id = ?`;

  db.pool.query(deleteItem, [itemId], function(error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }
  })
});
// #endregion

// #region EMPLOYEES PAGE ROUTE
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
  let querySelectAllEmployees = `SELECT * FROM Employees WHERE employee_id = ?;`
  db.pool.query(queryUpdatePhone, [phone, employee], function(error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      db.pool.query(querySelectAllEmployees, [employee], function(error, rows, fields) {
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
// #endregion

// #region PC_ORDERS PAGE ROUTES
app.get('/pc-orders', function (req, res) {

  let queryPcorders =   `SELECT Pc_orders.pc_order_id AS "Order ID",
  DATE_FORMAT(Pc_orders.order_date, '%Y-%m-%d') AS "Purchase Date",
  CONCAT(Customers.customer_first_name, ' ', Customers.customer_last_name) AS "Customer",
  CONCAT(Employees.employee_first_name, ' ', Employees.employee_last_name) AS "Helped By",
  CONCAT('$', FORMAT(SUM(Items.item_cost * Pc_orders_has_items.quantity), '2')) AS "Total"
  FROM Pc_orders
  LEFT JOIN Pc_orders_has_items using (pc_order_id)
  LEFT JOIN Customers using (customer_id)
  LEFT JOIN Employees using (employee_id)
  LEFT JOIN Items using (item_id)
  GROUP BY Pc_orders.pc_order_id;`

  let employeeQuery = `SELECT employee_id, employee_first_name, employee_last_name FROM Employees;`;
  let customerQuery = `SELECT customer_id, customer_first_name, customer_last_name FROM Customers;`;
  let itemQuery = `SELECT item_id, pc_purpose, pc_format FROM Items;`

  db.pool.query(queryPcorders, function (error, rows, fields) {
    let pc_orders = rows;
    db.pool.query(employeeQuery, (error, rows, fields) => {
      let employees = rows;
      db.pool.query(customerQuery, (error, rows, fields) => {
        let customers = rows;
        db.pool.query(itemQuery, (error, rows, fields) => {
          let items = rows;
          return res.render('pc-orders', {data: pc_orders, employees: employees, customers: customers, items: items});
        })
      })
    })
  })
});

app.post('/add-pc_orders-ajax', function(req, res) {
  let data = req.body;

  let queryPcorders = `SELECT Pc_orders.pc_order_id AS "pc_order_id",
                      DATE_FORMAT(Pc_orders.order_date, '%Y-%m-%d') AS "order_date",
                      CONCAT(Customers.customer_first_name, ' ', Customers.customer_last_name) AS "customer_id",
                      CONCAT(Employees.employee_first_name, ' ', Employees.employee_last_name) AS "employee_id",
                      CONCAT('$', FORMAT(SUM(Items.item_cost * Pc_orders_has_items.quantity), '2')) AS "total"
                      FROM Pc_orders
                      LEFT JOIN Pc_orders_has_items using (pc_order_id)
                      LEFT JOIN Customers using (customer_id)
                      LEFT JOIN Employees using (employee_id)
                      LEFT JOIN Items using (item_id)
                      GROUP BY Pc_orders.pc_order_id;`

  let queryNew = `START TRANSACTION; 
    Insert INTO Pc_orders (order_date, customer_id) 
    VALUES ('${data.order_date}', 
    (SELECT customer_id FROM Customers WHERE customer_id = '${data.customer_id}')); 
    Insert INTO Pc_orders_has_items (pc_order_id, item_id, quantity) 
    VALUES (LAST_INSERT_ID(), '${data.item_id}', '${data.quantity}');COMMIT;`;

  db.pool.query(queryNew, function(error, rows, fields) {
    if (error) {
      console.log(error + ' Pc_orders INSERT failed.');
      res.sendStatus(400);
    } else {
      db.pool.query(queryPcorders, function(error, rows, fields) {
        if (error) {
          console.log(error + "Item insert failed");
          res.sendStatus(400);
        } else {
          res.send(rows);
        }
      })
    }
  })          
});

app.delete('/delete-pc_order-ajax', function(req, res, next) {
  let data = req.body;
  let pcOrderId = parseInt(data.id);
  let deletePcOrder = `DELETE FROM Pc_orders WHERE Pc_order_id = ?`;

  db.pool.query(deletePcOrder, [pcOrderId], function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }
  })
});


app.put('/put-pc-order-ajax', function(req, res) {
  let data = req.body;

  let orderId = parseInt(data.orderId);
  let employee = data.employee;

  if (!isNaN(employee)) {
    employee = parseInt(data.employee);
  } else {
    employee = null;
  }



  let queryUpdatePcOrders = `UPDATE Pc_orders SET employee_id = ? WHERE pc_order_id = ?;`;
  let selectPcOrder = `SELECT Pc_orders.pc_order_id,
                      CONCAT(Employees.employee_first_name, ' ', Employees.employee_last_name) AS "employee_id"
                      FROM Pc_orders 
                      LEFT JOIN Employees using (employee_id)
                      WHERE pc_order_id = ?;`
  db.pool.query(queryUpdatePcOrders, [employee, orderId], function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      db.pool.query(selectPcOrder, [orderId], function (error, rows, fields) {
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
// #endregion


// #region PC ORDERS HAS ITEMS ROUTES
app.get('/pc-orders-has-items', function (req, res) {

  if (req.query.poid == '') {
    req.query.poid = undefined;
  };

  let selectPcOrdersHasItems;
  
  if (req.query.poid === undefined) {
    selectPcOrdersHasItems = `SELECT sub_order_id AS 'Sub Order ID', 
    pc_order_id AS 'PC Order ID', 
    item_id AS 'Item ID',
    CONCAT('$', FORMAT(Items.item_cost, '2')) as 'Cost Per Unit', 
    quantity AS 'Quantity' 
    FROM Pc_orders_has_items
    JOIN Items using (item_id)
    ORDER BY sub_order_id;`
  } else {
    selectPcOrdersHasItems = `SELECT sub_order_id AS 'Sub Order ID', 
    pc_order_id AS 'PC Order ID', 
    item_id AS 'Item ID',
    CONCAT('$', FORMAT(Items.item_cost, '2')) as 'Cost Per Unit', 
    quantity AS 'Quantity' 
    FROM Pc_orders_has_items
    JOIN Items using (item_id)
    WHERE pc_order_id = "${req.query.poid}";`
  }

  let selectAllItems = `SELECT * FROM Items;`;
  let selectAllPcOrders = `SELECT * FROM Pc_orders;`
  
  db.pool.query(selectPcOrdersHasItems, function (error, rows, fields) {
    let Pc_orders_has_items = rows;
    db.pool.query(selectAllItems, function (error, rows, fields) {
      let items = rows;
      db.pool.query(selectAllPcOrders, function (error, rows, fields) {
        let pc_orders = rows;
        res.render('pc-orders-has-items', {data: Pc_orders_has_items, items: items, pc_orders: pc_orders});
      })
    })
  })
});

app.post('/add-pc-orders-has-items', function (req, res) {
  let data = req.body;
  queryAddPcOrderHasItems = `Insert INTO Pc_orders_has_items (pc_order_id, item_id, quantity)
  VALUES ('${data.pc_order_id}', '${data.item_id}', '${data.quantity}')`;

  db.pool.query(queryAddPcOrderHasItems, function (error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400);
    } else {
      let query2 = `SELECT sub_order_id,
      pc_order_id,
      item_id,
      CONCAT('$', FORMAT(Items.item_cost, '2')) AS 'cost_per_unit',
      quantity
      FROM Pc_orders_has_items
      JOIN Items using(item_id);`;

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

app.delete('/delete-pc-orders-has-items-ajax', function(req, res) {
  let data = req.body;
  let subId = parseInt(data.id);
  let deletePcOrderPart = `DELETE FROM Pc_orders_has_items WHERE sub_order_id = ?;`;

  db.pool.query(deletePcOrderPart, [subId], function(error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }
  })
});

app.put('/put-pc-orders-has-items-ajax', function (req, res) {
  let data = req.body;
  let subOrderId = parseInt(data.sub_order_id);
  let quantity = parseInt(data.quantity);

  let queryUpdatePcOrdersHasItems = `UPDATE Pc_orders_has_items SET quantity = ? WHERE sub_order_id = ?;`;
  let selectPcOrdersHasItems = `SELECT * FROM Pc_orders_has_items WHERE sub_order_id = ?;`;

  db.pool.query(queryUpdatePcOrdersHasItems, [quantity, subOrderId], function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      db.pool.query(selectPcOrdersHasItems, [subOrderId], function (error, rows, fields) {
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
// #endregion

// LISTENER
app.listen(PORT, function () {   // This is the basic syntax for what is called the 'listener' which recieves incoming requests on the specified PORT.
  console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.');
})
