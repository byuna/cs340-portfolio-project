-- Abraham Byun and Steven Tran
-- Group 51 
-- Assignment 6 - Final Project
--
-- Data Definition File

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
  order_date date not NULL,
  employee_id int,
  customer_id int not NULL,
  PRIMARY KEY (pc_order_id),
  FOREIGN KEY (employee_id) REFERENCES Employees(employee_id) ON DELETE
  SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (customer_id) REFERENCES Customers(customer_id) ON DELETE CASCADE ON UPDATE CASCADE
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
  FOREIGN KEY (pc_order_id) REFERENCES Pc_orders(pc_order_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (item_id) REFERENCES Items(item_id) ON DELETE CASCADE ON UPDATE CASCADE,
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
  ),
  (
  'Grace',
  'Hopper',
  'ghopper06@yeemail.com',
  '555-222-5155'
  ),
  (
  'Michael',
  'Widenius',
  'micwide@MySQLMail.com',
  '555-333-5555'
  ),
  (
  'Alan',
  'Turing',
  'aturn@twitter.com',
  '555-333-5555'
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
  ('Guy', 
  'Dude', 
  '555-404-1337', 
  'dudeg@tbps.com'
  ),
  (
  'John', 
  'Wick', 
  '555-555-1024', 
  'wickj@tbps.com'
  );

ALTER TABLE Items AUTO_INCREMENT = 1001;
INSERT Items (
  item_description,
  item_cost,
  pc_format,
  pc_purpose
  )
VALUES (
  'oAsus 5000',
  3500.00,
  'Laptop',
  'Gaming'
  ),
  (
  'BrainPad T39',
  5000.00,
  'Desktop',
  'Business'
  ),
  (
  'The best do it all for family homes!',
  1500.00,
  'Desktop',
  'Home'
  ),
  (
  'Ultraportable laptop for your business needs.',
  2349.99,
  'Laptop',
  'Business'
  ),
  (
  'Basic laptop for K-12 students. Affordable and ideal for large classrooms',
  149.99,
  'Laptop',
  'Education'
  ),
  (
  'The latest zTablet 13 Pro Max with 12 cameras.',
  3120.22,
  'Tablet',
  'General'
);

ALTER TABLE Pc_orders AUTO_INCREMENT = 5001;
Insert INTO Pc_orders (
  order_date, 
  customer_id, 
  employee_id)
VALUES (
  "2022-10-01",
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
),
(
  "2022-10-31",
  (
    SELECT customer_id
    FROM Customers
    WHERE customer_id = 2004
  ),
  (
    SELECT employee_id
    FROM Employees
    WHERE employee_id = 2
  )
),
(
  "2022-11-26",
  (
    SELECT customer_id
    FROM Customers
    WHERE customer_id = 2005
  ),
  (
    SELECT employee_id
    FROM Employees
    WHERE employee_id = 1
  )
);
Insert INTO Pc_orders_has_items (
  pc_order_id, 
  item_id, 
  quantity)
VALUES (
    5001,
    (
      SELECT item_id
      from Items
      WHERE pc_purpose = "Gaming"
    ),
    1
  ),
  (
    5001,
    (
      SELECT item_id
      from Items
      WHERE pc_purpose = "Home"
    ),
    2
  ),
  (
    5002,
    (
      SELECT item_id
      from Items
      WHERE pc_purpose = "Business" and pc_format = "Desktop"
    ),
    1
  ),
  (
    5003,
    1003,
    2
  ),
  (
    5004,
    1004,
    2
  ),
  (
    5005,
    1005,
    20
  ),
  (
    5005,
    1001,
    1
  ),
  (
    5005,
    1002,
    1
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