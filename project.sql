DROP TABLE IF EXISTS Pcorders;
DROP TABLE IF EXSITS Pc_orders_has_items;
DROP TABLE IF EXISTS Items;
DROP TABLE IF EXISTS Employees;
DROP TABLE IF EXISTS Customers;

CREATE TABLE Customers (
  customer_id           int not NULL AUTO_INCREMENT,
  customer_first_name   varchar(50) not NULL,
  customer_last_name    varchar(50) not NULL,
  customer_phone        varchar(50) not NULL,
  customer_email        varchar(50) not NULL,
  PRIMARY KEY           (customer_id)
);

CREATE TABLE Employees (
  employee_id           int not NULL AUTO_INCREMENT,
  employee_first_name   varchar(50) not NULL,
  emlployee_last_name   varchar(50) not NULL,
  employee_phone        varchar(50) not NULL,
  emlployee_email       varchar(50) not NULL,
  PRIMARY KEY           (employee_id)
);

CREATE TABLE Items (
  item_id               int not NULL AUTO_INCREMENT,
  item_description      varchar(50) not NULL,
  item_cost             decimal(7,2) not NULL,
  pc_format       varchar(50) not NULL,
  pc_purpose      varchar(50) not NULL,
  PRIMARY KEY           (item_id)
);

CREATE TABLE Pc_orders (
  pc_order_id        int not NULL AUTO_INCREMENT,
  order_date            date not NULL,
  cost                  decimal (9,2) not NULL,
  employee_id           int,
  customer_id           int not NULL,
  PRIMARY KEY           (pc_order_id),
  FOREIGN KEY           (employee_id) REFERENCES Employees(employee_id),
  FOREIGN KEY           (customer_id) REFERENCES Customers(customer_id)
);

CREATE TABLE Pc_orders_has_items (
  pc_order_id        int not NULL,
  item_id               int not NULL,
  quantity              int not NULL,
  FOREIGN KEY           (pc_order_id) REFERENCES Pc_orders(pc_order_id),
  FOREIGN KEY           (item_id) REFERENCES Items(item_id)
);

