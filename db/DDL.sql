SET foreign_key_checks = 0;
DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Employees;
DROP TABLE IF EXISTS Pc_orders;
DROP TABLE IF EXISTS Pc_orders_has_items;
DROP TABLE IF EXISTS Items;

-- Creation Tables
CREATE TABLE Customers (
  customer_id int not NULL AUTO_INCREMENT,
  customer_first_name varchar(45) not NULL,
  customer_last_name varchar(45) not NULL,
  customer_phone varchar(45) not NULL,
  customer_email varchar(45) not NULL,
  PRIMARY KEY (customer_id)

);

CREATE TABLE Employees (

  employee_id int not NULL AUTO_INCREMENT,
  employee_first_name varchar(45) not NULL,
  employee_last_name varchar(45) not NULL,
  employee_phone varchar(45) not NULL,
  employee_email varchar(45) not NULL,
  PRIMARY KEY (employee_id)

);

CREATE TABLE Pc_orders (
  pc_order_id int not NULL AUTO_INCREMENT,
  order_date datetime not NULL,
  cost decimal (9, 2) not NULL,
  employee_id int,
  customer_id int not NULL,
  PRIMARY KEY (pc_order_id),
  FOREIGN KEY (employee_id) REFERENCES Employees(employee_id) ON DELETE SET NULL,
  FOREIGN KEY (customer_id) REFERENCES Customers(customer_id) ON DELETE CASCADE

);

CREATE TABLE Items (

  item_id int not NULL AUTO_INCREMENT,
  item_description varchar(45) not NULL,
  item_cost decimal(7, 2) not NULL,
  pc_format varchar(45) not NULL,
  pc_purpose varchar(45) not NULL,
  PRIMARY KEY (item_id)

);

CREATE TABLE Pc_orders_has_items (
  sub_order_id int not NULL AUTO_INCREMENT,
  pc_order_id int not NULL,
  item_id int not NULL,
  quantity int not NULL,
  FOREIGN KEY (pc_order_id) REFERENCES Pc_orders(pc_order_id) ON DELETE CASCADE,
  FOREIGN KEY (item_id) REFERENCES Items(item_id) ON DELETE CASCADE,
  PRIMARY KEY (sub_order_id)

);


-- Insertion Data
ALTER TABLE Customers AUTO_INCREMENT = 2001;
INSERT Customers (
    customer_first_name,
    customer_last_name,
    customer_email,
    customer_phone
  )
VALUES (
    'John',
    'Smith',
    'johnsmith@yeemail.com',
    '555-123-4567'
  ),
  (
    'Tom',
    'Ati',
    'tomato9000@yeemail.com',
    '555-7600-9991'
  ),
  (
    'Stanley',
    'Yelnats',
    'stanleyyelnats@yeemail.com',
    '555-413-5454'
  );
INSERT Employees (
    employee_first_name,
    employee_last_name,
    employee_phone,
    employee_email
  )
VALUES (
    'Atticus',
    'Finch',
    '555-123-9874',
    'fincha@tbps.com'
  ),
  ('Guy', 'Dude', '555-404-1337', 'dudeg@tbps.com'),
  ('John', 'Wick', '555-555-1024', 'wickj@tbps.com');
ALTER TABLE Items AUTO_INCREMENT = 10001;
INSERT Items (
    item_description,
    item_cost,
    pc_format,
    pc_purpose
  )
VALUES (
    'The next gen portable gaming Laptop!',
    3500.00,
    'laptop',
    'gaming'
  ),
  (
    'Intellitron 5000 for Businesses!',
    5000.00,
    'desktop',
    'business'
  ),
  (
    'The best do it all for family homes!',
    1500.00,
    'desktop',
    'home'
  );
ALTER TABLE Pc_orders AUTO_INCREMENT = 5000001;
Insert INTO Pc_orders (order_date, cost, customer_id, employee_id)
VALUES (
    "2022-10-01",
    5000.00,
    (
      SELECT customer_id
      FROM Customers
      WHERE customer_id = 2001
    ),
    (
      SELECT employee_id
      FROM Employees
      WHERE employee_id = 1
    )
  ),
  (
    "2022-06-04",
    5000.00,
    (
      SELECT customer_id
      FROM Customers
      WHERE customer_id = 2002
    ),
    (
      SELECT employee_id
      FROM Employees
      WHERE employee_id = 2
    )
  ),
  (
    "2022-10-05",
    3000.00,
    (
      SELECT customer_id
      FROM Customers
      WHERE customer_id = 2003
    ),
    (
      SELECT employee_id
      FROM Employees
      WHERE employee_id = 3
    )
  );
Insert INTO Pc_orders_has_items (pc_order_id, item_id, quantity)
VALUES (
    5000001,
    (
      SELECT item_id
      from Items
      WHERE pc_purpose = "gaming"
    ),
    1
  ),
  (
    5000001,
    (
      SELECT item_id
      from Items
      WHERE pc_purpose = "home"
    ),
    1
  ),
  (
    5000002,
    (
      SELECT item_id
      from Items
      WHERE pc_purpose = "business"
    ),
    1
  ),
  (
    5000003,
    (
      SELECT item_id
      from Items
      WHERE pc_purpose = "home"
    ),
    2
  );
  -- Show all tables
SELECT *
FROM Customers;
SELECT *
FROM Employees;
SELECT *
FROM Items;
SELECT *
FROM Pc_orders;
SELECT *
FROM Pc_orders_has_items;
SET FOREIGN_KEY_CHECKS = 1;
COMMIT;