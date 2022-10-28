-- These are some Database Manipulation queries for a partially implemented PC Store 
-- Project Website using the Tran-Byun PC Suppliers database.
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

-- Delete an item thats Overcome by Events (OBE) / No longer sold
DELETE FROM Items WHERE item_id = :some_item_id;


-- Get a customers information for 
-- SELECT bsg_people.character_id, fname, lname, bsg_planets.name AS homeworld, age 
-- FROM bsg_people INNER JOIN bsg_planets ON homeworld = bsg_planets.planet_id
-- -- get a single character's data for the Update People form
-- SELECT character_id, fname, lname, homeworld, age FROM bsg_people WHERE 
-- character_id = :character_ID_selected_from_browse_character_page
-- -- get all character's data to populate a dropdown for associating with a certificate  
-- SELECT character_id AS pid, fname, lname FROm bsg_people 
-- -- get all certificates to populate a dropdown for associating with people
-- SELECT certification_id AS cid, title FROM bsg_cert
-- -- get all peoople with their current associated certificates to list
-- SELECT pid, cid, CONCAT(fname,' ',lname) AS name, title AS certificate 
-- FROM bsg_people 
-- INNER JOIN bsg_cert_people ON bsg_people.character_id = bsg_cert_people.pid 
-- INNER JOIN bsg_cert on bsg_cert.certification_id = bsg_cert_people.cid 
-- ORDER BY name, certificate
-- -- add a new character
-- INSERT INTO bsg_people (fname, lname, homeworld, age) VALUES 
-- (:fnameInput, :lnameInput, :homeworld_id_from_dropdown_Input, :ageInput)
-- -- associate a character with a certificate (M-to-M relationship addition)
-- INSERT INTO bsg_cert_people (pid, cid) VALUES 
-- (:character_id_from_dropdown_Input, :certification_id_from_dropdown_Input)
-- -- update a character's data based on submission of the Update Character form 
-- UPDATE bsg_people SET fname = :fnameInput, lname= :lnameInput, homeworld 
-- = :homeworld_id_from_dropdown_Input, age= :ageInput WHERE 
-- id= :character_ID_from_the_update_form
-- -- delete a character
-- DELETE FROM bsg_people WHERE id = :character_ID_selected_from_browse_character_page
-- -- dis-associate a certificate from a person (M-to-M relationship deletion)
-- DELETE FROM bsg_cert_people WHERE pid 
-- = :character_ID_selected_from_certificate_and_character_list AND cid