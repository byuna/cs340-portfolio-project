-- Abraham Byun and Steven Tran
-- Group 51 
-- Assignment 6 - Final Project
--
-- DML FILE
-- These are some Database Manipulation queries for a partially implemented PC Store 
-- Project Website using the Tran-Byun PC Suppliers database. The following are the 
-- queries used in our project ordered by the various entity tables.
SET foreign_key_checks = 0;
-------------------------------------------------------------
------------------- Customer Queries ------------------------
-------------------------------------------------------------
-- Shows a table of all the customers and their information
SELECT customer_id AS 'Customer ID',
    customer_first_name AS 'First Name',
    customer_last_name AS 'Last Name',
    customer_phone AS 'Phone Number',
    ustomer_email AS 'Email Address'
FROM Customers;
-- Filter customers by Name Query
SELECT customer_id AS 'Customer ID',
    customer_first_name AS 'First Name',
    customer_last_name AS 'Last Name',
    customer_phone AS 'Phone Number',
    customer_email AS 'Email Address'
FROM Customers
WHERE customer_last_name LIKE :SEARCH_INPUT
    OR customer_first_name LIKE :SEARCH_INPUT;
-- Update a customers' phone number
UPDATE Customers
SET customer_phone = ?
where Customers.customer_id = :CUSTOMER_ID_INPUT;
-- Delete a Customer
DELETE FROM Customers
WHERE customer_id = :CUSTOMER_ID_INPUT;
-------------------------------------------------------------
--------------------- Items Queries -------------------------
-------------------------------------------------------------
-- Show all Items available to add to an order
SELECT item_id AS 'Item ID',
    item_description AS 'Description',
    CONCAT('$', FORMAT(item_cost, '2')) AS 'Cost',
    pc_format AS 'Format',
    pc_purpose AS 'Purpose'
FROM Items;
-- Create/Insert a New Item
INSERT INTO Items (
        item_description,
        item_cost,
        pc_format,
        pc_purpose
    )
VALUES (
        :item_description,
        :item_cost,
        :pc_format,
        :pc_purpose
    );
-- DELETE an Item that is no Longer Sold
DELETE FROM Items
WHERE item_id = :ITEM_ID;
-------------------------------------------------------------
--------------------- Employees Queries ---------------------
-------------------------------------------------------------
-- Read/shows all the Employees with Relevant Information
SELECT employee_id AS 'Employee ID',
    employee_first_name AS 'First Name',
    employee_last_name AS 'Last Name',
    employee_phone AS 'Phone Number',
    employee_email AS 'Email Address'
FROM Employees;
-- Read/Show Employees with Last Name Similar to Search Query
SELECT employee_id AS 'Employee ID',
    employee_first_name AS 'First Name',
    employee_last_name AS 'Last Name',
    employee_phone AS 'Phone Number',
    employee_email AS 'Email Address'
FROM Employees
WHERE employee_last_name LIKE :LAST_NAME_SEARCH_QUERY;
-- Add/Insert A New Employee
INSERT INTO Employees (
        employee_first_name,
        employee_last_name,
        employee_phone,
        employee_email
    )
VALUES (
        :employee_first_name,
        :employee_last_name,
        :employee_phone,
        :employee_email
    );
-- Delete An Existing Employee
DELETE FROM Employees
WHERE employee_id = :EMPLOYEE_ID;
-- Update an Employee's Phone Number
UPDATE Employees
SET employee_phone = :NEW_EMPLOYEE_PHONE_NUMBER
where Employees.employee_id = :SELECTED_EMPLOYEE_ID 
-- Read/Search query for any name (first or last)
SELECT *
FROM Employees
WHERE Employees.employee_first_name LIKE :someName
    OR Employees.employee_last_name LIKE :someName;
-------------------------------------------------------------
--------------------- PC Orders Queries ---------------------
-------------------------------------------------------------
-- Read all PC Orders Placed and Total Cost
SELECT Pc_orders.pc_order_id AS "Order ID",
    DATE_FORMAT(Pc_orders.order_date, '%Y-%m-%d') AS "Purchase Date",
    CONCAT(
        Customers.customer_first_name,
        ' ',
        Customers.customer_last_name
    ) AS "Customer",
    CONCAT(
        Employees.employee_first_name,
        ' ',
        Employees.employee_last_name
    ) AS "Helped By",
    CONCAT(
        '$',
        FORMAT(
            SUM(Items.item_cost * Pc_orders_has_items.quantity),
            '2'
        )
    ) AS "Total"
