SET foreign_key_checks = 0;
DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Employees;
DROP TABLE IF EXISTS Pc_orders;
DROP TABLE IF EXISTS Pc_orders_has_items;
DROP TABLE IF EXISTS Items;
SET foreign_key_checks = 1;

-- Creation Tables
CREATE TABLE Customers (
  customer_id             int not NULL AUTO_INCREMENT,
  customer_first_name     varchar(50) not NULL,
  customer_last_name      varchar(50) not NULL,
  customer_phone          varchar(50) not NULL,
  customer_email          varchar(50) not NULL,
  PRIMARY KEY             (customer_id)
);

CREATE TABLE Employees (
  employee_id             int not NULL AUTO_INCREMENT,
  employee_first_name     varchar(50) not NULL,
  employee_last_name      varchar(50) not NULL,
  employee_phone          varchar(50) not NULL,
  employee_email          varchar(50) not NULL,
  PRIMARY KEY             (employee_id)
);

CREATE TABLE Pc_orders (
  pc_order_id             int not NULL AUTO_INCREMENT,
  order_date              date not NULL,
  cost                    decimal (9, 2) not NULL,
  employee_id             int,
  customer_id             int not NULL,
  PRIMARY KEY             (pc_order_id),
  FOREIGN KEY             (employee_id) REFERENCES Employees(employee_id),
  FOREIGN KEY             (customer_id) REFERENCES Customers(customer_id)
);

CREATE TABLE Items (
  item_id                 int not NULL AUTO_INCREMENT,
  item_description        varchar(50) not NULL,
  item_cost               decimal(7, 2) not NULL,
  pc_format               varchar(50) not NULL,
  pc_purpose              varchar(50) not NULL,
  PRIMARY KEY             (item_id)
);

CREATE TABLE Pc_orders_has_items (
  pc_order_id             int not NULL,
  item_id                 int not NULL,
  quantity                int not NULL,
  FOREIGN KEY             (pc_order_id) REFERENCES Pc_orders(pc_order_id),
  FOREIGN KEY             (item_id) REFERENCES Items(item_id)
);


ALTER TABLE Customers AUTO_INCREMENT = 1001;
-- Insertion Data

INSERT Customers (customer_first_name, customer_last_name, customer_phone, customer_email)
VALUES  ('John', 'Smith', 'johnsmith@yeemail.com', '555-123-4567'),
        ('Tom', 'Ati', 'tomato9000@yeemail.com', '555-7600-9991'),
        ('Stanley', 'Yelnats', 'stanleyyelnats@yeemail.com', '555-413-5454');
-- Show all tables

INSERT Employees (employee_first_name, employee_last_name, employee_phone, employee_email)
VALUES  ('Atticus', 'Finch', '555-123-9874', 'fincha@tbps.com'),
        ('Guy', 'Dude', '555-404-1337', 'dudeg@tbps.com'),
        ('John', 'Wick', '555-555-1024', 'wickj@tbps.com');

INSERT Items (item_description, item_cost, pc_format, pc_purpose)
VALUES  ('The next gen portable gaming Laptop!', 3500, 'laptop', 'gaming'),
        ('Intellitron 5000 for Businesses!', 5000, 'desktop', 'business'),
        ('The best do it all for family homes!', 1500, 'desktop', 'home');



SELECT * FROM Customers;
-- SELECT *
-- FROM Employees;
-- SELECT *
-- FROM Pc_orders;
-- SELECT *
-- FROM Pc_orders_has_items;
-- SELECT *
-- FROM Items;
-- SET FOREIGN_KEY_CHECKS = 1;
-- COMMIT;