-- These are some Database Manipulation queries for a partially implemented PC Store 
-- Project Website using the Tran-Byun PC Suppliers database.
SET foreign_key_checks = 0;

-- Get the list of employees and their contact information
SELECT employee_id AS ID,
    CONCAT(employee_first_name, ' ', employee_last_name) AS "Employee Name",
    employee_phone as "Phone Number",
    employee_email as "Email Address"
FROM Employees;

-- Get a list of all customers who have placed an order within the last 3 months
SELECT CONCAT(customer_first_name, ' ', customer_last_name) AS "Customer Name",
    Pc_orders.order_date AS "Order Date",
    Pc_orders.cost AS "Spent ($)"
FROM Customers
    INNER JOIN Pc_orders on Pc_orders.customer_id = Customers.customer_id
WHERE Pc_orders.order_date > DATE(NOW() - INTERVAL 3 MONTH);

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


-- Delete old customer
DELETE FROM Customers WHERE customer_id = :customer_id_entered_by_user;

-- Delete ex-employee
DELETE FROM Employees WHERE employee_id = :employee_id_to_be_removed;

-- Delete an item thats Overcome by Events (OBE) / No longer sold
DELETE FROM Items WHERE item_id = :some_item_id;

-- Remove certain type of PCs from an order
DELETE FROM Pc_orders_has_items where item_id = :someItemID

-- Update item quantity from a specific order
UPDATE Pc_orders_has_items
SET quantity = :quantiy_entered_by_user
WHERE pc_order_id = :pc_order_id

-- Show items and their sub totals from a specific order id
SELECT Items.pc_purpose, Items.pc_format, Pc_orders_has_items.quantity,  Items.item_cost, Pc_orders_has_items.quantity * Items.item_cost AS "Sub Total"
FROM Pc_orders
RIGHT Join Pc_orders_has_items using (pc_order_id)
RIGHT Join Items using (item_id)
WHERE pc_order_id = pc_order_id;