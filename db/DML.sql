-- DML FILE
-- These are some Database Manipulation queries for a partially implemented PC Store 
-- Project Website using the Tran-Byun PC Suppliers database.
SET foreign_key_checks = 0;
-- Get the list of employees and their contact information
SELECT employee_id AS ID,
    CONCAT(employee_first_name, ' ', employee_last_name) AS "Employee Name",
    employee_phone as "Phone Number",
    employee_email as "Email Address"
FROM Employees;
-- Shows a list of all employees and their information
SELECT *
FROM Employees;
-- Shows a list of all the customers and their information
SELECT *
FROM Customers;
-- Shows all the Pc_orders that have been placed
SELECT *

-- Search query for any name (first or last)
SELECT * FROM Employees 
WHERE Employees.employee_first_name LIKE :someName OR 
Employees.employee_last_name LIKE :someName;

FROM Pc_orders;
-- Filter for Employee by last name
SELECT 
    employee_id AS 'Employee ID', 
    employee_first_name AS 'First Name', 
    employee_last_name AS 'Last Name', 
    employee_phone AS 'Phone Number', 
    employee_email AS 'Email Address' 
FROM Employees 
WHERE employee_last_name LIKE :lastName;

-- Showing the quantities of an item from each order
SELECT *
FROM Pc_orders_has_items;
-- Shows a list of all the items available for purchasing
SELECT *
From Items;
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
-- SELECT 
-- Get a list of all customers who have placed an order within the last 3 months
SELECT CONCAT(customer_first_name, ' ', customer_last_name) AS "Customer Name",
    Pc_orders.order_date AS "Order Date",
    Pc_orders.cost AS "Spent ($)"
FROM Customers
    INNER JOIN Pc_orders on Pc_orders.customer_id = Customers.customer_id
WHERE Pc_orders.order_date > DATE(NOW() - INTERVAL 3 MONTH);
-- Search from a Dynamically populated list; items that meet a certain purpose.
-- See all available items that meets their purpose (business, gaming, etc.)
SELECT *
FROM Items
WHERE Items.pc_format = :pc_format :type;
-- Add a new customer
INSERT Customers (
        customer_first_name,
        customer_last_name,
        customer_email,
        customer_phone
    )
VALUES (
        :firstName,
        :lastName,
        :customerEmail,
        :customerPhoneNumber
    );
-- Add a new employee
INSERT Employees (
        employee_first_name,
        employee_last_name,
        employee_email,
        employee_phone
    )
VALUES (
        :firstName,
        :lastName,
        :employeeEmail,
        :employeePhoneNumber
    );
-- Add a new pc related item to the store
INSERT Items (
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
-- Add an item to an order by pc purpose and quantity
Insert INTO Pc_orders_has_items (pc_order_id, item_id, quantity)
VALUES (
        :pc_order_id,
        (
            SELECT item_id
            from Items
            WHERE pc_purpose = :pc_purpose
        ),
        :item_quantity
    );

-- Delete old customer
DELETE FROM Customers
WHERE customer_id = :customer_id_entered_by_user;
-- Delete ex-employee
DELETE FROM Employees
WHERE employee_id = :employee_id_to_be_removed;
-- Delete an item thats Overcome by Events (OBE) / No longer sold
DELETE FROM Items
WHERE item_id = :some_item_id;
-- Remove certain type of PCs from an order
DELETE FROM Pc_orders_has_items
where item_id = :someItemID;
-- Update item quantity from a specific order
UPDATE Pc_orders_has_items
SET quantity = :quantity_entered_by_user
WHERE pc_order_id = :pc_order_id
    and item_id = :item_id;

-- Show items and their sub totals from a specific order id
SELECT Items.pc_purpose,
    Items.pc_format,
    Pc_orders_has_items.quantity,
    Items.item_cost,
    Pc_orders_has_items.quantity * Items.item_cost AS "Sub Total"
FROM Pc_orders
    RIGHT Join Pc_orders_has_items using (pc_order_id)
    RIGHT Join Items using (item_id)
WHERE pc_order_id = :pc_order_id;

-- Display PC Orders Made and Their Accumulated Total
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
    CONCAT(
        "$ ",
        SUM(Pc_orders_has_items.quantity * Items.item_cost)
    ) AS "Total"
FROM Pc_orders
    Join Pc_orders_has_items using (pc_order_id)
    Join Customers using (customer_id)
    Join Employees using (employee_id)
    Join Items using (item_id)
GROUP BY Pc_orders.pc_order_id;

-- [NEW 11/16/22] Create a new Pc_order and add an item to that order
-- Use for Pc_orders CREATE/ADD
START TRANSACTION;
Insert INTO Pc_orders (order_date, customer_id)
VALUES (
        :order_date,
        (
            SELECT customer_id
            FROM Customers
            WHERE customer_id = :customer_id
        )
    );
Insert INTO Pc_orders_has_items (pc_order_id, item_id, quantity)
VALUES (
    LAST_INSERT_ID(),
    :item_id,
    :item_quantity
  );
COMMIT;

-- [NEW 11/16/22] Update Query to update an Order to Add an Employee to it
-- use for Pc_orders Updating
UPDATE Pc_orders
SET employee_id = :employee_id_that_helped_customer
WHERE pc_order_id = :pc_order_id;


-- IN WORK
SELECT 
Pc_orders.pc_order_id as "Order ID",
Pc_orders_has_items.sub_order_id as "SubID",
 CONCAT(
        Customers.customer_first_name,
        ' ',
        Customers.customer_last_name
    ) AS "Customer",
Items.pc_purpose As "Purpose",
    Items.pc_format AS "Format",
    Pc_orders_has_items.quantity AS "Quantity",
    Items.item_cost AS "Cost",
    Pc_orders_has_items.quantity * Items.item_cost AS "Sub Total"
FROM Pc_orders
Right Join Customers using (customer_id)
    RIGHT Join Pc_orders_has_items using (pc_order_id)
    RIGHT Join Items using (item_id)
WHERE pc_order_id = :SOME_PC_ORDER_ID;