FROM Pc_orders
    LEFT JOIN Pc_orders_has_items using (pc_order_id)
    LEFT JOIN Customers using (customer_id)
    LEFT JOIN Employees using (employee_id)
    LEFT JOIN Items using (item_id)
GROUP BY Pc_orders.pc_order_id;
-- Create/Insert a new PC Order
START TRANSACTION;
Insert INTO Pc_orders (order_date, customer_id)
VALUES (
        :ORDER_DATE,
        (
            SELECT customer_id
            FROM Customers
            WHERE customer_id = :CUSTOMER_ID
        )
    );
Insert INTO Pc_orders_has_items (pc_order_id, item_id, quantity)
VALUES (LAST_INSERT_ID(), :ITEM_ID, :ITEM_QUANTITY);
COMMIT;
;
-- Delete a PC Order
DELETE FROM Pc_orders
WHERE Pc_order_id = :PC_ORDER_ID;
-- Update a PC Order to be Fullfilled by an Employee
SELECT Pc_orders.pc_order_id,
    CONCAT(
        Employees.employee_first_name,
        ' ',
        Employees.employee_last_name
    ) AS "employee_id"
FROM Pc_orders
    LEFT JOIN Employees using (employee_id)
WHERE pc_order_id = :PC_ORDER_ID;
-------------------------------------------------------------
----------------- PC Orders Has Item Queries ----------------
-------------------------------------------------------------
-- Read/Display All the M:1 relationships of the Items/Quantity from each Pc Order
SELECT sub_order_id AS 'Sub Order ID',
    pc_order_id AS 'PC Order ID',
    item_id AS 'Item ID',
    CONCAT('$', FORMAT(Items.item_cost, '2')) as 'Cost Per Unit',
    quantity AS 'Quantity'
FROM Pc_orders_has_items
    JOIN Items using (item_id)
ORDER BY sub_order_id;
-- Read/Filter Only for the Items within a Searched PC Order
SELECT sub_order_id AS 'Sub Order ID',
    pc_order_id AS 'PC Order ID',
    item_id AS 'Item ID',
    CONCAT('$', FORMAT(Items.item_cost, '2')) as 'Cost Per Unit',
    quantity AS 'Quantity'
FROM Pc_orders_has_items
    JOIN Items using (item_id)
WHERE pc_order_id = :PC_ORDER_ID;
-- Adding/Inserting an Item(s) to an Existing PC Order
Insert INTO Pc_orders_has_items (pc_order_id, item_id, quantity)
VALUES (:PC_ORDER_ID, :ITEM_ID, :ITEM_QUANTITY);
-- Updating the Items from a Sub Order (Item in PC Order)
UPDATE Pc_orders_has_items
SET quantity = :NEW_QUANTITY
WHERE sub_order_id = :SUB_ORDER_ID;
-------------------------------------------------------------
------------------- Miscellaneous Queries -------------------
-------------------------------------------------------------
-- These were queries that may potentially be added in the future.
--
-- Shows all the Pc_orders and associate customer/workers, product and quantity
SELECT Pc_orders.pc_order_id AS "Order ID",
    DATE(Pc_orders.order_date) AS "Purchase Date",
    CONCAT(
        Customers.customer_first_name,
        ' ',
        Customers.customer_last_name
    ) AS "Customer",
    CONCAT(
        Employees.employee_first_name,
        ' ',
        Employees.employee_last_name
    ) AS "Helped By",
    CONCAT(Items.pc_purpose, " ", Items.pc_format) AS "Product",
    Pc_orders_has_items.quantity AS "Quantity",
    CONCAT(
        "$ ",
        Pc_orders_has_items.quantity * Items.item_cost
    ) AS "Sub-Total"
FROM Pc_orders
    Join Pc_orders_has_items using (pc_order_id)
    Join Customers using (customer_id)
    Join Employees using (employee_id)
    Join Items using (item_id);
-- Get a list of all customers who have placed an order within the last 3 months
SELECT CONCAT(customer_first_name, ' ', customer_last_name) AS "Customer Name",
    Pc_orders.order_date AS "Order Date",
    Pc_orders.cost AS "Spent ($)"
FROM Customers
    INNER JOIN Pc_orders on Pc_orders.customer_id = Customers.customer_id
WHERE Pc_orders.order_date > DATE(NOW() - INTERVAL 3 MONTH);
SET foreign_key_checks = 1;