// get the object we need to modify.
let addCustomerForm = document.getElementById('add-customer-form');

// Modify the objects we need.
addCustomerForm.addEventListener("submit", function (e) {

  // Prevent the form from submitting.
  e.preventDefault();

  // Get form fields we need to get data from.
  let inputCustomerFirstName = document.getElementById("input-customer_first_name");
  let inputCustomerLastName = document.getElementById("input-customer_last_name");
  let inputCustomerPhone = document.getElementById("input-customer_phone");
  let inputCustomerEmail = document.getElementById("input-customer_email");

  // Get the values from the form fields.
  let customerFirstNameValue = inputCustomerFirstName.value;
  let customerLastNameValue = inputCustomerLastName.value;
  let customerPhoneValue = inputCustomerPhone.value;
  let customerEmailValue = inputCustomerEmail.value;

  // Create a JSON object with our data.
  let data = {
    customer_first_name: customerFirstNameValue,
    customer_last_name: customerLastNameValue,
    customer_phone: customerPhoneValue,
    customer_email: customerEmailValue
  };

  // Setup the AJAX request.
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/add-customer", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell AJAX request how to resolve.
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {

      // Add the new data to the table
      addRowToTable(xhttp.response);

      // Clear the input fields for another transaction.
      inputCustomerFirstName.value = '';
      inputCustomerLastName.value = '';
      inputCustomerPhone.value = '';
      inputCustomerEmail.value = '';

    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.");
    }
  }

  // Send the request and wait for the response.
  xhttp.send(JSON.stringify(data));
})

// Creats a single row from an Object representing a single record from "Customers" table.
addRowToTable = (data) => {
  // Get a reference to the current table on the page and clear it out.
  let currentTable = document.getElementById('customers-table');

  // The get the location where we should insert the new row (end of table).
  let newRowIndex = currentTable.rows.length;

  // Get a reference to the new row from the database query (last object).
  let parsedData = JSON.parse(data);
  let newRow = parsedData[parsedData.length - 1]                    // Fixed typo "lengh" - > "length";

  // Create a row and 5 cells.
  let row = document.createElement("TR");
  let customerIdCell = document.createElement("TD");
  let customerFirstNameCell = document.createElement("TD");
  let customerLastNameCell = document.createElement("TD");
  let customerPhoneCell = document.createElement("TD");
  let customerEmailCell = document.createElement("TD");

  let customerDeleteCell = document.createElement("TD");

  // Fill the cells with the correct data.
  customerIdCell.innerText = newRow.customer_id;                    // Fixed typo "cusotmer_id" -> "customer_id"
  customerFirstNameCell.innerText = newRow.customer_first_name;
  customerLastNameCell.innerText = newRow.customer_last_name;
  customerPhoneCell.innerText = newRow.customer_phone;
  customerEmailCell.innerText = newRow.customer_email;

  customerDeleteButton = document.createElement("button");
  customerDeleteButton.innerHTML = "Delete";
  customerDeleteButton.onclick = function() {
    deleteCustomer(newRow.customer_id);
  }

  // Add the cells to the row.
  row.appendChild(customerIdCell);
  row.appendChild(customerFirstNameCell);
  row.appendChild(customerLastNameCell);
  row.appendChild(customerPhoneCell);                               // Fixed sytnax error "customer.customerPhoneCell" -> "customerPhoneCell"
  row.appendChild(customerEmailCell);
  row.appendChild(customerDeleteCell);
  customerDeleteCell.appendChild(customerDeleteButton);

  row.setAttribute('data-value', newRow.customer_id);

  currentTable.appendChild(row);

  let selectMenu = document.getElementById("mySelect");
  let option = document.createElement("option");
  option.text = newRow.customer_id + ' - ' + newRow.customer_first_name + ' ' + newRow.customer_last_name;
  option.value = newRow.employee_id;
  selectMenu.add(option);
}

